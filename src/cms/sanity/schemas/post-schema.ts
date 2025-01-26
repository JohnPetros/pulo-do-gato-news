import type { Rule } from 'sanity'

export const postSchema = {
  name: 'post',
  title: 'Notícias',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (rule: Rule) => rule.isRequired(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'string',
      validation: (rule: Rule) => rule.isRequired(),
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'category' },
        },
      ],
      validation: (rule: Rule) => rule.isRequired() && rule.length(1),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'date',
      title: 'Data',
      type: 'datetime',
    },
    {
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
        },
      ],
    },
    {
      name: 'content',
      title: 'Conteúdo',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    },
    {
      title: 'Tempo de leitura (min)',
      name: 'readingTime',
      type: 'number',
    },
  ],
}
