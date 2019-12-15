import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    authorized: !!localStorage.getItem('refreshToken'),
  },

  getters: {
    authorized: state => state.authorized,
    accessToken: state => state.accessToken,
    refreshToken: state => state.accessToken,
  },

  mutations: {
    setAccessToken(state, token) {
      localStorage.setItem('accessToken', token)
      state.accessToken = token
    },
    setRefreshToken(state, token) {
      localStorage.setItem('refreshToken', token)
      state.refreshToken = token
    },
    setAuthorized(state, authorized) {
      state.authorized = authorized
    },
  },

  actions: {
    async signIn({ commit }, { email, password }) {
      const res = await axios.post('/auth/signIn', {
        email,
        password,
      })

      const { data } = res

      if (data.errors) {
        return Promise.reject(data.errors)
      }

      const { access, refresh } = data

      commit('setAccessToken', access)
      commit('setRefreshToken', refresh)
      commit('setAuthorized', true)

      return Promise.resolve()
    },

    async signUp({ commit }, {
      email, password, address, name,
    }) {
      const res = await axios.post('/auth/signUp', {
        email,
        password,
        address,
        name,
      })

      const { data } = res

      if (data.errors) {
        return Promise.reject(data.errors)
      }

      const { access, refresh } = data

      commit('setAccessToken', access)
      commit('setRefreshToken', refresh)
      commit('setAuthorized', true)

      return Promise.resolve()
    },

    async refresh({ commit, state }) {
      const res = await axios.post('/auth/refresh', {
        token: state.refreshToken,
      })

      const { data } = res

      if (data.errors) {
        commit('setAuthorized', false)
        return Promise.reject(data.errors)
      }

      const { access, refresh } = data

      commit('setAccessToken', access)
      commit('setRefreshToken', refresh)
      commit('setAuthorized', true)

      return Promise.resolve()
    },
  },
}
