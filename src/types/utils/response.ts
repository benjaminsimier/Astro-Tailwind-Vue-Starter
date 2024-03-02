export interface CollectionResponse<T> {
  '@context'?: string
  '@id'?: string
  '@type'?: string
  'hydra:member': Array<T>
  'hydra:search'?: any
  'hydra:totalItems': number
}

interface HydraError {
  '@context'?: string
  '@type'?: string
  'hydra:title': string
  'hydra:description': string
  trace?: any
}

interface ValidatorError {
  title?: string
  detail?: string
}

export interface ErrorResponse extends HydraError, ValidatorError {
  code?: string
  message?: string
}
