import DefaultService from '@services/DefaultService'
import type { Example } from '../types/entity/example'

export default class ExampleService extends DefaultService {
  readonly endpoint: string

  constructor() {
    super()

    this.endpoint = `${this.apiBase}/example`
  }

  async collection(params?: any) {
    const queryParams = new URLSearchParams(params).toString()
    const url = `${this.endpoint}?${queryParams}`

    const response = await fetch(url, {
      method: 'GET',
    })

    const result: Example[] = await response.json()
    return result
  }

  async item(slug: string) {
    const response = await this.collection({ slug });
    const data = response["hydra:member"];
    const result = data.find((r) => r.slug === slug);

    return result;
  }
}
