export default {
    name: 'careerEntry',
    title: 'Career Entry',
    type: 'document',
    fields: [
        {
            name: 'id',
            title: 'ID',
            type: 'slug',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'position',
            title: 'Position',
            type: 'object',
            fields: [
                {name: 'en', title: 'English', type: 'string'},
                {name: 'de', title: 'German', type: 'string'},
            ],
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'company',
            title: 'Company',
            type: 'reference',
            to: [{type: 'company'}],
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'startDate',
            title: 'Start Date',
            type: 'date',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'endDate',
            title: 'End Date',
            type: 'date',
            description: 'Leave empty if currently active',
        },
        {
            name: 'responsibilities',
            title: 'Responsibilities',
            type: 'array',
            of: [{
                type: 'locale_text',
            }],
        },
        {
            name: 'special_achievements',
            title: 'Special achievements',
            description: "Special achievements that I have learned a lot on or am proud of.",
            type: 'array',
            of: [{
                type: 'special_achievement'
            }]
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
        },
    ],
    preview: {
        select: {
            title: 'company.name',
            subtitle: 'position.en',
            endDate: 'endDate',
        },
        prepare(selection: any) {
            const {title, subtitle, endDate} = selection;
            return {
                title: `${title} - ${subtitle}`,
                subtitle: endDate ? 'Past' : 'Current',
            };
        },
    },
};