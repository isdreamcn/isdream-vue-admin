export interface CommonListParams {
  page?: number
  pageSize?: number
  q?: Nullable<string>
}

export interface CommonUploadFile {
  url: string
  filename: string
  mimeType?: string
  [x: string]: any
}
