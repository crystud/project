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
  },

  actions: {
    async create(_, commissionData) {
      try {
        const {
          data: { errors },
        } = await axios.post('/commissions/create', commissionData)

        if (!errors) {
          return Promise.resolve()
        }

        return Promise.reject()
      } catch (e) {
        return Promise.reject(e)
      }
    },
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
    async editCommission(_, commissionData) {
      try {
        const {
          data: { errors },
        } = await axios.post('/commissions/edit', commissionData)

        if (!errors) {
          return Promise.resolve()
        }

        return Promise.reject()
      } catch (e) {
        return Promise.reject(e)
      }
    },
  },
}
