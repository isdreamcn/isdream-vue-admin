import type { DefaultRouteMeta } from '@/config'
import type { VNode } from 'vue'
import { h, defineComponent, computed, KeepAlive } from 'vue'
import { RouterView } from 'vue-router'
import appConfig from '@/config'
import { useRouterStore } from '@/store'

interface RouterViewProps {
  Component: VNode
}
type BasicLayoutOptions = Pick<DefaultRouteMeta, 'keepAlive'>

const createKeepAliveVNode = (name: string, Component?: VNode) => {
  const routerStore = useRouterStore()
  const aliveInclude = computed(() => routerStore.getAlive(name))
  return h(
    KeepAlive,
    {
      include: aliveInclude.value
    },
    Component ? h(Component) : undefined
  )
}

export const createBasicLayout = (name: string, options?: BasicLayoutOptions) =>
  defineComponent({
    name,
    setup() {
      return () =>
        h(RouterView, null, {
          default: ({ Component }: RouterViewProps) => {
            if (options?.keepAlive ?? appConfig.defaultRouteMeta.keepAlive) {
              return createKeepAliveVNode(name, Component)
            }
            return h(Component)
          }
        })
    }
  })
