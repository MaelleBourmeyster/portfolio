import { expect, test } from '@playwright/test';

test.describe('Language toggle', () => {
	test('toggles language from English to French', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();

		await page.getByRole('button', { name: 'en' }).click();
		await expect(page.getByRole('link', { name: 'Accueil' })).toBeVisible();
	});

	test('toggles language from French to English', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('button', { name: 'en' }).click();
		await expect(page.getByRole('link', { name: 'Accueil' })).toBeVisible();

		await page.getByRole('button', { name: 'fr' }).click();
		await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
	});

	test('persists language across navigation', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('button', { name: 'en' }).click();
		await page.getByRole('link', { name: 'À propos' }).first().click();
		await expect(page).toHaveURL(/\/portfolio\/about/);
		await expect(page.getByRole('heading', { name: /À propos/i })).toBeVisible();
	});
});
