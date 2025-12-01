import type { PageServerLoad } from './$types';
import { getHomeCategories } from '$lib/server/projects';

export const load: PageServerLoad = async () => {
	const categories = await getHomeCategories();

	return {
		categories
	};
};
