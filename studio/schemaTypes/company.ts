export default {
    name: 'company',
    title: 'Company',
    type: 'document',
    fields: [
        {
            name: 'id',
            title: 'ID',
            type: 'slug',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'Name of the company.',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'companyLogoId',
            title: 'Company Logo Id',
            type: 'string',
            description: 'Reference to logo in LogoProvider'
        },
        {
            name: 'linkUrl',
            title: 'Company Website Link',
            type: 'url',
            validation: (Rule: any) => Rule.uri({
                scheme: ['https']
            }),
        },
        {
            name: 'shortDescription',
            title: 'Description',
            type: 'locale_text',
            description: 'Short description of the company.'
        }
    ]
}