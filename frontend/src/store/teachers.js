import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    teachers: [],
    teacher: {},
  },

  getters: {
    teachers: state => state.teachers,
    teacher: state => state.teacher,
  },

  mutations: {
    setTeachers(state, teachers) {
      state.teachers = teachers
    },
    setTeacher(state, teacher) {
      state.teacher = teacher
    },
  },

  actions: {
    async loadTeachers({ commit }) {
      axios.post('/teacher/getAll').then(({ data: { teacher } }) => {
        commit('setTeachers', teacher)

        return Promise.resolve()
      }).catch(() => {})
    },
    async loadTeacher({ commit }, teacherID) {
      axios.post('/teachers/get', {
        teacherID,
      }).then(({ data: { teacher } }) => {
        commit('setDepartment', teacher)

        return Promise.resolve()
      })
    },
  },
}
