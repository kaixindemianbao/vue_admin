import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/views/layout/Layout'

Vue.use(Router)

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {
    path: '/',
    redirect: '/home',
    hidden: true
  },
  {
    path: '/dashBoard',
    redirect: '/home',
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/login'),
    hidden: true
  },
  {
    path: '/ldap_login',
    component: () => import('@/views/ldap_auth/ldap_login'),
    hidden: true
  },
  // 找回密码
  {
    path: '/forgetPassword',
    component: () => import('@/views/login/forgetPassword'),
    hidden: true
  },
  // 重置密码
  {
    path: '/resetPassword',
    component: () => import('@/views/login/resetPassword'),
    hidden: true
  },
  // 首页
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    name: 'Home',
    meta: { title: '首页', icon: 'all', requiresAuth: true },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/home/index'),
        meta: { title: '系统首页', icon: 'tree' }
      },
      {
        path: 'accountSetting',
        name: 'AccountSetting',
        component: () => import('@/views/home/accountSetting'),
        meta: { title: '账户设置', icon: 'tree' }
      },
      {
        path: 'conLog',
        name: 'ConLog',
        component: () => import('@/views/home/conLog'),
        meta: { title: '登陆日志', icon: 'tree' }
      }
    ]
  }
]

export const asyncRouterMap = [
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/admin1',
    name: 'Admin',
    meta: { title: 'Admin', icon: 'example', roles: ['admin', 'DBA'], requireAuth: true }, // you can set roles in root nav
    alwaysShow: true,
    children: [
      {
        path: 'admin1',
        name: 'Admin1',
        component: () => import('@/views/admin/index'),
        meta: { title: 'Admin1', icon: 'tree' }
      }
    ]
  },
  {
    path: '/manage',
    component: Layout,
    name: 'manage',
    meta: { title: '资源管理', icon: 'all', requireAuth: true, roles: ['DBA'] },
    children: [
      {
        path: 'machine_manage',
        name: 'machine_manage',
        component: () => import('@/views/manange/manage'),
        meta: { title: 'DB资源管理', icon: 'tree' }
      }]
  },
  {
    path: '/mysql_explain',
    component: Layout,
    name: 'mysql_order',
    meta: { title: '使用说明', icon: 'all', requireAuth: true, roles: ['DBA', '研发', '研发组长'] },
    children: [
      {
        path: 'explain',
        name: 'explain',
        component: () => import('@/views/admin/shuoming'),
        meta: { title: '平台使用说明', icon: 'tree' }
      }]
  },
  {
    path: '/mysql_status',
    component: Layout,
    name: 'mysql_status',
    meta: { title: '数据库', icon: 'all', requireAuth: true, roles: ['DBA'] },
    children: [
      {
        path: 'mysql_now_status',
        name: 'mysql_now_status',
        component: () => import('@/views/mysql_status/mysql_process'),
        meta: { title: '问题排查', icon: 'tree' }
      },
      {
        path: 'mysql_dump',
        name: 'mysql_dump',
        component: () => import('@/views/mysql_status/mysql_kill_query'),
        meta: { title: 'kill查询', icon: 'tree' }
      },
      {
        path: 'mysql_user_config',
        name: 'mysql_user_config',
        component: () => import('@/views/mysql_status/zk_config'),
        meta: { title: '新用户配置', icon: 'tree' }
      },
      {
        path: 'manage_meta',
        name: 'manage_meta',
        component: () => import('@/views/manange/manage_hd'),
        meta: { title: '元数据管理', icon: 'tree' }
      },
      {
        path: 'linux_cmd',
        name: 'linux_cmd',
        component: () => import('@/views/mysql_status/mysql_cmd'),
        meta: { title: '服务器命令', icon: 'tree' }
      },
      {
        path: 'mysql_archiver',
        name: 'mysql_archiver',
        component: () => import('@/views/mysql_status/mysql_prchiver'),
        meta: { title: '数据库归档', icon: 'tree' }
      }
    ]
  },
  {
    path: '/mysql_order',
    component: Layout,
    name: 'mysql_order',
    meta: { title: 'DML工单', icon: 'all', requireAuth: true, roles: ['DBA', '研发', '研发组长'] },
    children: [
      {
        path: 'mysql_dml',
        name: 'mysql_dml',
        component: () => import('@/views/diy_dml/dml_order'),
        meta: { title: '工单提交', icon: 'tree' }
      }]
  },
  {
    path: '/mysql_order_list',
    component: Layout,
    name: 'mysql_order_list',
    meta: { title: '工单查看', icon: 'all', requireAuth: true, roles: ['DBA', '研发', '研发组长'] },
    children: [
      {
        path: 'mysql_dml_list',
        name: 'mysql_dml_list',
        component: () => import('@/views/order/order_list'),
        meta: { title: '工单查看', icon: 'tree' }
      }]
  },
  {
    path: '/mysql_slow_log',
    component: Layout,
    name: 'mysql_slow_log',
    meta: { title: '慢日志', icon: 'all', requireAuth: true, roles: ['DBA', '研发', '研发组长'] },
    children: [
      {
        path: 'mysql_slow',
        name: 'mysql_slow',
        component: () => import('@/views/slowlog/mysql_slow_log'),
        meta: { title: '慢日志', icon: 'tree' }
      }]
  },
  {
    path: '/mysql_binlog_log',
    component: Layout,
    name: 'mysql_binlog_log',
    meta: { title: '事务日志', icon: 'all', requireAuth: true, roles: ['DBA', '研发组长'] },
    children: [
      {
        path: 'binlog_info',
        name: 'binlog_info',
        component: () => import('@/views/binlog/binlog_info'),
        meta: { title: '日志查看', icon: 'tree' }
      },
      {
        path: 'binlog_jiexi',
        name: 'binlog_jiexi',
        component: () => import('@/views/binlog/mysql_binlog'),
        meta: { title: '日志解析', icon: 'tree' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    name: 'order',
    meta: { title: '工单管理', icon: 'all', requireAuth: true, roles: ['DBA', '研发组长'] },
    children: [
      {
        path: 'order_dml',
        name: 'order_dml',
        component: () => import('@/views/order/order'),
        meta: { title: '工单处理', icon: 'tree' }
      }]
  },
  {
    path: '/mysql_meta_data',
    component: Layout,
    name: 'mysql_meta_data',
    meta: { title: '元数据', icon: 'all', requireAuth: true, roles: ['DBA', '研发', '研发组长'] },
    children: [
      {
        path: 'mysql_meta',
        name: 'mysql_meta',
        component: () => import('@/views/mysql/mysql_db_host'),
        meta: { title: '元数据', icon: 'tree' }
      }]
  },
  {
    path: '/mysql',
    component: Layout,
    name: 'mysql-query',
    meta: { title: '数据查询', icon: 'all', requireAuth: true, roles: ['DBA', '研发', '研发组长'] },
    children: [
      {
        path: 'mysql_search',
        name: 'mysql-select',
        component: () => import('@/views/mysql/select_db'),
        meta: { title: '查询-数据', icon: 'tree' }
      },
      {
        path: 'mysql_log',
        name: 'mysql_log',
        component: () => import('@/views/mysql/select_log'),
        meta: { title: '查询-日志', icon: 'tree' }
      },
      {
        path: 'db_list',
        name: 'db_list',
        component: () => import('@/views/mysql/select_list'),
        meta: { title: '查询-列表', icon: 'tree' }
      }
    ]
  },
  {
    path: '/redis_query',
    component: Layout,
    name: 'redis',
    meta: { title: 'redis查询', icon: 'all', requireAuth: true, roles: ['DBA', '研发组长'] },
    children: [
      {
        path: 'redis_query_data',
        name: 'redis_query_data',
        component: () => import('@/views/redis_query/redis_query'),
        meta: { title: 'redis查询', icon: 'tree' }
      }]
  },
  {
    path: '/premission',
    component: Layout,
    name: 'mysql-premission',
    meta: { title: '数据库权限', icon: 'all', requireAuth: true, roles: ['DBA'] },
    children: [
      {
        path: 'premission',
        name: 'premission',
        component: () => import('@/views/mysql_permission/m_permission'),
        meta: { title: '权限授予', icon: 'tree' }
      },
      {
        path: 'premission_list',
        name: 'premission_list',
        component: () => import('@/views/mysql_permission/m_permission_list'),
        meta: { title: '权限管理', icon: 'tree' }
      }
    ]
  },
  {
    path: '/configure',
    component: Layout,
    name: 'configure',
    meta: { title: '全局', icon: 'all', requireAuth: true, roles: ['DBA'] },
    children: [
      {
        path: 'inception_conf',
        name: 'inception_conf',
        component: () => import('@/views/configure/inception'),
        meta: { title: 'inception配置', icon: 'tree' }
      },
      {
        path: 'inception_value',
        name: 'inception_value',
        component: () => import('@/views/configure/inception_global'),
        meta: { title: 'inception环境配置', icon: 'tree' }
      },
      {
        path: 'account_conf',
        name: 'account_conf',
        component: () => import('@/views/configure/account'),
        meta: { title: '读写账号管理', icon: 'tree' }
      }
    ]
  },
  {
    path: '/user_manage',
    component: Layout,
    name: 'user_manage',
    meta: { title: '账户管理', icon: 'all', requireAuth: true, roles: ['DBA'] },
    children: [
      {
        path: 'user_select',
        name: 'use_select',
        component: () => import('@/views/user/select_user'),
        meta: { title: '用户管理', icon: 'tree' }
      },
      {
        path: 'user_group',
        name: 'use_group',
        component: () => import('@/views/user/depement_user'),
        meta: { title: '用户组管理', icon: 'tree' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 1 }),
  routes: constantRouterMap
})
