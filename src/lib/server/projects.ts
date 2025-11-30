import fs from 'fs';
import path from 'path';
import { base } from '$app/paths';
import type { Project } from '$lib/data/projects';

export function getProjects(): Project[] {
    const projectsDir = path.resolve('static/projects');
    if (!fs.existsSync(projectsDir)) {
        return [];
    }

    const slugs = fs.readdirSync(projectsDir).filter(file => {
        return fs.statSync(path.join(projectsDir, file)).isDirectory();
    });

    const projects: Project[] = slugs.map(slug => {
        const projectDir = path.join(projectsDir, slug);
        const detailsPath = path.join(projectDir, 'details.json');

        if (fs.existsSync(detailsPath)) {
            try {
                let content = fs.readFileSync(detailsPath, 'utf-8');
                // Strip BOM if present
                if (content.charCodeAt(0) === 0xFEFF) {
                    content = content.slice(1);
                }
                const project = JSON.parse(content);

                // Auto-discover images
                const imagesDir = path.join(projectDir, 'images');
                let images: string[] = [];

                if (fs.existsSync(imagesDir)) {
                    images = fs.readdirSync(imagesDir)
                        .filter(file => /\.(png|jpg|jpeg|webp|gif)$/i.test(file))
                        .map(file => `${base}/projects/${slug}/images/${file}`);
                    // console.log(`Found ${images.length} images for ${slug}`);
                }

                // If no image specified in JSON, use the first discovered one
                if (!project.image && images.length > 0) {
                    project.image = images[0];
                } else if (project.image && !project.image.startsWith('http') && !project.image.startsWith('/')) {
                    project.image = `${base}/${project.image}`;
                }

                return {
                    ...project,
                    slug,
                    images
                };
            } catch (e) {
                console.error(`Error reading details.json for ${slug}`, e);
                return null;
            }
        }
        return null;
    }).filter((p): p is Project => p !== null);

    return projects;
}
