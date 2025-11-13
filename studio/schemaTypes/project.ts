export default {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        {
            name: 'id',
            title: 'ID',
            type: 'slug',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'object',
            fields: [
                {name: 'en', title: 'English', type: 'text'},
                {name: 'de', title: 'German', type: 'text'},
            ],
        },
        {
            name: 'status',
            title: 'Project Status',
            type: 'string',
            options: {
                list: [
                    {'title': 'Work in Progress', value: 'wip'},
                    {'title': 'Archived', value: 'archived'},
                    {'title': 'Completed', value: 'completed'}
                ]
            },
            initialValue: 'wip',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {name: 'key', title: 'Key', type: 'string'},
                        {name: 'en', title: 'English', type: 'text'},
                        {name: 'de', title: 'German', type: 'text'},
                    ],
                },
            ],
        },
        {
            name: 'plannedFeatures',
            title: 'Planned Features',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {name: 'key', title: 'Key', type: 'string'},
                        {name: 'en', title: 'English', type: 'text'},
                        {name: 'de', title: 'German', type: 'text'},
                    ],
                },
            ],
            hidden: ({parent}: any) => !(parent?.status === 'wip')
        },
        {
            name: 'skills',
            title: 'Technologies Used',
            type: 'array',
            of: [{type: 'reference', to: [{type: 'skill'}]}],
        },
        {
            name: 'hasDisclaimer',
            title: 'Has Disclaimer',
            type: 'boolean',
            initialValue: false,
        },
        {
            name: 'disclaimer',
            title: 'Disclaimer',
            type: 'object',
            fields: [
                {name: 'en', title: 'English', type: 'text'},
                {name: 'de', title: 'German', type: 'text'},
            ],
            hidden: ({parent}: any) => !parent?.hasDisclaimer,
        },
        {
            name: 'githubLink',
            title: 'GitHub Link',
            type: 'url',
        },
        {
            name: 'previewImages',
            title: 'Preview Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {hotspot: true},
                    fields: [
                        {
                            name: 'alt',
                            title: 'Alternative Text',
                            type: 'string',
                        },
                    ],
                },
            ],
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'previewImages.0',
            status: 'status',
        },
        prepare(selection: any) {
            const {title, media, status} = selection;

            type ProjectStatus = "wip" | "archived" | "completed";

            const statusToPostfix: Record<ProjectStatus, string> = {
                "wip": "WIP",
                "archived": "Archived",
                "completed": "Completed",
            }

            const statusString = statusToPostfix[status as ProjectStatus] ?? "Unknown";

            return {
                title: title,
                subtitle: `${statusString}`,
                media
            };
        },
    },
};