import Cookies from 'js-cookie'
const Base64 = require('js-base64').Base64

const TokenKey = 'Admin-Token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function getRole () {
  return Cookies.get('role')
}

export function getName () {
  return Cookies.get('name')
}

export function setRole (role) {
  return Cookies.set('role', role)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function setName (name) {
  return Cookies.set('name', Base64.encode(name))
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function removeRole () {
  return Cookies.remove('role')
}

export function removeName () {
  return Cookies.remove('name')
}
