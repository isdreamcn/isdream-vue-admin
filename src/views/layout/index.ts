import type { VNode } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { DefaultRouteMeta } from '@/config'
import { h, defineComponent, computed, KeepAlive, Transition } from 'vue'
import { RouterView } from 'vue-router'
import appConfig from '@/config'
import { useRouterStore } from '@/store'

export const createEmptyVNode = (tag = 'div') => h(tag)

interface RouterViewProps {
  Component: VNode
  route: RouteLocationNormalizedLoaded
}
type BasicLayoutOptions = Pick<DefaultRouteMeta, 'keepAlive'>

const createKeepAliveVNode = (
  path: string,
  Component?: VNode,
  route?: RouteLocationNormalizedLoaded
) => {
  const routerStore = useRouterStore()
  const aliveInclude = computed(() => routerStore.getAlive(path))
  let isRouterViewChildren = true
  if (route) {
    isRouterViewChildren = !!route?.matched.find((v) => v.path === path)
  }
  return h(
    KeepAlive,
    {
      include: aliveInclude.value
    },
    Component && isRouterViewChildren ? h(Component) : undefined
  )
}

export const createTransitionVNode = (Component: VNode) => {
  return h(
    Transition,
    {
      // 初次显示动画
      appear: true,
      'enter-active-class': 'animate__animated animate__lightSpeedInRight'
    },
    {
      default: () => Component
    }
  )
}

export const createBasicLayout = (
  path?: string,
  options?: BasicLayoutOptions
) =>
  defineComponent({
    name: path,
    setup() {
      return () =>
        h(RouterView, null, {
          default: ({ Component, route }: RouterViewProps) => {
            if (
              path &&
              (options?.keepAlive ?? appConfig.defaultRouteMeta.keepAlive)
            ) {
              return createTransitionVNode(
                createKeepAliveVNode(path, Component, route)
              )
            }
            return createTransitionVNode(Component)
          }
        })
    }
  })
