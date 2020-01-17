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
    student: {},
    semesterStatistics: {
      marks: [],
      current: {},
      studentID: null,
    },
  },

  getters: {
    studentID: state => state.studentID,
    monthStatistics: state => state.statistics.mount,
    student: state => state.student,
    semesterStatistics: state => state.semesterStatistics,
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
    setStudent(state, student) {
      state.student = student
    },
    setSemesterStatistics(state, stats) {
      state.semesterStatistics = stats
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
    async loadSemesterStatistics({ commit }, { studentID, semesterID }) {
      if (!studentID || !semesterID) {
        return Promise.reject()
      }

      const {
        data: {
          errors,
          marks = [],
          current = {},
        },
      } = await axios.post('/student/semesterStatistics', { studentID, semesterID })

      commit('setSemesterStatistics', {
        marks,
        current,
        studentID,
      })

      if (!errors && marks) {
        return Promise.resolve()
      }

      return Promise.reject()
    },
    async createStudent(_, studentData) {
      const {
        data: {
          errors,
          created,
        },
      } = await axios.post('/student/create', studentData)

      if (!errors && created) {
        return Promise.resolve()
      }

      return Promise.reject(errors)
    },
    async getStudent({ commit }, studentID) {
      const {
        data: {
          errors,
          student,
        },
      } = await axios.post('/student/get', { studentID })

      console.log(errors, student)

      commit('setStudent', student || {})

      if (errors) {
        return Promise.reject()
      }

      return Promise.resolve()
    },
  },
}
