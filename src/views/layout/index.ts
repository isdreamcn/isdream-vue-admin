import type { VNode } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { DefaultRouteMeta } from '@/config'
import { h, defineComponent, computed, KeepAlive, Transition } from 'vue'
import { RouterView } from 'vue-router'
import appConfig from '@/config'
import { useRouterStore } from '@/store'

interface RouterViewProps {
  Component: VNode
  route: RouteLocationNormalizedLoaded
}
type BasicLayoutOptions = Pick<DefaultRouteMeta, 'keepAlive'>

const createKeepAliveVNode = (
  name: string,
  Component?: VNode,
  route?: RouteLocationNormalizedLoaded
) => {
  const routerStore = useRouterStore()
  const aliveInclude = computed(() => routerStore.getAlive(name))
  let isRouterViewChildren = true
  if (route) {
    isRouterViewChildren = !!route?.matched.find((v) => v.name === name)
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
  name?: string,
  options?: BasicLayoutOptions
) =>
  defineComponent({
    name,
    setup() {
      return () =>
        h(RouterView, null, {
          default: ({ Component, route }: RouterViewProps) => {
            if (
              name &&
              (options?.keepAlive ?? appConfig.defaultRouteMeta.keepAlive)
            ) {
              return createTransitionVNode(
                createKeepAliveVNode(name, Component, route)
              )
            }
            return createTransitionVNode(Component)
          }
        })
    }
  })
