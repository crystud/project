import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    fulltime: [],
    parttime: [],
  },

  getters: {
    fulltime: state => state.fulltime,
    parttime: state => state.parttime,
  },

  mutations: {
    setFullTime(state, fulltime) {
      state.fulltime = fulltime
    },
    setPartTime(state, parttime) {
      state.parttime = parttime
    },
  },

  actions: {
    async fetch({ commit }) {
      const {
        data: { fullTime, partTime },
      } = await axios.post('/timetable/getAll')

      commit('setFullTime', fullTime)
      commit('setPartTime', partTime)

      return Promise.resolve()
    },
  },
}
