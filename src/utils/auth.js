let tokenName = 'token'

// 获取token
export const getToken = () => {
  return sessionStorage.getItem(tokenName)
}

// 设置token
export const setToken = token => {
  sessionStorage.setItem(tokenName, token)
}

// 删除token
export const removeToken = () => {
  sessionStorage.removeItem(tokenName)
}
