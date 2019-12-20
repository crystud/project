import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    list: [],
  },

  getters: {
    list: state => state.list,
  },

  mutations: {
    setDepartments(state, departments) {
      state.list = departments
    },
  },

  actions: {
    async loadDepartments({ commit }) {
      axios.post('/department/getAll').then(({ data: { departments } }) => {
        commit('setDepartments', departments)

        return Promise.resolve()
      }).catch(() => {})
    },
  },
}
