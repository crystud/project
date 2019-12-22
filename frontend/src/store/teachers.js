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
      axios.post('/teacher/getAll').then(({ data: { teacher, errors } }) => {
        if (errors) {
          return Promise.reject(errors)
        }

        commit('setTeachers', teacher)

        return Promise.resolve()
      }).catch(() => {})
    },
    async loadTeacher({ commit }, teacherID) {
      axios.post('/teachers/get', {
        teacherID,
      }).then(({ data: { teacher, errors } }) => {
        if (errors) {
          return Promise.reject(errors)
        }

        commit('setDepartment', teacher)

        return Promise.resolve()
      })
    },
    async create(_, teacherData) {
      try {
        const {
          data: {
            created,
            errors,
          },
        } = await axios.post('/teacher/create', teacherData)

        console.log(errors, created)

        if (created && !errors) {
          return Promise.resolve()
        }

        return Promise.reject()
      } catch (e) {
        console.error(e)

        return Promise.reject(e)
      }
    },
  },
}
