export default {
    name: 'skill',
    title: 'Skill',
    type: 'document',
    fields: [
        {
            name: 'id',
            title: 'ID',
            type: 'slug',
            description: "This skill's id",
            validation: (Rule: any) => Rule.required(),
            options: {
                source: 'name',
                maxLength: 96,
                slugify: (input: string) =>
                    input.toLowerCase().replace(/\s+/g, '-').slice(0, 96)
            }
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'logoId',
            title: 'Logo ID',
            type: 'string',
            description: 'Reference to logo in LogoProvider (usually same as ID)',
            initialValue: '',
        },
        {
            name: 'linkUrl',
            title: 'Link URL',
            type: 'url',
        },
        {
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Language', value: 'language' },
                    { title: 'Framework', value: 'framework' },
                    { title: 'Build Tool', value: 'build' },
                    { title: 'Version Control', value: 'version-control' },
                    { title: 'Containerization', value: 'containerization' },
                    { title: 'Cloud', value: 'cloud' },
                    { title: 'Other', value: 'other' },
                ],
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'knowledgeLevel',
            title: 'Knowledge Level',
            type: 'number',
            validation: (Rule: any) => Rule.required().min(0).max(5),
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in which skills appear (lower numbers first)',
        },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'type',
            knowledgeLevel: 'knowledgeLevel',
            logoId: 'logoId',
            id: 'id.current',
        },
        prepare(selection: any) {
            const { title, subtitle, knowledgeLevel, logoId, id } = selection;
            return {
                title,
                subtitle: `${subtitle} - Level ${knowledgeLevel}/5 - Logo: ${logoId || id}`,
            };
        },
    },
};