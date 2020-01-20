import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'
import { getToken, getRole } from '@/common/utils/auth'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/ldap_login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  // 路由跳转前判断
  NProgress.start()
  // 进度条显示
  if (getToken()) {
    if (to.path === '/ldap_login') {
      next({ path: '/ldap_login' })
      NProgress.done()
    } else {
      if (store.getters.addRouters.length === 0) {
        // 拉取用户信息
        const roles = store.getters.roles[0] || getRole()
        console.log(roles)
        // 根据roles权限生成可访问的路由表,这里获取的是全局变量
        store.dispatch('GenerateRoutes', { roles: [roles] }).then(() => {
          router.addRoutes(store.getters.addRouters)
          next({ ...to, replace: true })
          // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('验证失败,请重新登录')
            next({ path: '/ldap_login' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
      NProgress.done()
    } else {
      next('/ldap_login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  console.log('测试5')
  NProgress.done() // 结束Progress
})
