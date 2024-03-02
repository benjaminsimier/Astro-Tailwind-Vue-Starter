import type { ErrorResponse } from '../types/utils/response'

export const useCatchError = (err: any, t: (key: string) => string) => {
  const code: number = +err?.response?.status || 500
  const data: ErrorResponse = err?.response?._data

  let summary: string
  let detail: string
  let severity: string

  if (code > 499) {
    summary = 'error.title'
    detail = 'error.message'
    severity = 'error'
  }

  if (data) {
    summary = data['hydra:title'] || data.title
    detail = data['hydra:description'] || data.detail || data.message
    severity = 'error'
  }

  return {
    summary,
    detail,
    severity,
    code,
  }
}
