export const department = {
    name: 'department',
    type: 'document',
    title: 'Department',
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
        name: 'header',
        title: 'Header',
        type: 'string',
      },
      {
        name: 'shortDescription',
        title: 'Short Description',
        type: 'string',
      },
      {
        title: 'Header Image (Transparent)',
        name: 'headerImage',
        type: 'image',
        options: {
          hotspot: true // <-- Defaults to false
        },
      },
      {
        name: 'infoCards',
        title: 'Info Cards',
        type: 'array',
        of:[{
          name:"infoCard",
          title:"infoCard",
          type:'object',
          fields: [
              {
                name: 'infoCardTitle',
                title: 'Info Card Title',
                type: 'string',
              },
              {
                name: 'infoCardBody',
                title: 'Info Card Body',
                type: 'array',
                of: [{type: 'string'}],
              },
            ],
        }]
        
      },
      {
        name: 'specialities',
        title: 'Our Specialities',
        type: 'array',
        of: [{
            name:'speciality',
            type:'object',
            title:'Speciality',
            fields:[
            {
                name:'icon',
                type:'image',
                title:'Icon'
            },
            {
                name:'title',
                type:'string',
                title:'Title'
            },
            {
                name:'description',
                type:'string',
                title:'Short Description (max. 120 chars)'
            }           
        ]
        }],
      },
      {
        title: 'Doctors',
        name: 'doctors',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [
             {type:'doctor'}
            ]
          }
        ]
      },
      {
        title: 'Content',
        name: 'content',
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
  