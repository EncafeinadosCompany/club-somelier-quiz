export const FormatDateTime = (dateString: string | null) => {
  if (!dateString) return "Hora no especificada"
  const date = new Date(dateString)
  return `${date.toLocaleDateString()} | ${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  })}`
}