import fs from 'fs';
import path from 'path';
import { base } from '$app/paths';
import { translations } from '$lib/data/translations';
import { z } from 'zod';

// --- Zod Schema ---
const LocalizedStringSchema = z.union([
    z.string(),
    z.object({
        en: z.string(),
        fr: z.string()
    })
]);

const ProjectDetailsSchema = z.object({
    title: LocalizedStringSchema,
    description: LocalizedStringSchema,
    year: z.string().optional(),
    image: z.string().optional(),
    thumbnail: z.string().optional(),
    group: z.string().optional()
});

export type Project = z.infer<typeof ProjectDetailsSchema> & {
    slug: string;
    domain: string;
    domainSlug: string;
    mainCategory: string;
    categorySlug: string;
    subCategory: string;
    category: { en: string; fr: string };
    images: string[];
    videos: string[];
    translationKey: string;
};

// --- Helper Functions ---

export function getTranslationKey(slug: string): string {
    return slug.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function formatName(slug: string): string {
    return slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
}

function discoverMedia(projectDir: string, urlPath: string, type: 'images' | 'videos'): string[] {
    const mediaDir = path.join(projectDir, type);
    if (!fs.existsSync(mediaDir)) return [];

    const extensions = type === 'images'
        ? /\.(png|jpg|jpeg|webp|gif)$/i
        : /\.(mp4|webm|ogg|mov)$/i;

    return fs.readdirSync(mediaDir)
        .filter(file => extensions.test(file))
        .map(file => `${base}/projects/${urlPath}/${type}/${file}`);
}

function resolveImagePath(projectDir: string, urlPath: string, imageName: string | undefined): string {
    if (!imageName) return '';
    if (imageName.startsWith('http') || imageName.startsWith('/')) return imageName;

    // Check direct file
    if (fs.existsSync(path.join(projectDir, imageName))) {
        return `${base}/projects/${urlPath}/${imageName}`;
    }
    // Check in images/
    if (fs.existsSync(path.join(projectDir, 'images', imageName))) {
        return `${base}/projects/${urlPath}/images/${imageName}`;
    }
    // Check in videos/ (for thumbnails)
    if (fs.existsSync(path.join(projectDir, 'videos', imageName))) {
        return `${base}/projects/${urlPath}/videos/${imageName}`;
    }

    // Default fallback
    return `${base}/projects/${urlPath}/${imageName}`;
}

// --- Main Logic ---

function parseProjectStructure(projectDir: string, rootDir: string) {
    const relative = path.relative(rootDir, projectDir);
    const parts = relative.split(path.sep);

    // We expect: domain / category / subcategory / slug
    if (parts.length < 4) {
        return null;
    }

    const [domainSlug, categorySlug, subCategory] = parts;

    return {
        domainSlug,
        categorySlug,
        subCategory,
        relative,
        domain: formatName(domainSlug),
        mainCategory: formatName(categorySlug)
    };
}

function loadProject(projectDir: string, rootDir: string): Project | null {
    const slug = path.basename(projectDir);
    const structure = parseProjectStructure(projectDir, rootDir);

    if (!structure) {
        // console.warn(`Skipping project ${slug}: Invalid folder structure.`);
        return null;
    }

    const detailsPath = path.join(projectDir, 'details.json');

    try {
        let content = fs.readFileSync(detailsPath, 'utf-8');
        // Handle BOM
        if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);

        const rawJson = JSON.parse(content);

        // Validate with Zod
        const result = ProjectDetailsSchema.safeParse(rawJson);

        if (!result.success) {
            console.error(`Validation error in ${detailsPath}:`, result.error.format());
            return null;
        }

        const json = result.data;
        const urlPath = structure.relative.replace(/\\/g, '/');

        // Media Discovery
        const images = discoverMedia(projectDir, urlPath, 'images');
        const videos = discoverMedia(projectDir, urlPath, 'videos');

        // Image Resolution
        let mainImage = json.image;
        if (!mainImage && images.length > 0) {
            mainImage = images[0];
        } else {
            mainImage = resolveImagePath(projectDir, urlPath, mainImage);
        }

        let thumbnail = json.thumbnail;
        if (thumbnail) {
            thumbnail = resolveImagePath(projectDir, urlPath, thumbnail);
        } else {
            // Fallback to main image if no thumbnail
            thumbnail = mainImage;
        }

        // Translations
        const categoriesEn = translations.en.categories as Record<string, string>;
        const categoriesFr = translations.fr.categories as Record<string, string>;
        const catEn = categoriesEn[structure.subCategory] || structure.subCategory;
        const catFr = categoriesFr[structure.subCategory] || structure.subCategory;

        return {
            slug,
            domain: structure.domain,
            domainSlug: structure.domainSlug,
            mainCategory: structure.mainCategory,
            categorySlug: structure.categorySlug,
            subCategory: structure.subCategory,
            category: { en: catEn, fr: catFr },
            year: json.year || new Date().getFullYear().toString(),
            images,
            videos,
            image: mainImage,
            thumbnail: thumbnail || '',
            title: json.title,
            description: json.description,
            group: json.group || structure.subCategory,
            translationKey: getTranslationKey(structure.categorySlug)
        };

    } catch (e) {
        console.error(`Error reading project ${slug}`, e);
        return null;
    }
}

function findProjects(dir: string, rootDir: string): Project[] {
    let results: Project[] = [];

    try {
        const list = fs.readdirSync(dir);

        for (const file of list) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                const detailsPath = path.join(filePath, 'details.json');
                if (fs.existsSync(detailsPath)) {
                    const project = loadProject(filePath, rootDir);
                    if (project) results.push(project);
                } else {
                    results = results.concat(findProjects(filePath, rootDir));
                }
            }
        }
    } catch (e) {
        console.error(`Error scanning directory ${dir}`, e);
    }

    return results;
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

    const tree = Array.from(domains.entries()).map(([domainSlug, categories]) => {
        return {
            name: formatName(domainSlug),
            slug: domainSlug,
            translationKey: getTranslationKey(domainSlug),
            categories: Array.from(categories).map(catSlug => ({
                name: formatName(catSlug),
                slug: catSlug,
                href: `${base}/${domainSlug}/${catSlug}`,
                translationKey: getTranslationKey(catSlug)
            }))
        };
    });

    return tree;
}
