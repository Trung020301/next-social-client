import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'
dayjs.extend(relativeTime)

export const formatRelativeTime = (date: string | Date, locale: string) => {
  dayjs.locale(locale)
  const dateObj = dayjs(date)
  return dateObj.fromNow()
}
