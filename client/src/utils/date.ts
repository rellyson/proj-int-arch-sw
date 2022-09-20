export const formatDate = (date: Date): string => {
  const dateDay = date.getDate().toString()
  const day = dateDay.length == 1 ? '0' + dateDay : dateDay
  const dateMonth = (date.getMonth() + 1).toString()
  const month = dateMonth.length == 1 ? '0' + dateMonth : dateMonth
  const year = date.getFullYear()

  return day + '/' + month + '/' + year
}
