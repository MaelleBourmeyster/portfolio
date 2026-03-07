import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
	test('home link navigates to home', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('link', { name: 'Home' }).first().click();
		await expect(page).toHaveURL(/\/portfolio\/?$/);
	});

	test('about link navigates to about', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('link', { name: 'About' }).first().click();
		await expect(page).toHaveURL(/\/portfolio\/about/);
	});

	test('contact link navigates to contact', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('link', { name: 'Contact' }).first().click();
		await expect(page).toHaveURL(/\/portfolio\/contact/);
	});

	test('domain dropdown opens and navigates to category', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('button', { name: /Visual Arts/i }).click();
		await page
			.getByRole('menuitem', { name: /Sculpture/i })
			.first()
			.click();
		await expect(page).toHaveURL(/\/portfolio\/visual-arts\/sculpture/);
	});
});
