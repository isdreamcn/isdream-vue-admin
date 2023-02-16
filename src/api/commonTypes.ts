export interface CommonListParams {
  page?: number
  pageSize?: number
  q?: string | null
}

export interface UploadFile {
  url: string
  filename: string
  mimeType: string
}
