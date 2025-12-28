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
      validation: (rule: Rule) => rule.required().error('O nome é obrigatório'),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule: Rule) => rule.required().error('O slug é obrigatório'),
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'string',
      validation: (rule: Rule) => rule.required().error('O autor é obrigatório'),
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
      validation: (rule: Rule) =>
        rule.required().min(1).error('Selecione pelo menos uma categoria'),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      validation: (rule: Rule) =>
        rule.required().min(1).error('Adicione pelo menos uma tag'),
    },
    {
      name: 'date',
      title: 'Data',
      type: 'datetime',
      validation: (rule: Rule) => rule.required().error('A data é obrigatória'),
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
          validation: (rule: Rule) =>
            rule.required().error('O texto alternativo da imagem é obrigatório'),
        },
      ],
      validation: (rule: Rule) => rule.required().error('A imagem é obrigatória'),
    },
    {
      name: 'content',
      title: 'Conteúdo',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
      validation: (rule: Rule) =>
        rule.required().min(1).error('O conteúdo é obrigatório'),
    },
    {
      title: 'Tempo de leitura (min)',
      name: 'readingTime',
      type: 'number',
      validation: (rule: Rule) =>
        rule.required().positive().error('O tempo de leitura é obrigatório'),
    },
    {
      title: 'Está disponível no site?',
      name: 'isAvailable',
      type: 'boolean',
      initialValue: true,
      validation: (rule: Rule) =>
        rule.required().error('O status de disponibilidade é obrigatório'),
    },
  ],
}
