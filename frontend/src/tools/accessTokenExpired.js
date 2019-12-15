export default (axiosInstance, store) => {
  axiosInstance.interceptors.response.use(async (response) => {
    if (response.data.accessTokenExpired) {
      await store.dispatch('authorization/refresh')

      return axiosInstance.post({
        ...response.config,
        header: {
          authorization: store.getters['authorization/refreshToken'],
        },
      })
    }

    return response
  })
}
