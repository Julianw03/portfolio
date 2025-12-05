import {createClient} from '@sanity/client';

export const sanityClient = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
    useCdn: true,
    apiVersion: '2025-01-01',
});

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
    items: Array<{ en?: T; de?: T }> | undefined | null,
    locale: string = 'en'
): T[] {
    if (!items || !Array.isArray(items)) return [];

    return items
        .map(item => getLocalizedContent(item, locale))
        .filter((text): text is T => text !== undefined);
}