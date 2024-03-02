import _ from 'lodash'

export interface Example {
  '@id': string
  '@type': string
  id: number
}

export function createExample(payload: Partial<Example> = {}) {
  return {
    '@id': undefined,
    '@type': undefined,
    id: undefined,
    ...payload,
  }
}
