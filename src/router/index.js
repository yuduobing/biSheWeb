import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
    },
    {
        path: '/fullchart',
        component: () => import('@/views/fullChart/index'),
        hidden: true
    },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 管理员管理页面
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/index',
    hidden: false,
    children: [
      {
        path: 'AdminIndex',
        component: () => import('@/views/admin/index'),
        name: 'AdminIndex',
        meta: { title: '管理员管理', icon: 'skill', noCache: true, roles: ['SuperAdmin', 'admin'] }
      }
    ]
  },
  {
    path: '/myuser',
    component: Layout,
    redirect: '/myuser/index',
    hidden: false,
    children: [
      {
        path: 'MyuserIndex',
        component: () => import('@/views/myuser/index'),
        name: 'AdminIndex',
        meta: { title: '用户管理', icon: 'skill', noCache: true, roles: ['SuperAdmin', 'admin'] }
      }
    ]
  },
  // 疫情数据管理
  {
    path: '/covid',
    component: Layout,
    redirect: '/covid/index',
    hidden: false,
    children: [
      {
        path: 'CovidIndex',
        component: () => import('@/views/covid/index'),
        name: 'CovidIndex',
        meta: { title: '疫情数据管理', icon: 'skill', noCache: true, roles: ['SuperAdmin', 'admin'] }
      }
    ]
  },
  // 数据可视化
  {
    path: '/chart',
    component: Layout,
    redirect: '/chart/index',
    hidden: true,
    children: [
      {
        path: 'ChartIndex',
        component: () => import('@/views/chart/index'),
        name: 'ChartIndex',
        meta: { title: '数据可视化', icon: 'skill', noCache: true, roles: ['SuperAdmin', 'admin', 'user'] }
      }
    ]
    },
  // 数据可视化2
  {
    path: '/chart2',
    component: Layout,
    redirect: '/chart2/index',
    hidden: false,
    children: [
      {
        path: 'ChartIndex',
        component: () => import('@/views/chart2/index'),
        name: 'ChartIndex',
        meta: { title: '数据可视化', icon: 'skill', noCache: true, roles: ['SuperAdmin', 'admin', 'user'] }
      }
    ]
    },
    

  {
    path: '/error',
    component: Layout,
    hidden: true,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
