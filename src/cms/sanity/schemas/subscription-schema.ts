export const subscriptionSchema = {
  name: 'subscription',
  title: 'Inscrições',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'E-mail',
      type: 'string',
      readonly: true,
    },
  ],
}
