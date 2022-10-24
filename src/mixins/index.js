import Vue from 'vue'
Vue.mixin({
  data () {
    return {
    }
  },
  methods: {
    formatImage (path) {
      return process.env.VUE_APP_IMAGES_URL + path
    },
    getCookie (cname) {
      const name = cname + '='
      const decodedCookie = decodeURIComponent(document.cookie)
      const ca = decodedCookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') {
          c = c.substring(1)
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length)
        }
      }
      return ''
    },
    defaultFormatter (value, empty = true) {
      if (empty !== true) {
        return value !== null ? value : 'N/A'
      } else {
        return value !== null && value !== '' ? value : 'N/A'
      }
    },
    formatMoney (value, option = { format: 'it-IT', currency: 'VND' }) {
      return value ? value.toLocaleString(option.format, { style: 'decimal', currency: option.currency }) : '0'
    },
    // Ex: 16:00:00, 16:00, 16h00p00s, 16h00m00s
    // reg need upgrade
    formatTimeByString (time) {
      if (time == null) {
        return ''
      }
      const reg = /[:|h]/
      const convertTime = String(time)
      switch (convertTime.match(reg)[0]) {
        case ':':
          if (convertTime.split(reg).length === 3) { return this.formatTime(convertTime) }
          return convertTime
        default:
          throw this.$message({
            type: 'error',
            message: 'Format Not Found'
          })
      }
    },
    formatTime (time) {
      if (time) {
        const dateObj = new Date('2011-04-20T' + time + '.01')
        let hour = dateObj.getHours()
        let min = dateObj.getMinutes()
        if (hour < 10) {
          hour = '0' + hour
        }
        if (min < 10) {
          min = '0' + min
        }
        return hour + ':' + min
      }
    },
    getAfterBeforeDate (date, time = true, isBefore = false) {
      if (date) {
        const dateObj = new Date(date)
        let month = dateObj.getMonth() + 1
        let day = isBefore === false ? String(dateObj.getDate() - 1).padStart(2, '0') : String(dateObj.getDate() + 1).padStart(2, '0')
        const year = dateObj.getFullYear()
        if (day === '00') {
          const today = new Date()
          month = month - 1
          day = String(new Date(today.getFullYear(), month, 0).getDate()).padStart(2, '0')
        }
        if (month < 10) {
          month = '0' + month
        }
        if (time !== true) {
          return year + '-' + month + '-' + day
        } else {
          let hour = dateObj.getHours()
          let min = dateObj.getMinutes()
          if (hour < 10) {
            hour = '0' + hour
          }
          if (min < 10) {
            min = '0' + min
          }
          return year + '-' + month + '-' + day + ' ' + hour + ':' + min
        }
      }
    },
    formatTimeByDate (time) {
      if (time) {
        const dateObj = new Date(time)
        let hour = dateObj.getHours()
        let min = dateObj.getMinutes()
        if (hour < 10) {
          hour = '0' + hour
        }
        if (min < 10) {
          min = '0' + min
        }
        return hour + ':' + min
      }
    },
    getPassDate (date, time = true) {
      if (date) {
        const dateObj = new Date(date)
        let month = dateObj.getMonth() + 1
        let day = String(dateObj.getDate() - 1).padStart(2, '0')
        const year = dateObj.getFullYear()
        if (day === '00') {
          const today = new Date()
          month = month - 1
          day = String(new Date(today.getFullYear(), month, 0).getDate()).padStart(2, '0')
        }
        if (month < 10) {
          month = '0' + month
        }
        if (time !== true) {
          return new Date(year + '-' + month + '-' + day)
        } else {
          let hour = dateObj.getHours()
          let min = dateObj.getMinutes()
          if (hour < 10) {
            hour = '0' + hour
          }
          if (min < 10) {
            min = '0' + min
          }
          return new Date(year + '-' + month + '-' + day + ' ' + hour + ':' + min)
        }
      }
    },
    formatDate (date, time = true) {
      if (date && date !== ' ') {
        let dateObj = new Date()
        if (typeof date !== 'object') { // format date for safari
          date = date.replace(/-/g, '/')
          dateObj = new Date(date)
        } else {
          dateObj = date
        }
        let month = dateObj.getMonth() + 1
        const day = String(dateObj.getDate()).padStart(2, '0')
        const year = dateObj.getFullYear()
        if (month < 10) {
          month = '0' + month
        }
        if (time !== true) {
          return year + '-' + month + '-' + day
        } else {
          let hour = dateObj.getHours()
          let min = dateObj.getMinutes()
          if (hour < 10) {
            hour = '0' + hour
          }
          if (min < 10) {
            min = '0' + min
          }
          return year + '-' + month + '-' + day + ' ' + hour + ':' + min
        }
      } else {
        return ' '
      }
    },

    setLocalStorageWithExpiry (key, value, ttl) {
      const now = new Date()

      // `item` is an object which contains the original value
      // as well as the time when it's supposed to expire
      const item = {
        value: value,
        expiry: now.getTime() + ttl
      }
      localStorage.setItem(key, JSON.stringify(item))
    },

    getLocalStorageWithExpiry (key) {
      const itemStr = localStorage.getItem(key)

      // if the item doesn't exist, return null
      if (!itemStr) {
        return null
      }

      const item = JSON.parse(itemStr)
      const now = new Date()

      // compare the expiry time of the item with the current time
      if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(key)
        return null
      }
      return item.value
    },

    // check hotel group or hotel single
    checkIsHotelGroup () {
      const itemStr = localStorage.getItem('profile')
      const item = JSON.parse(itemStr)
      const profile = item.value
      const roleSn = profile.roleSn
      const hotelGroupSn = profile.hotelGroupSn
      return roleSn === 4 && hotelGroupSn != null
    },

    hasPermission (page, action) {
      const itemStr = localStorage.getItem('profile')
      const item = JSON.parse(itemStr)
      const profile = item.value
      const permissions = profile.permissions
      let hasPermission = 0
      if (permissions[page]) {
        hasPermission = permissions[page][action] ?? 0
      }
      return hasPermission
    },
    checkPermissionMenu (page) {
      const itemStr = localStorage.getItem('profile')
      const item = JSON.parse(itemStr)
      const profile = item.value
      const permissions = profile.permissions
      let hasPermission = 1
      if (permissions[page]) {
        hasPermission = permissions[page].pView ?? 0
        if (hasPermission === 1) {
          return false
        } else {
          return true
        }
      }
    },
    hasRoleSn () {
      const itemStr = localStorage.getItem('profile')
      const item = JSON.parse(itemStr)
      const profile = item.value
      const hasRoleSn = profile.roleSn
      return hasRoleSn
    },
    forceLogout () {
      localStorage.removeItem('access_token')
      localStorage.removeItem('profile')
      localStorage.removeItem('isPopupVisible')
      window.location.href = 'sign-in'
    },

    groupBy (data, key) {
      return data.reduce(function (r, a) {
        r[a[key]] = r[a[key]] || []
        r[a[key]].push(a)
        return r
      }, Object.create(null))
    },
    formatEvenPrice (price) {
      let value = 0
      if (price > 1000) {
        value = Math.round(price / 1000) * 1000
      } else {
        value = price
      }
      return value
    },
    formatEvenPercent (value) {
      return Math.round(value)
    }
  }
})
