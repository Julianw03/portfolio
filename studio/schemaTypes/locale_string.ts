export default {
    name: 'locale_string',
    type: 'object',
    title: 'Locale String',
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
            type: 'string',
        },
        {
            name: 'de',
            title: 'German',
            type: 'string',
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