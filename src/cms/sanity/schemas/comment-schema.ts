import type { Rule } from 'sanity'

export const commentSchema = {
  name: 'comment',
  title: 'Comentários',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome',
      type: 'string',
      readonly: true,
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      readonly: true,
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'content',
      title: 'Conteúdo',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'post',
      title: 'Notícia',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'date',
      title: 'Data',
      type: 'datetime',
    },
  ],
}
