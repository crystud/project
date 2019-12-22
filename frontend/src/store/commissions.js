import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    list: [],
    commission: {},
  },

  getters: {
    list: state => state.list,
    commission: state => state.commission,
  },

  mutations: {
    setList(state, list) {
      state.list = list
    },
    setCommission() {

    },
  },

  actions: {
    async loadCommissions({ commit }) {
      const {
        data: {
          errors,
          commissions,
        },
      } = await axios.post('/commissions/getAll')

      if (!errors && commissions) {
        commit('setList', commissions)

        return Promise.resolve()
      }

      return Promise.reject()
    },
  },
}
