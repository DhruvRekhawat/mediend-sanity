export const doctor = {
    name: 'doctor',
    type: 'document',
    title: 'Doctor',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
          },
          {
            name: 'slug',
            title:'Slug',
            type: 'slug',
            options: {
              source: 'title',
              maxLength: 200, // will be ignored if slugify is set
              slugify: (input:any) => input
                                   .toLowerCase()
                                   .replace(/\s+/g, '-')
                                   .replace('.','-')
                                   .slice(0, 200)
            }
          },
          {
            name: 'image',
            title:'Image',
            type:'image',
            options: {
                hotspot: true // <-- Defaults to false
              },
          },
          {
            name:'speciality',
            title:'Speciality',
            type:'string',
          },
          {
            name:'degrees',
            title:'Degrees',
            type:'string'
          },
          {
            name:'yearsOfExperience',
            title:'Years Of Experience',
            type:'string',
          },
          {
            name:'city',
            title:'City',
            type:'string',
          },
          {
            name:'department',
            title:'Department',
            type:'reference',
            to:[{type:'department'}]
        },
          {
            title: 'About Doctor',
            name: 'aboutDoctor',
            type: 'array',
            of: [{type: 'block'}],
          },
          {
            title: 'Additional Content 1',
            name: 'additionalContent1',
            type: 'array',
            of: [{type: 'block'}],
          },
          {
            title: 'Additional Content 2',
            name: 'additionalContent2',
            type: 'array',
            of: [{type: 'block'}],
          },
          {
            name:'treatments',
            title:'Treatments',
            type: 'array',
            of:[{
                type:'object',
                name:'treatment',
                title:'Treatment',
                fields:[
                    {
                        name:'treatmentName',
                        title:'Treatment Name',
                        type:'string'
                    },
                    {
                        name:'treatmentLink',
                        title:'Treatment Link',
                        type:'string'
                    }
                ]

            }]
          },
          {
            name:'reviews',
            title:'Reviews',
            type:'array',
            of:[{
                type:'object',
                name:'review',
                title:'Review',
                fields:[{
                    name:'name',
                    title:'Name',
                    type:'string'
                },
                {
                    name:'image',
                    title:'Image',
                    type:'image',
                },
                {
                    name:'review',
                    title:'Review',
                    type:'string'
                },
                {
                    name:'highlight',
                    title:'Highlight',
                    type:'string'
                }
            ]
            }]
          },
          {
            name:'faqs',
            title:'FAQs',
            type:'array',
            of:[{
                type:'object',
                name:'faq',
                title:'FAQ',
                fields:[{
                    name:'question',
                    title:'Question',
                    type:'string'
                },
                {
                    name:'answer',
                    title:'Answer',
                    type:'string',
                }
            ]
            }]
          },

    ],
}