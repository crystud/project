import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    usersList: {
      hasNextPage: false,
      list: [],
    },
    user: {},
  },

  getters: {
    usersList: state => state.usersList,
  },

  mutations: {
    setUsersList(state, users) {
      state.usersList.list = users
    },
    setHasNextPage(state, hasNextPage) {
      state.usersList.hasNextPage = hasNextPage
    },
    setUser(state, user) {
      state.user = user
    },
  },

  actions: {
    async loadUsers({ commit }, page) {
      const users = await axios.post('/users/noRoleUsers', { page })

      const {
        data: {
          errors,
          hasNextPage,
          users: usersList,
        },
      } = users

      if (usersList) {
        commit('setHasNextPage', hasNextPage)
        commit('setUsersList', usersList)

        return Promise.resolve()
      }

      return Promise.reject(errors)
    },
  },
}
