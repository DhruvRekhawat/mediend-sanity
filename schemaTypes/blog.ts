import {Rule} from '@sanity/types'
import {client} from './client'

export default {
  name: 'blogs',
  type: 'document',
  title: 'Blogs',
  fields: [
    {
      name: 'mainContent',
      type: 'object',
      title: 'Main Content',
      fields: [
        // {
        //   name: 'isBlog',
        //   title: 'is Blog or Article?',
        //   type: 'string',
        //   options: {
        //     list: [
        //       {
        //         title: 'Blog',
        //         value: 'blog',
        //       },
        //       {
        //         title: 'Article',
        //         value: 'article',
        //       },
        //     ],
        //   },
        // },
        {
          name: 'isFeatured',
          title: 'is Featured?',
          type: 'boolean',
        },
        {
          name: 'title',
          type: 'string',
          title: 'Blog Title (do not use "-")',
          validation: (Rule: Rule) =>
            Rule.required().custom(async (title: string, context) => {
              // If the title is not provided, return a required error
              if (!title) {
                return 'Title is required'
              }

              // Fetch the existing documents with the same title, excluding the current document
              const documentId = context?.document?._id
              const duplicateTitle = await client.fetch(
                `*[_type == "blogs" && title == $title && _id != $id][0]`,
                {title, id: documentId},
              )

              if (duplicateTitle) {
                return 'This title is already in use. Please choose a different title.'
              }

              return true
            }),
        },
        {
          name: 'coverImage',
          type: 'image',
          title: 'Cover Image',
        },
        {
          name: 'priority',
          type: 'number',
          title: 'Priority',
          validation: (Rule: Rule) =>
            Rule.required().custom(async (priority: number, context) => {
              if (typeof priority !== 'number') {
                return 'Priority must be a number'
              }

              const documentId = context?.document?._id
              const duplicatePriority = await client.fetch(
                `*[_type == "blogs" && priority == $priority && _id != $id][0]`,
                {priority, id: documentId},
              )

              if (duplicatePriority) {
                return `The priority "${priority}" is already in use. Please choose a unique priority.`
              }

              return true
            }),
        },
        {
          name: 'category',
          type: 'string',
          title: 'Article category',
          options: {
            list: [
              {
                title: 'Exam Updates',
                value: 'exam_updates',
              },
              {
                title: 'Trending Topics',
                value: 'trending_topics',
              },
              {
                title: 'College Guides',
                value: 'college_guides',
              },
              {
                title: 'Tech In Education',
                value: 'tech_in_education',
              },
            ],
          },
        },
        {
          name: 'shortInfo',
          type: 'text',
          title: 'Short Info',
        },
        {
          name: 'publishDate',
          type: 'date',
          title: 'Published Date',
        },
      ],
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block', // Directly include the block type here
        },

        // Image
        {
          name: 'image',
          type: 'image',
          title: 'Image',
        },
        // Table
        {
          name: 'table',
          type: 'object',
          title: 'Table (first row will be table head)',
          fields: [
            {
              name: 'rows',
              type: 'array',
              title: 'Rows',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'cells',
                      type: 'array',
                      title: 'Cells',
                      of: [{type: 'string'}],
                    },
                  ],
                },
              ],
              validation: (Rule: Rule) =>
                Rule.custom((rows) => {
                  if (!Array.isArray(rows)) {
                    return 'Rows must be an array'
                  }

                  if (rows.length === 0) {
                    return 'The table must have at least one row'
                  }

                  // Ensure all rows have the same number of cells
                  const numberOfCellsInFirstRow = rows[0]?.cells?.length

                  if (rows.some((row) => row.cells?.length !== numberOfCellsInFirstRow)) {
                    return 'All rows must have the same number of cells'
                  }

                  // Check if the first row exists and has at least one cell (for table head)
                  if (numberOfCellsInFirstRow === 0) {
                    return 'The first row must act as the table head and cannot be empty'
                  }

                  return true
                }),
            },
          ],
          preview: {
            select: {
              rows: 'rows',
            },
            prepare({rows}: {rows: {cells: string[]}[]}) {
              const rowCount = rows?.length || 0
              const columnCount = rows?.[0]?.cells?.length || 0

              return {
                title: `Table: ${rowCount} rows, ${columnCount} columns`,
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'mainContent.title',
    },
    prepare({title}: {title: string}) {
      return {
        title: title || 'No title provided',
      }
    },
  },
}
