import _ from 'lodash'
import { useFormatter } from '@composables/use-formatter'
import { computed } from 'vue'

type Type =
  | 'string'
  | 'object'
  | 'array'
  | 'datetime'
  | 'datetimeBirth'
  | 'number'
  | 'boolean'
  | 'time'

export const useInput = (props, emit, type: Type = 'string') => {
  const formatter = useFormatter()

  const prepareValue = (value) => {
    let _value = null
    switch (type) {
      case 'object':
        _value = _.isObject(value) ? value['@id'] : value
        break

      case 'array':
        _value = _.map(value, (item) => {
          return _.isObject(item) ? item['@id'] : item
        })
        break

      case 'datetime':
        _value = value ? new Date(value) : new Date()
        break

      case 'datetimeBirth':
        _value = value ? new Date(value) : null
        break

      case 'time':
        _value = value
          ? new Date(value)
              .toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
              .replace(/:\d+ /, ' ')
          : new Date()
              .toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
              .replace(/:\d+ /, ' ')

        break

      case 'number':
        _value = Number(value)
        break

      case 'boolean':
        _value = Boolean(value)
        break

      default:
        _value = value
        break
    }

    return _value
  }

  const value = computed({
    get() {
      return prepareValue(props.modelValue)
    },
    set(value) {
      if (type === 'datetime') {
        emit(
          'update:modelValue',
          formatter.convertLocalDateToUTCIgnoringTimezone(value)
        )
      } else {
        emit('update:modelValue', value)
      }
    },
  })

  const inputName = computed(() => {
    return props.name || props.label
  })

  const invalid = computed(() => {
    return props.errors && props.errors.length > 0
  })

  return {
    props,
    value,
    inputName,
    invalid,
  }
}
