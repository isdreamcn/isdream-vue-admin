/**
 * Vditor CDN 配置
 * Vditor 采用按需加载机制，运行时需通过 CDN 加载主题、表情等静态资源
 * @see https://ld246.com/article/1549638745630#CDN-切换
 *
 * 如需提高稳定性，可将 CDN 资源下载到本地 public 目录，步骤如下：
 * 1. 访问 https://www.jsdelivr.com/package/npm/vditor?version=3.11.2
 * 2. 将整个 dist 目录下载到 public/vditor/
 * 2. 将下方 cdn 改为 '/vditor'（即 public/vditor 的访问路径）
 */

export const useVditorCDN = () => {
  const cdn = 'https://cdn.jsdelivr.net/npm/vditor@3.11.2'
  return {
    cdn,
    themePath: `${cdn}/dist/css/content-theme`,
    emojiPath: `${cdn}/dist/images/emoji`
  }
}
