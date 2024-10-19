type ActionError = {
  type: 'form' | 'internal'
} & Record<string, string>

type ActionResponseProps<Data> = {
  data?: Data | null
  error?: ActionError
}

export class ActionResponse<Data> {
  private readonly _data: Data | null
  private readonly _error: ActionError | null

  constructor({ data = null, error }: ActionResponseProps<Data>) {
    this._data = data ?? null
    this._error = error ?? null
  }

  get hasError(): boolean {
    return Boolean(this._error)
  }

  get data(): Data {
    if (!this._data) {
      throw new Error('Server action response data error')
    }

    return this._data
  }

  get error(): ActionError {
    if (!this._error) {
      throw new Error('Server action response error')
    }

    return this._error
  }
}
