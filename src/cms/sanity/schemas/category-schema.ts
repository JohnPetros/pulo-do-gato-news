import type { Rule } from 'sanity'

export const categorySchema = {
  name: 'category',
  title: 'Categorias',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
  ],
}
