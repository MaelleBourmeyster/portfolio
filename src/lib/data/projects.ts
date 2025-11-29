import { base } from '$app/paths';

export interface Project {
    slug: string;
    title: { en: string; fr: string };
    category: { en: string; fr: string };
    year: string;
    image: string;
    description: { en: string; fr: string };
    group: string; // Internal grouping identifier
}

export const projects: Project[] = [
    // Sculpture
    {
        slug: 'wood-sculpture-1',
        title: { en: 'Wood Sculpture 1', fr: 'Sculpture sur Bois 1' },
        category: { en: 'Wood', fr: 'Bois' },
        year: '2024',
        image: `${base}/images/sculpture/wood/apex-legend-cup/cup-front.png`,
        group: 'Wood',
        description: {
            en: 'A detailed wood sculpture exploring organic forms and textures.',
            fr: 'Une sculpture sur bois détaillée explorant des formes organiques et des textures.'
        }
    },
    {
        slug: 'modeling-1',
        title: { en: 'Modeling 1', fr: 'Modelage 1' },
        category: { en: 'Clay', fr: 'Argile' },
        year: '2023',
        image: `${base}/images/sculpture/clay/andrea-cavalcanti.png`,
        group: 'Clay',
        description: {
            en: 'Clay modeling study focusing on facial expressions and volume.',
            fr: "Étude de modelage en argile axée sur les expressions faciales et le volume."
        }
    },
    {
        slug: 'plastiline-study',
        title: { en: 'Plastiline Study', fr: 'Étude en Plastiline' },
        category: { en: 'Plastiline', fr: 'Plastiline' },
        year: '2023',
        image: `${base}/images/sculpture/plastiline/horse.png`,
        group: 'Plastiline',
        description: {
            en: 'An anatomical study of a horse using plastiline.',
            fr: "Une étude anatomique d'un cheval réalisée en plastiline."
        }
    },
    {
        slug: 'cast-bronze',
        title: { en: 'Cast Bronze', fr: 'Bronze Coulé' },
        category: { en: 'Bronze', fr: 'Bronze' },
        year: '2022',
        image: `${base}/images/sculpture/bronze/horse_head/bronze-horse-head.png`,
        group: 'Bronze',
        description: {
            en: 'A bronze casting project, capturing the strength and elegance of the subject.',
            fr: "Un projet de coulée en bronze, capturant la force et l'élégance du sujet."
        }
    },
    {
        slug: 'plaster-cast',
        title: { en: 'Plaster Cast', fr: 'Moulage en Plâtre' },
        category: { en: 'Plaster', fr: 'Plâtre' },
        year: '2024',
        image: `${base}/images/sculpture/plaster/rhino.png`,
        group: 'Plaster',
        description: {
            en: 'Plaster casting technique demonstration.',
            fr: "Démonstration de technique de moulage en plâtre."
        }
    },

    // Drawing
    {
        slug: 'artwork-1',
        title: { en: 'Artwork 1', fr: 'Œuvre 1' },
        category: { en: 'Painting', fr: 'Peinture' },
        year: '2024',
        image: `${base}/images/sculpture/clay/andrea-cavalcanti.png`,
        group: 'Painting',
        description: {
            en: 'Acrylic painting on canvas.',
            fr: "Peinture acrylique sur toile."
        }
    },
    {
        slug: 'artwork-2',
        title: { en: 'Artwork 2', fr: 'Œuvre 2' },
        category: { en: 'Painting', fr: 'Peinture' },
        year: '2024',
        image: `${base}/images/sculpture/clay/andrea-cavalcanti.png`,
        group: 'Painting',
        description: {
            en: 'Oil painting study.',
            fr: "Étude de peinture à l'huile."
        }
    },
    {
        slug: 'manga-panel-1',
        title: { en: 'Panel 1', fr: 'Planche 1' },
        category: { en: 'Manga', fr: 'Manga' },
        year: '2023',
        image: `${base}/images/sculpture/wood/fictional-characters/totoro.png`,
        group: 'Manga',
        description: {
            en: 'Original manga page layout and inking.',
            fr: "Mise en page et encrage d'une planche de manga originale."
        }
    },
    {
        slug: 'illustration',
        title: { en: 'Illustration', fr: 'Illustration' },
        category: { en: 'Pencils', fr: 'Crayons' },
        year: '2023',
        image: `${base}/images/sculpture/wood/fictional-characters/stitch.png`,
        group: 'Pencils & Markers',
        description: {
            en: 'Detailed pencil illustration.',
            fr: "Illustration détaillée au crayon."
        }
    },
    {
        slug: 'sketch-study',
        title: { en: 'Study', fr: 'Étude' },
        category: { en: 'Sketch', fr: 'Croquis' },
        year: '2024',
        image: `${base}/images/sculpture/wood/apex-legend-cup/cup-profile.png`,
        group: 'Sketches',
        description: {
            en: 'Quick sketch study for a larger project.',
            fr: "Étude rapide en croquis pour un projet plus vaste."
        }
    },

    // Digital
    {
        slug: 'digital-painting',
        title: { en: 'Digital Painting', fr: 'Peinture Numérique' },
        category: { en: '2D', fr: '2D' },
        year: '2024',
        image: `${base}/images/sculpture/wood/fictional-characters/elves.png`,
        group: 'Digital Painting',
        description: {
            en: 'Digital concept art created in Photoshop.',
            fr: "Concept art numérique créé sur Photoshop."
        }
    },
    {
        slug: 'short-film',
        title: { en: 'Short Film', fr: 'Court Métrage' },
        category: { en: 'Animation', fr: 'Animation' },
        year: '2023',
        image: `${base}/images/sculpture/wood/fictional-characters/stitch.png`,
        group: '2D Animation',
        description: {
            en: 'A short 2D animated clip.',
            fr: "Un court clip d'animation 2D."
        }
    },
    {
        slug: 'character-model',
        title: { en: 'Character Model', fr: 'Modèle de Personnage' },
        category: { en: '3D', fr: '3D' },
        year: '2024',
        image: `${base}/images/sculpture/plaster/rhino.png`,
        group: '3D Modeling',
        description: {
            en: '3D character model sculpted in ZBrush.',
            fr: "Modèle de personnage 3D sculpté dans ZBrush."
        }
    },

    // Bakery
    {
        slug: 'sourdough-bread',
        title: { en: 'Sourdough Bread', fr: 'Pain au Levain' },
        category: { en: 'Bakery', fr: 'Boulangerie' },
        year: '2024',
        image: `${base}/images/sculpture/wood/kitchen-utensils/butter-knife.png`,
        group: 'Bakery',
        description: {
            en: 'Artisan sourdough bread with natural leaven.',
            fr: "Pain artisanal au levain naturel."
        }
    },
    {
        slug: 'croissants',
        title: { en: 'Croissants', fr: 'Croissants' },
        category: { en: 'Pastry', fr: 'Pâtisserie' },
        year: '2024',
        image: `${base}/images/sculpture/wood/kitchen-utensils/spoon.png`,
        group: 'Bakery',
        description: {
            en: 'Hand-laminated butter croissants.',
            fr: "Croissants au beurre laminés à la main."
        }
    },

    // Horse Riding
    {
        slug: 'show-jumping',
        title: { en: 'Show Jumping', fr: 'Saut d\'Obstacles' },
        category: { en: 'Competition', fr: 'Compétition' },
        year: '2024',
        image: `${base}/images/sculpture/bronze/horse_head/bronze-horse-head.png`,
        group: 'Horse Riding',
        description: {
            en: 'Competitive show jumping events.',
            fr: "Épreuves de saut d'obstacles en compétition."
        }
    },
    {
        slug: 'trail-riding',
        title: { en: 'Trail Riding', fr: 'Randonnée' },
        category: { en: 'Leisure', fr: 'Loisir' },
        year: '2023',
        image: `${base}/images/sculpture/plastiline/horse.png`,
        group: 'Horse Riding',
        description: {
            en: 'Leisure trail riding in the countryside.',
            fr: "Randonnée équestre de loisir à la campagne."
        }
    }
];
