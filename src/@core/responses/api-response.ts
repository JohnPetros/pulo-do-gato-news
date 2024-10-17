type ApiResponseProps<Body> = {
  body?: Body
  statusCode?: number
  errorMessage?: string
}

export class ApiResponse<Body> {
  private readonly _body: Body | null
  private readonly _statusCode: number
  private readonly _errorMessage: string | null

  constructor({ body, statusCode, errorMessage }: ApiResponseProps<Body>) {
    this._body = body ?? null
    this._statusCode = statusCode ?? 200
    this._errorMessage = errorMessage ?? null
  }

  throwError() {
    throw new Error(this.errorMessage)
  }

  get isSuccess() {
    return this.statusCode < 400
  }

  get isFailure() {
    return this.statusCode >= 400
  }

  get body(): Body {
    if (this.isFailure) {
      throw new Error('Api response error')
    }

    return this._body as Body
  }

  get statusCode(): number {
    return this._statusCode
  }

  get errorMessage(): string {
    if (!this._errorMessage) {
      throw new Error('Api response error')
    }

    return this._errorMessage
  }
}
