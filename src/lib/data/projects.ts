import { base } from '$app/paths';

export interface Project {
    slug: string;
    title: string;
    category: string;
    year: string;
    image: string;
    description?: string;
    group?: string; // For grouping in pages like Sculpture (Wood, Clay, etc.)
}

export const projects: Project[] = [
    // Sculpture
    {
        slug: 'wood-sculpture-1',
        title: 'Wood Sculpture 1',
        category: 'Wood',
        year: '2024',
        image: `${base}/images/sculpture/bois/coupeapexlegend/coupeface.png`,
        group: 'Wood',
        description: 'A detailed wood sculpture exploring organic forms and textures.'
    },
    {
        slug: 'modeling-1',
        title: 'Modeling 1',
        category: 'Clay',
        year: '2023',
        image: `${base}/images/sculpture/argile/andrea_cavalcanti%202.png`,
        group: 'Clay',
        description: 'Clay modeling study focusing on facial expressions and volume.'
    },
    {
        slug: 'plastiline-study',
        title: 'Plastiline Study',
        category: 'Plastiline',
        year: '2023',
        image: `${base}/images/sculpture/plastiline/cheval_11_25.png`,
        group: 'Plastiline',
        description: 'An anatomical study of a horse using plastiline.'
    },
    {
        slug: 'cast-bronze',
        title: 'Cast Bronze',
        category: 'Bronze',
        year: '2022',
        image: `${base}/images/sculpture/bronze/horse_head/bronzetêtecheval1125.png`,
        group: 'Bronze',
        description: 'A bronze casting project, capturing the strength and elegance of the subject.'
    },
    {
        slug: 'plaster-cast',
        title: 'Plaster Cast',
        category: 'Plaster',
        year: '2024',
        image: `${base}/images/sculpture/plâtre/rhino.png`,
        group: 'Plaster',
        description: 'Plaster casting technique demonstration.'
    },

    // Drawing
    {
        slug: 'artwork-1',
        title: 'Artwork 1',
        category: 'Painting',
        year: '2024',
        image: `${base}/images/sculpture/argile/andrea_cavalcanti%202.png`,
        group: 'Painting',
        description: 'Acrylic painting on canvas.'
    },
    {
        slug: 'artwork-2',
        title: 'Artwork 2',
        category: 'Painting',
        year: '2024',
        image: `${base}/images/sculpture/argile/andrea_cavalcanti%202.png`,
        group: 'Painting',
        description: 'Oil painting study.'
    },
    {
        slug: 'manga-panel-1',
        title: 'Panel 1',
        category: 'Manga',
        year: '2023',
        image: `${base}/images/sculpture/bois/fictionnalcharacters/totoro.png`,
        group: 'Manga',
        description: 'Original manga page layout and inking.'
    },
    {
        slug: 'illustration',
        title: 'Illustration',
        category: 'Pencils',
        year: '2023',
        image: `${base}/images/sculpture/bois/fictionnalcharacters/stitch.png`,
        group: 'Pencils & Markers',
        description: 'Detailed pencil illustration.'
    },
    {
        slug: 'sketch-study',
        title: 'Study',
        category: 'Sketch',
        year: '2024',
        image: `${base}/images/sculpture/bois/coupeapexlegend/coupeprofil-2.png`,
        group: 'Sketches',
        description: 'Quick sketch study for a larger project.'
    },

    // Digital
    {
        slug: 'digital-painting',
        title: 'Digital Painting',
        category: '2D',
        year: '2024',
        image: `${base}/images/sculpture/bois/fictionnalcharacters/lutins.png`,
        group: 'Digital Painting',
        description: 'Digital concept art created in Photoshop.'
    },
    {
        slug: 'short-film',
        title: 'Short Film',
        category: 'Animation',
        year: '2023',
        image: `${base}/images/sculpture/bois/fictionnalcharacters/stitch.png`,
        group: '2D Animation',
        description: 'A short 2D animated clip.'
    },
    {
        slug: 'character-model',
        title: 'Character Model',
        category: '3D',
        year: '2024',
        image: `${base}/images/sculpture/plâtre/rhino.png`,
        group: '3D Modeling',
        description: '3D character model sculpted in ZBrush.'
    },

    // Bakery
    {
        slug: 'sourdough-bread',
        title: 'Sourdough Bread',
        category: 'Bakery',
        year: '2024',
        image: `${base}/images/sculpture/bois/ustensiles%20de%20cusine/couteauàbeurre.png`,
        group: 'Bakery',
        description: 'Artisan sourdough bread with natural leaven.'
    },
    {
        slug: 'croissants',
        title: 'Croissants',
        category: 'Pastry',
        year: '2024',
        image: `${base}/images/sculpture/bois/ustensiles%20de%20cusine/cuillère1.png`,
        group: 'Bakery', // Grouping under Bakery for simplicity or split if needed
        description: 'Hand-laminated butter croissants.'
    },

    // Horse Riding
    {
        slug: 'show-jumping',
        title: 'Show Jumping',
        category: 'Competition',
        year: '2024',
        image: `${base}/images/sculpture/bronze/horse_head/bronzetêtecheval1125.png`,
        group: 'Horse Riding',
        description: 'Competitive show jumping events.'
    },
    {
        slug: 'trail-riding',
        title: 'Trail Riding',
        category: 'Leisure',
        year: '2023',
        image: `${base}/images/sculpture/plastiline/cheval_11_25.png`,
        group: 'Horse Riding',
        description: 'Leisure trail riding in the countryside.'
    }
];
