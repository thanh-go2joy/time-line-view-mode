import breadcrumb from './language/en/general/breadcrumb'
import daysOfWeek from './language/en/general/day-of-week'
import placeholder from './language/en/general/placeholder'
import validation from './language/en/general/validation'
import option from './language/en/general/option'
import gender from './language/en/general/option/gender'
import status from './language/en/general/option/status'
import button from './language/en/general/button'
import message from './language/en/general/message'
import payment from './language/en/general/payment'
function loadLocaleMessages () {
  const files = require.context('./language/en/pages/', true, /\.js$/)
  const messages = {}
  files.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = files(key).default
    }
  })
  return messages
}
const page = loadLocaleMessages()
export default
{
  lang: 'en',
  omitZeroMinute: 'true',
  search: 'Search',
  hours: 'Hours',
  overnight: 'Overnight',
  daily: 'Daily',
  additional: 'Additional',
  breadcrumb: breadcrumb,
  daysOfWeek,
  placeholder,
  validation,
  payment,
  page,
  option,
  gender,
  status,
  button,
  message,
  no_data: 'No data',
  loading: 'Loading'
}
