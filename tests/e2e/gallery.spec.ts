import { expect, test } from '@playwright/test';

test.describe('Project gallery', () => {
	test('displays project cards on category page', async ({ page }) => {
		await page.goto('/visual-arts/sculpture');
		await expect(page.getByRole('heading', { level: 2 })).toBeVisible();
		const links = page.getByRole('link').filter({ has: page.locator('h3') });
		await expect(links.first()).toBeVisible();
	});

	test('navigates to project detail when clicking card', async ({ page }) => {
		await page.goto('/visual-arts/sculpture');
		const firstProjectLink = page
			.getByRole('link')
			.filter({ has: page.locator('h3') })
			.first();
		await firstProjectLink.click();
		await expect(page).toHaveURL(/\/portfolio\/visual-arts\/sculpture\/.+$/);
	});

	test('image gallery has previous/next buttons when multiple images', async ({ page }) => {
		await page.goto('/visual-arts/sculpture');
		const firstProjectLink = page
			.getByRole('link')
			.filter({ has: page.locator('h3') })
			.first();
		await firstProjectLink.click();

		const prevButton = page.getByRole('button', { name: 'Previous image' });
		const nextButton = page.getByRole('button', { name: 'Next image' });

		if (await prevButton.isVisible()) {
			await nextButton.click();
			await prevButton.click();
		}
	});
});
