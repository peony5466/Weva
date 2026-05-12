/**
 * Résout le chemin d'une image produit.
 * - Les images dans public/images/ sont servies directement.
 * - Les images uploadées via storage sont servies via /storage/.
 */
export function getImageUrl(imagePath) {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    // Déjà un chemin absolu
    if (imagePath.startsWith('/')) return imagePath;
    // Images dans public/images/ (trackées dans git)
    if (imagePath.startsWith('images/')) return '/' + imagePath;
    // Images uploadées via storage
    return '/storage/' + imagePath.replace(/^storage\//, '');
}
