import fs from 'fs';
import path from 'path';
import { base } from '$app/paths';
import type { Project } from '$lib/data/projects';
import { translations } from '$lib/data/translations';

const mainCategoryMap: Record<string, string> = {
    'drawing': 'Drawing',
    'sculpture': 'Sculpture',
    'digital': 'Digital',
    'bakery': 'Bakery',
    'horse-riding': 'Horse Riding'
};

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

    // Expected: [main, sub, slug]
    // We need at least 3 parts to strictly follow category/subcategory/project structure
    if (parts.length < 3) {
        console.warn(`Skipping project ${slug}: Invalid folder structure. Expected category/subcategory/project, got ${relative}`);
        return null;
    }

    const mainFolder = parts[0];
    const subFolder = parts[1];

    const mainCategory = mainCategoryMap[mainFolder] || mainFolder;
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

        let mainImage = json.image;
        if (!mainImage && images.length > 0) {
            mainImage = images[0];
        } else if (mainImage && !mainImage.startsWith('http') && !mainImage.startsWith('/')) {
            // If manual image path is provided, it needs to be adjusted
            // Assuming manual paths were relative to project root or base.
            // If it was "images/foo.png", we prepend the new URL path.
            mainImage = `${base}/projects/${urlPath}/${mainImage}`;
        }

        // Ensure required fields are present
        if (!json.title || !json.description) {
            console.warn(`Skipping project ${slug}: Missing title or description in details.json`);
            return null;
        }

        return {
            slug,
            mainCategory,
            subCategory,
            category: { en: catEn, fr: catFr },
            year: json.year || new Date().getFullYear().toString(),
            images,
            image: mainImage || '',
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
