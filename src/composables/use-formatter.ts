import _ from 'lodash'

/**
 * Formatter
 */
export const useFormatter = () => {
  return {
    date(value: Date | string) {
      if (!value) return '-'

      const date = new Date(value)

      if (date.toString() === 'Invalid Date') return value

      return date.toLocaleDateString('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    },

    time(value: Date | string) {
      if (!value) return '-'

      const date = new Date(value)

      if (date.toString() === 'Invalid Date') return value

      return date.toLocaleTimeString('en-US', {
        timeZone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
      })
    },

    number(value = 0) {
      let number = Number(value)

      if (isNaN(number)) {
        number = 0
      }

      return number.toLocaleString()
    },

    currency(value = 0, currency = 'THB') {
      let number = Number(value)

      if (isNaN(number)) {
        number = 0
      }

      return number.toLocaleString('th-TH', {
        style: 'currency',
        currency,
      })
    },

    title(value: string) {
      return _.startCase(value)
    },

    param(value: string) {
      return _.kebabCase(value)
    },

    flag(code = 'en') {
      const flags = {
        fr: 'FR',
        en: 'US',
      }

      return flags[code] || flags.en
    },

    convertLocalDateToUTCIgnoringTimezone(d: Date) {
      if (!d) return null

      const timestamp = Date.UTC(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds(),
        d.getMilliseconds()
      )

      return new Date(timestamp)
    },

    convertUTCToLocalDateIgnoringTimezone(utc: Date) {
      if (!utc) return null

      return new Date(
        utc.getUTCFullYear(),
        utc.getUTCMonth(),
        utc.getUTCDate(),
        utc.getUTCHours(),
        utc.getUTCMinutes(),
        utc.getUTCSeconds(),
        utc.getUTCMilliseconds()
      )
    },
  }
}
