// TODO: https://github.com/vbenjs/vite-plugin-compression
import commpressPlugin from 'vite-plugin-compression'

/*
  静态压缩
  在客户端替nginx处理压缩文件这一步操作，nginx便可直接使用我们压缩好的文件，尽可能减少对服务端内存的使用

  保证Nginx存在`ngx_http_gzip_static_module`模块, 一般配置:
  gzip_static on;
*/
export const useGzip = () =>
  commpressPlugin({
    ext: '.gz',
    deleteOriginFile: false
  })
