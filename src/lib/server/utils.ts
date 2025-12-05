/**
 * Extracts a numeric year from a year string.
 * @param yearStr - The year string (e.g., "2023").
 * @returns The numeric year, or 0 if not found.
 */
export const getYearValue = (yearStr: string | undefined): number => {
	if (!yearStr) return 0;
	const match = yearStr.match(/\d{4}/);
	return match ? parseInt(match[0], 10) : 0;
};
