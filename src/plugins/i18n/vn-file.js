import breadcrumb from './language/vn/general/breadcrumb'
import daysOfWeek from './language/vn/general/day-of-week'
import placeholder from './language/vn/general/placeholder'
import validation from './language/en/general/validation'
import option from './language/vn/general/option'
import gender from './language/vn/general/option/gender'
import status from './language/vn/general/option/status'
import button from './language/vn/general/button'
import message from './language/vn/general/message'
import payment from './language/vn/general/payment'
function loadLocaleMessages () {
  const files = require.context('./language/vn/pages/', true, /\.js$/)
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
  lang: 'vi',
  omitZeroMinute: 'false',
  search: 'Tìm kiếm',
  hours: 'Theo Giờ',
  overnight: 'Qua đêm',
  daily: 'Theo Ngày',
  additional: 'Giờ thêm',
  breadcrumb,
  placeholder,
  validation,
  payment,
  page,
  option,
  gender,
  status,
  button,
  message,
  daysOfWeek,
  no_data: 'Không có dữ liệu',
  loading: 'Lấy dữ liệu'
}
