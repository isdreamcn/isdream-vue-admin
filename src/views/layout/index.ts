import type { VNode } from 'vue'
import type { RouteLocationNormalizedLoaded, RouteComponent } from 'vue-router'
import type { DefaultRouteMeta } from '@/config'
import { h, defineComponent, computed, KeepAlive, Transition } from 'vue'
import { RouterView } from 'vue-router'
import { appConfig } from '@/config'
import { useRouterStore } from '@/store'
import { isFunction, isPromise, isObject } from '@/utils'

export const createEmptyVNode = (tag = 'div') => h(tag)

interface RouterViewProps {
  Component: VNode
  route: RouteLocationNormalizedLoaded
}
type BasicLayoutOptions = Pick<DefaultRouteMeta, 'keepAlive'> & {
  transition?: boolean
}

const createKeepAliveVNode = (
  path: string,
  component: RouterViewProps['Component']
) => {
  const routerStore = useRouterStore()
  const aliveInclude = computed(() => routerStore.getAlive(path))

  return h(
    KeepAlive,
    {
      include: aliveInclude.value
    },
    component
  )
}

export const createTransitionVNode = (component: VNode) => {
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
      default: () => component
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

@see https://router.vuejs.org/zh/guide/migration/#-router-view-%E3%80%81-keep-alive-%E5%92%8C-transition-
@see https://github.com/vuejs/rfcs/blob/master/active-rfcs/0034-router-view-keep-alive-transitions.md
*/

export const createBasicLayout = (
  path?: string,
  options?: BasicLayoutOptions
) =>
  defineComponent({
    name: path,
    setup() {
      const {
        keepAlive = appConfig.needKeepAlive,
        transition = false
      } = options || {}

      return () =>
        h(RouterView, null, {
          default: ({ Component }: RouterViewProps) => {
            if (path && keepAlive) {
              Component = createKeepAliveVNode(path, Component)
            }
            if (transition) {
              Component = createTransitionVNode(Component)
            }
            return Component
          }
        })
    }
  })

type ResolvedModule = { default: RouteComponent } | RouteComponent
type NameableComponent = RouteComponent & { name?: string }

export const createHasNameComponent = (
  component: RouteComponent,
  name: string
): RouteComponent => {
  return (() => {
    let resolved: RouteComponent | Promise<ResolvedModule> | undefined = component

    if (isFunction(resolved)) {
      resolved = (resolved as () => RouteComponent | Promise<ResolvedModule>)()
    }

    if (isPromise<ResolvedModule>(resolved)) {
      resolved.then((res) => {
        const target = isObject(res) && 'default' in res ? res.default : res
        if (isObject(target)) {
          ;(target as NameableComponent).name = name
        }
        return res
      })
    }

    if (isObject(resolved)) {
      ;(resolved as NameableComponent).name = name
    }

    return resolved as RouteComponent
  }) as RouteComponent
}
