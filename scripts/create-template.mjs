#!/usr/bin/env node
/**
 * 从当前仓库 HEAD 生成用于开发新项目的精简模板目录
 *
 * 用法：pnpm create:template <目标目录> [--init]
 *   --init  在目标目录中 git init 并完成首次提交
 *
 * 产物是仓库之外的独立目录，与模板仓库无任何 git 关联；
 * 模板后续演进不影响已生成的项目。
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

// ---------- 裁剪清单 ----------
/** 相对仓库根直接删除的文件/目录 */
const PRUNE_PATHS = [
  'docs', // VitePress 文档站点
  '.github/workflows/deploy-docs.yml', // GitHub Pages 文档部署
  'vitest.config.ts', // 测试配置
  'src/test', // 测试 setup
  'CHANGELOG.md' // 模板自身历史，新项目不需要
]
/** 递归删除的同名目录（测试用例目录） */
const PRUNE_DIR_NAMES = ['__tests__']
/** package.json 中需移除的 scripts 与 devDependencies */
const REMOVE_SCRIPTS = [
  'docs:dev',
  'docs:build',
  'docs:preview',
  'test',
  'test:run',
  'test:coverage'
]
const REMOVE_DEPS = [
  'vitepress',
  'vitest',
  '@vitest/coverage-v8',
  '@vue/test-utils',
  'happy-dom'
]

const targetArg = process.argv[2]
const doInit = process.argv.includes('--init')

if (!targetArg || targetArg.startsWith('--')) {
  console.error('用法: pnpm create:template <目标目录> [--init]')
  process.exit(1)
}

const repoRoot = path.resolve(process.cwd())
const target = path.resolve(targetArg)

// 目标目录必须不存在或为空，防止覆盖已有项目
if (fs.existsSync(target) && fs.readdirSync(target).length > 0) {
  console.error(`目标目录非空: ${target}`)
  process.exit(1)
}

const srcCommit = execSync('git rev-parse --short HEAD', { cwd: repoRoot })
  .toString()
  .trim()
fs.mkdirSync(target, { recursive: true })

// git archive 只导出 git 跟踪的文件，node_modules/dist 等生成物天然不会带出
execSync(`git archive HEAD | tar -x -C "${target}"`, {
  cwd: repoRoot,
  shell: true,
  stdio: 'pipe'
})

// 1. 删除清单中的文件/目录
for (const rel of PRUNE_PATHS) {
  fs.rmSync(path.join(target, rel), { recursive: true, force: true })
}
// 删除文档 workflow 后清理可能残留的空目录
for (const dir of ['.github/workflows', '.github']) {
  const full = path.join(target, dir)
  try {
    fs.rmdirSync(full)
  } catch {
    // 非空则保留
  }
}

// 2. 递归删除 __tests__ 目录
const pruneTestDirs = (dir) => {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    if (fs.statSync(full).isDirectory()) {
      if (PRUNE_DIR_NAMES.includes(name)) {
        fs.rmSync(full, { recursive: true })
      } else {
        pruneTestDirs(full)
      }
    }
  }
}
pruneTestDirs(target)

// 3. 改写 package.json：移除测试与文档相关的脚本、依赖
const pkgPath = path.join(target, 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
for (const key of REMOVE_SCRIPTS) delete pkg.scripts?.[key]
if (pkg.devDependencies) {
  for (const key of REMOVE_DEPS) delete pkg.devDependencies[key]
}
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

// 4. 同步 tsconfig：移除 vitest 相关引用，否则删除依赖后 type-check 报错
const rewrite = (rel, replaces) => {
  const full = path.join(target, rel)
  let content = fs.readFileSync(full, 'utf-8')
  for (const [pattern, replacement] of replaces) {
    content = content.replace(pattern, replacement)
  }
  if (/vitest/i.test(content)) {
    console.warn(`警告: ${rel} 中仍残留 vitest 引用，请人工检查`)
  }
  fs.writeFileSync(full, content)
}
rewrite('tsconfig.json', [
  [/"vitest\/globals"\s*,\s*/, ''],
  [/,\s*"vitest\/globals"/, '']
])
rewrite('tsconfig.node.json', [[/\s*"vitest\.config\.ts",/, '']])

// 5. 可选：初始化为独立仓库
if (doInit) {
  execSync('git init -q && git add -A && git commit -q -m "init: 基于 isdream-vue-admin 模板初始化"', {
    cwd: target,
    shell: true,
    stdio: 'pipe'
  })
}

console.log(`模板已生成: ${target}（来源 ${srcCommit}）`)
console.log(`后续步骤:
  1. cd ${targetArg} && pnpm install
  2. 修改 .env* 中的 VITE_APP_TITLE / VITE_BASE_URL
  3. 修改 src/config/index.ts 的 storage 前缀（默认 isdream，避免同域项目 localStorage 串数据）
  4. 修改 package.json 的 name/version
  5. 首次需运行 pnpm dev 或 pnpm build:prod 生成 auto-imports.d.ts 后再执行 pnpm type-check`)
