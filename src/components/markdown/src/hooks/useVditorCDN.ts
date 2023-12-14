// 由于使用了按需加载的机制，默认 CDN 为 `https://unpkg.com/vditor@` 版本号
// TODO: https://ld246.com/article/1549638745630#CDN-切换

export const useVditorCDN = () => {
  const cdn = 'https://cdn.jsdelivr.net/npm/vditor@3.9.6'
  return {
    cdn,
    themePath: `${cdn}/dist/css/content-theme`,
    emojiPath: `${cdn}/dist/images/emoji`
  }
}
