export default (axiosInstance, store) => {
  axiosInstance.interceptors.request.use(async (request) => {
    // eslint-disable-next-line no-param-reassign
    request.headers.authorization = `Bearer ${store.getters['authorization/refreshToken']}`

    return request
  })
}
