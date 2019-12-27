import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    list: [],
    scoringSystem: {},
  },

  getters: {
    list: state => state.list,
    scoringSystem: state => state.subject,
  },

  mutations: {
    setItems(state, list) {
      state.list = list
    },
    setItem(state, subjectType) {
      state.subjectType = subjectType
    },
  },

  actions: {
    async load({ commit }) {
      const { data: { scoringSystems, errors } } = await axios.post('/scoringSystems/getAll')

      if (errors) {
        return Promise.reject(errors)
      }

      commit('setItems', scoringSystems)

      return Promise.resolve()
    },
    async edit(_, scoringSystemData) {
      const { data: { errors } } = await axios.post('/scoringSystems/editScoringSystem', scoringSystemData)

      if (errors) {
        return Promise.reject(errors)
      }

      return Promise.resolve()
    },
    async create(_, scoringSystemData) {
      const { data: { errors } } = await axios.post('/scoringSystems/createScoringSystem', scoringSystemData)

      if (errors) {
        return Promise.reject(errors)
      }

      return Promise.resolve()
    },
  },
}
