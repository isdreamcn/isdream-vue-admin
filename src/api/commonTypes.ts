export interface CommonListParams {
  page?: number
  pageSize?: number
  q?: string | null
}

export interface CommonUploadFile {
  url: string
  filename: string
  mimeType?: string
  [x: string]: any
}
