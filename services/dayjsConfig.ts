import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const formatRelativeTime = (date: string, locale: string) => {
  dayjs.locale(locale)
  const dateObj = dayjs(date)
  return dateObj.fromNow()
}
