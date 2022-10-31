const { format } = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'long',
  timeStyle: 'short',
})

export const formatDate = (value: string) => format(new Date(value))
