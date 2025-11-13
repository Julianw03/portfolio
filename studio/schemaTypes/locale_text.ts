export default {
    name: 'locale_text',
    type: 'object',
    title: 'Locale Text',
    fields: [
        {
            name: 'key',
            title: 'Key',
            type: 'slug',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'en',
            title: 'English',
            type: 'text',
            rows: 4,
        },
        {
            name: 'de',
            title: 'German',
            type: 'text',
            rows: 4,
        },
    ],
    preview: {
        select: {
            en: 'en',
            de: 'de',
            key: 'key.current',
        },
        prepare(selection: any) {
            const {de, key} = selection;
            return {
                title: key,
                subtitle: de ? `DE: ${de}` : undefined,
            };
        },
    },
};