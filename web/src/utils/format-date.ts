export function formatDate(date: string) {
  return new Date(date).toLocaleString("pt-br", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}
