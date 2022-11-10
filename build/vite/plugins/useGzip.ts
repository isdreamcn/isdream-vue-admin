// TODO: https://github.com/vbenjs/vite-plugin-compression
import commpressPlugin from 'vite-plugin-compression'

export const useGzip = () =>
  commpressPlugin({
    ext: '.gz',
    deleteOriginFile: false
  })
