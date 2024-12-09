import type { Rule } from 'sanity'

export const columnSchema = {
  name: 'column',
  title: 'Colunas',
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
      type: 'array',
      of: [{ type: 'block' }],
      // readonly: true,
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'date',
      title: 'Data',
      type: 'datetime',
    },
  ],
}
