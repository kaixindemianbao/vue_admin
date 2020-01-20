import { getInfo, logout } from '@/api/login'
import { ldap_login } from '../../api/ldap'
import { getToken, removeToken, setToken, setRole, removeRole, setName, removeName } from '@/common/utils/auth'
import * as types from '../mutation-types'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    [types.SET_TOKEN] (state, token) {
      state.token = token
    },
    [types.SET_NAME] (state, name) {
      state.name = name
    },
    [types.SET_AVATAR] (state, avatar) {
      state.avatar = avatar
    },
    [types.SET_ROLES] (state, roles) {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const biaoshi = userInfo.biaoshi
      return new Promise((resolve, reject) => {
        ldap_login(username, userInfo.password, biaoshi).then(response => {
          if (response.data === '登录失败') { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          commit('SET_TOKEN', response.data.token)
          commit('SET_ROLES', response.data.roles)
          commit('SET_NAME', response.data.name)
          commit('SET_AVATAR', 'xxxawe')
          setToken(response.data.token)
          setRole(response.data.roles[0])
          setName(response.data.name)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo ({ commit, state }) {
      const token = getToken()
      return new Promise((resolve, reject) => {
        getInfo(token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          console.log('用户信息获取成功')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          removeRole()
          removeName()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeRole()
        resolve()
      })
    }
  }
}

export default user
