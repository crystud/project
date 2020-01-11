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
    async create(_, createData) {
      const {
        data: { errors },
      } = await axios.post('/timetable/create', createData)

      if (!errors) {
        return Promise.resolve()
      }

      return Promise.reject()
    },
    async edit(_, editData) {
      const {
        data: { errors },
      } = await axios.post('/timetable/edit', editData)

      if (!errors) {
        return Promise.resolve()
      }

      return Promise.reject()
    },
    async deleteTimetable(_, deleteData) {
      const {
        data: { errors },
      } = await axios.post('/timetable/delete', deleteData)

      if (!errors) {
        return Promise.resolve()
      }

      return Promise.reject()
    },
  },
}
