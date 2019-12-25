import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    isStudent: false,
    studentID: null,
    groupID: null,
    statistics: {
      week: null,
      mount: null,
    },
  },

  getters: {
    studentID: state => state.studentID,
    monthStatistics: state => state.statistics.mount,
  },

  mutations: {
    setIsStudent(state, isStudent) {
      state.isStudent = isStudent
    },
    setStudentID(state, studentID) {
      state.studentID = studentID
    },
    setGroupID(state, groupID) {
      state.groupID = groupID
    },
    setWeekStatistics(state, weekStatistics) {
      state.statistics.week = weekStatistics
    },
    setMonthStatistics(state, mountStatistics) {
      state.statistics.mount = mountStatistics
    },
  },

  actions: {
    async loadStatistics({ commit, state }) {
      axios.post('/student/statistics/month', {
        studentID: state.studentID,
      }).then(({ data: { stats } }) => {
        commit('setMonthStatistics', stats)
      }).catch(() => {})
    },
    async createStudent(_, studentData) {
      const {
        data: {
          errors,
          created,
        },
      } = await axios.post('/student/create', studentData)

      console.log(errors, created)

      if (!errors && created) {
        return Promise.resolve()
      }

      return Promise.reject(errors)
    },
  },
}
