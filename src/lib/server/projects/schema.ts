import { z } from 'zod';

// --- Zod Schema ---
export const LocalizedStringSchema = z.union([
	z.string(),
	z.object({
		en: z.string(),
		fr: z.string()
	})
]);

export const ProjectDetailsSchema = z.object({
	title: LocalizedStringSchema,
	description: LocalizedStringSchema,
	year: z.string().optional(),
	image: z.string().optional(),
	thumbnail: z.string().optional(),
	group: z.string().optional()
});

export type ProjectDetails = Omit<
	z.infer<typeof ProjectDetailsSchema>,
	'year' | 'image' | 'thumbnail' | 'group'
> & {
	year: string;
	image: string;
	thumbnail: string;
	group: string;
};

export type Project = ProjectDetails & {
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
