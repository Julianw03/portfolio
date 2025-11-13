import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const sanityClient = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
    useCdn: true,
    apiVersion: '2025-01-01',
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

export function getSanityData<T>(query: string): Promise<T> {
    return sanityClient.fetch<T>(query);
}

export function getLocalizedContent<T>(
    content: { en?: T; de?: T } | undefined,
    locale: string
): T | undefined {
    if (!content) return undefined;
    return content[locale as 'en' | 'de'] || content.en;
}

export function getLocalizedArray<T>(
    items: Array<{en?: T; de?: T}> | undefined | null,
    locale: string = 'en'
): T[] {
    if (!items || !Array.isArray(items)) return [];

    return items
        .map(item => getLocalizedContent(item, locale))
        .filter((text): text is T => text !== undefined);
}

export function getImageUrl(image: any): string {
    if (!image) return '';

    if (image.imageType === 'local') {
        return `${import.meta.env.BASE_URL}${image.localPath}`;
    }

    if (image.imageType === 'sanity' && image.sanityImage) {
        return urlFor(image.sanityImage).url();
    }

    return '';
}