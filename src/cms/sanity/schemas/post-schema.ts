import { defineField, defineType } from 'sanity'

export const postSchema = defineType({
  name: 'post',
  title: 'Notícias',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (rule) => rule.required().error('O nome é obrigatório'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required().error('O slug é obrigatório'),
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
      validation: (rule) => rule.required().error('O autor é obrigatório'),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      validation: (rule) =>
        rule.required().min(1).error('Selecione pelo menos uma categoria'),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      validation: (rule) => rule.required().min(1).error('Adicione pelo menos uma tag'),
    }),
    defineField({
      name: 'date',
      title: 'Data',
      type: 'datetime',
      validation: (rule) => rule.required().error('A data é obrigatória'),
    }),
    defineField({
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt',
          type: 'string',
          validation: (rule) =>
            rule.required().error('O texto alternativo da imagem é obrigatório'),
        }),
      ],
      validation: (rule) => rule.required().error('A imagem é obrigatória'),
    }),
    defineField({
      name: 'content',
      title: 'Conteúdo',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
      validation: (rule) => rule.required().min(1).error('O conteúdo é obrigatório'),
    }),
    defineField({
      name: 'readingTime',
      title: 'Tempo de leitura (min)',
      type: 'number',
      validation: (rule) =>
        rule.required().positive().error('O tempo de leitura é obrigatório'),
    }),
    defineField({
      name: 'isReviewed',
      title: 'Revisado',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
