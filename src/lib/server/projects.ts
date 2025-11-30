import fs from 'fs';
import path from 'path';
import { base } from '$app/paths';
import type { Project } from '$lib/data/projects';
import { translations } from '$lib/data/translations';

function findProjects(dir: string, rootDir: string): Project[] {
    let results: Project[] = [];
    const list = fs.readdirSync(dir);

    for (const file of list) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // Check if this directory is a project (has details.json)
            const detailsPath = path.join(filePath, 'details.json');
            if (fs.existsSync(detailsPath)) {
                const project = loadProject(filePath, rootDir);
                if (project) results.push(project);
            } else {
                // Recurse
                results = results.concat(findProjects(filePath, rootDir));
            }
        }
    }
    return results;
}

function loadProject(projectDir: string, rootDir: string): Project | null {
    const detailsPath = path.join(projectDir, 'details.json');
    const slug = path.basename(projectDir);

    // Determine categories from path
    const relative = path.relative(rootDir, projectDir);
    const parts = relative.split(path.sep);

    // Expected: [domain, category, subcategory, slug]
    // We need at least 4 parts to strictly follow domain/category/subcategory/project structure
    if (parts.length < 4) {
        // console.warn(`Skipping project ${slug}: Invalid folder structure. Expected domain/category/subcategory/project, got ${relative}`);
        return null;
    }

    const domainFolder = parts[0];
    const categoryFolder = parts[1];
    const subFolder = parts[2];

    // Format names
    const domain = domainFolder
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    const mainCategory = categoryFolder
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    const domainSlug = domainFolder;
    const categorySlug = categoryFolder;
    const subCategory = subFolder;

    // localized category
    const categoriesEn = translations.en.categories as Record<string, string>;
    const categoriesFr = translations.fr.categories as Record<string, string>;

    const catEn = categoriesEn[subCategory] || subCategory;
    const catFr = categoriesFr[subCategory] || subCategory;

    try {
        let content = fs.readFileSync(detailsPath, 'utf-8');
        if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);
        const json = JSON.parse(content) as Partial<Project>;

        // Auto-discover images
        const imagesDir = path.join(projectDir, 'images');
        let images: string[] = [];

        // Construct URL path for images
        // Replace backslashes with slashes for URL
        const urlPath = relative.replace(/\\/g, '/');

        if (fs.existsSync(imagesDir)) {
            images = fs.readdirSync(imagesDir)
                .filter(file => /\.(png|jpg|jpeg|webp|gif)$/i.test(file))
                .map(file => `${base}/projects/${urlPath}/images/${file}`);
        }

        // Auto-discover videos
        const videosDir = path.join(projectDir, 'videos');
        let videos: string[] = [];

        if (fs.existsSync(videosDir)) {
            videos = fs.readdirSync(videosDir)
                .filter(file => /\.(mp4|webm|ogg|mov)$/i.test(file))
                .map(file => `${base}/projects/${urlPath}/videos/${file}`);
        }

        let mainImage = json.image;
        if (!mainImage && images.length > 0) {
            mainImage = images[0];
        } else if (mainImage && !mainImage.startsWith('http') && !mainImage.startsWith('/')) {
            mainImage = `${base}/projects/${urlPath}/${mainImage}`;
        }

        let thumbnail = json.thumbnail;
        if (thumbnail && !thumbnail.startsWith('http') && !thumbnail.startsWith('/')) {
            if (fs.existsSync(path.join(projectDir, thumbnail))) {
                thumbnail = `${base}/projects/${urlPath}/${thumbnail}`;
            }
            else if (fs.existsSync(path.join(projectDir, 'images', thumbnail))) {
                thumbnail = `${base}/projects/${urlPath}/images/${thumbnail}`;
            }
            else if (fs.existsSync(path.join(projectDir, 'videos', thumbnail))) {
                thumbnail = `${base}/projects/${urlPath}/videos/${thumbnail}`;
            }
            else {
                if (!thumbnail.startsWith('images/')) {
                    thumbnail = `images/${thumbnail}`;
                }
                thumbnail = `${base}/projects/${urlPath}/${thumbnail}`;
            }
        }

        if (!json.title || !json.description) {
            console.warn(`Skipping project ${slug}: Missing title or description in details.json`);
            return null;
        }

        return {
            slug,
            domain,
            domainSlug,
            mainCategory,
            categorySlug,
            subCategory,
            category: { en: catEn, fr: catFr },
            year: json.year || new Date().getFullYear().toString(),
            images,
            videos,
            image: mainImage || '',
            thumbnail,
            title: json.title,
            description: json.description,
            group: json.group || subCategory
        };
    } catch (e) {
        console.error(`Error reading project ${slug}`, e);
        return null;
    }
}

export function getProjects(): Project[] {
    const projectsDir = path.resolve('static/projects');
    if (!fs.existsSync(projectsDir)) return [];
    return findProjects(projectsDir, projectsDir);
}

export function getNavigationTree() {
    const projects = getProjects();
    const domains = new Map<string, Set<string>>();

    projects.forEach(p => {
        if (!domains.has(p.domainSlug)) {
            domains.set(p.domainSlug, new Set());
        }
        domains.get(p.domainSlug)?.add(p.categorySlug);
    });

    // Convert to array structure
    // We want to return something like:
    // [ { name: 'Visual Arts', slug: 'visual-arts', categories: ['drawing', 'sculpture'] } ]

    // Helper to format name
    const formatName = (slug: string) => slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

    const tree = Array.from(domains.entries()).map(([domainSlug, categories]) => {
        return {
            name: formatName(domainSlug),
            slug: domainSlug,
            categories: Array.from(categories).map(catSlug => ({
                name: formatName(catSlug),
                slug: catSlug,
                href: `${base}/${domainSlug}/${catSlug}`
            }))
        };
    });

    return tree;
}
