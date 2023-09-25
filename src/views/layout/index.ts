import type { VNode } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { DefaultRouteMeta } from '@/config'
import { h, defineComponent, computed, KeepAlive, Transition } from 'vue'
import { RouterView } from 'vue-router'
import { appConfig } from '@/config'
import { useRouterStore } from '@/store'

export const createEmptyVNode = (tag = 'div') => h(tag)

interface RouterViewProps {
  Component: VNode
  route: RouteLocationNormalizedLoaded
}
type BasicLayoutOptions = Pick<DefaultRouteMeta, 'keepAlive'>

const createKeepAliveVNode = (
  path: string,
  Component: RouterViewProps['Component']
) => {
  const routerStore = useRouterStore()
  const aliveInclude = computed(() => routerStore.getAlive(path))

  return h(
    KeepAlive,
    {
      include: aliveInclude.value
    },
    Component
  )
}

export const createTransitionVNode = (Component: VNode) => {
  return h(
    Transition,
    {
      // 初次显示动画
      appear: true,
      // 先执行离开动画，然后在其完成之后再执行元素的进入动画
      mode: 'out-in',
      'enter-active-class': 'animate__animated animate__lightSpeedInRight'
    },
    {
      default: () => Component
    }
  )
}

/*
transition 和 keep-alive 现在必须通过 v-slot API 在 RouterView 内部使用：

<router-view v-slot="{ Component }">
  <transition>
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </transition>
</router-view>

TODO: https://router.vuejs.org/zh/guide/migration/#-router-view-%E3%80%81-keep-alive-%E5%92%8C-transition-
TODO: https://github.com/vuejs/rfcs/blob/master/active-rfcs/0034-router-view-keep-alive-transitions.md
*/

export const createBasicLayout = (
  path?: string,
  options?: BasicLayoutOptions
) =>
  defineComponent({
    name: path,
    setup() {
      return () =>
        h(RouterView, null, {
          default: ({ Component }: RouterViewProps) => {
            if (
              path &&
              (options?.keepAlive ?? appConfig.defaultRouteMeta.keepAlive)
            ) {
              return createTransitionVNode(
                createKeepAliveVNode(path, Component)
              )
            }
            return createTransitionVNode(Component)
          }
        })
    }
  })
