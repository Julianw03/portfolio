export default {
    name: "whoami",
    title: "Hero Whoami",
    type: "document",
    fields: [
        {
            name: 'id',
            title: 'ID',
            type: 'slug',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: "title",
            title: "Title",
            type: "locale_string",
            validation: (Rule: any) => Rule.required()
        }
    ],
    preview: {
        select: {
            id: 'id.current',
            title: 'title.en',
        },
        prepare(selection: any) {
            const {title, id} = selection;
            return {
                title: `${id} - ${title}`
            };
        },
    },
}