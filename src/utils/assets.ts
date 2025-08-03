// Utility function to get the correct asset path for both development and production
export function getAssetPath(path: string): string {
  const basePath = import.meta.env.PROD ? '/portfolio' : ''
  return `${basePath}${path}`
}
