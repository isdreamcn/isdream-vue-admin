// TODO: https://github.com/btd/rollup-plugin-visualizer
// 依赖分析 (stats.html)
// 可视化并分析您的 Rollup 包，分析项目中的文件大小及引用情况

import { visualizer } from 'rollup-plugin-visualizer'

export const rollupVisualizer = () => visualizer() as unknown
