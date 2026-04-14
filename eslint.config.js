/**
 * ESLint Flat Config 配置文件
 * @see https://eslint.org/docs/latest/use/configure/configuration-files
 */

import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import typescriptEslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import globals from 'globals'

export default defineConfig(
  /**
   * 全局忽略配置
   * 必须放在配置数组首位，否则后续配置可能先匹配到被忽略的文件
   */
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '*.local',
      '*.log*',
      'public/**',
      '**/*.d.ts',
      'auto-imports.d.ts',
      'components.d.ts',
      'docs/.vitepress/cache/**',
      'docs/.vitepress/dist/**'
    ]
  },

  /**
   * 预设配置继承
   * 顺序: JS 基础规则 → TypeScript 规则 → Vue 规则
   */
  js.configs.recommended,
  ...typescriptEslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],

  /**
   * 全局语言选项配置
   * 适用于所有 JS/TS/Vue 文件
   */
  {
    name: 'global-language-options',
    files: ['**/*.{js,cjs,ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      }
    }
  },

  /**
   * Vue 文件解析器配置
   * Vue 文件使用 vue-eslint-parser 解析，内部脚本使用 TypeScript 解析器
   * @see https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
   */
  {
    name: 'vue-parser',
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptEslint.parser,
        extraFileExtensions: ['.vue']
      }
    }
  },

  /**
   * 自定义规则配置
   * 覆盖预设规则或添加项目特定规则
   */
  {
    name: 'custom-rules',
    rules: {
      // 关闭 no-undef，TypeScript 编译器已处理未定义变量检查
      'no-undef': 'off',

      // 要求使用 === 和 !==，避免类型转换问题
      eqeqeq: 'warn',

      // TypeScript 相关规则
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-duplicate-enum-values': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_'
        }
      ],

      // vue 相关规则
      'vue/prefer-import-from-vue': 'off',
      'vue/multi-word-component-names': 'off'
    }
  },

  /**
   * Prettier 配置
   * 必须放在最后，用于禁用与 Prettier 冲突的 ESLint 规则
   */
  eslintConfigPrettier
)
