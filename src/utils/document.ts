export const setDocumentTitle = (title?: string) => {
  const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE
  document.title = title ? `${title} | ${VITE_APP_TITLE}` : VITE_APP_TITLE
}
