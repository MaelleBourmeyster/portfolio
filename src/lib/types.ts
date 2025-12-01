export interface CategoryItem {
	name: string;
	slug: string;
	href: string;
	translationKey: string;
}

export interface NavigationItem {
	name: string;
	slug: string;
	translationKey: string;
	categories: CategoryItem[];
}

export interface HomeCategory extends CategoryItem {
	image: string;
	year: string;
}
