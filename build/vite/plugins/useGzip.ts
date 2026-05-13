// @see https://github.com/nonzzz/vite-plugin-compression
import { compression } from 'vite-plugin-compression2'

/**
 * 静态资源压缩插件
 *
 * 在构建时预生成 .gz 和 .br 压缩文件，配合 Nginx 静态压缩模块使用：
 * - gzip_static on;        # 需要 ngx_http_gzip_static_module
 * - brotli_static on;      # 需要 ngx_http_brotli_module
 *
 * 优势：服务端直接返回预压缩文件，避免运行时压缩的 CPU 开销
 *
 * @returns 压缩插件数组
 */
export const useGzip = () =>
  compression({
    algorithms: ['gzip', 'brotliCompress'],
    deleteOriginalAssets: false
  })
