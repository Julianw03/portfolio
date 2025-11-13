export default {
    name: 'special_achievement',
    type: 'object',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'locale_string',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'description',
            title: 'Description',
            type: 'locale_text',
            validation: (Rule: any) => Rule.required()
        }
    ],
    preview: {
        select: {
            title: 'title.en',
        },
        prepare(selection: any) {
            const {title} = selection;
            return {
                title
            };
        },
    },
}