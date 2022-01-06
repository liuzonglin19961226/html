// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard/workplace',
        name: 'Analysis',
        // component: RouteView,
        component: () => import('@/views/dashboard/Analysis'),
        meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] }
      },
      // 用户管理
      {
        path: '/manager',
        name: 'manager',
        component: RouteView,
        redirect: '/manager/userManager',
        meta: { title: '用户管理', icon: 'user' },
        children: [
          {
            path: '/manager/userManager',
            name: 'UserManager',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/manager/user/UserManager'),
            meta: { title: '用户列表', keepAlive: true }
          }
        ]
      },
      // 会员卡管理
      {
        path: '/memberCard',
        name: 'memberCard',
        component: RouteView,
        redirect: '/memberCard/memberCardList',
        meta: { title: '会员卡管理', icon: 'idcard' },
        children: [
          {
            path: '/memberCard/memberCardList',
            name: 'MemberCardList',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/memberManager/memberCard/MemberCardList'),
            meta: { title: '会员卡列表', keepAlive: true }
          }
        ]
      },
      // 商品管理
      {
        path: '/goodsManager',
        name: 'goodsManager',
        component: RouteView,
        redirect: '/goodsManager/goodsList',
        meta: { title: '商品管理', icon: 'menu' },
        children: [
          {
            path: '/goodsManager/categoryList',
            name: 'Category',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/goodsManager/Category'),
            meta: { title: '商品分类', keepAlive: true }
          },
          {
            path: '/memberOrder/memberOrderList',
            name: 'MemberOrderList',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/memberManager/memberOrder/MemberOrderList'),
            meta: { title: '订单管理', keepAlive: true }
          },
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
