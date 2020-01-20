import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    teachers: [],
    teacher: {
      name: '',
      user: {
        email: '',
      },
      commission: {
        name: '',
        id: 0,
      },
      department: {},
    },
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
    async loadAllTeachers({ commit }) {
      axios.post('/teacher/getAll').then(({ data: { teachers, errors } }) => {
        if (errors) {
          return Promise.reject(errors)
        }

        commit('setTeachers', teachers)

        return Promise.resolve()
      }).catch(() => {})
    },
    async loadTeachers({ commit }, commissionID) {
      axios.post('/teacher/getAllOnCommission', { commissionID }).then(({ data: { teachers, errors } }) => {
        if (errors) {
          return Promise.reject(errors)
        }

        commit('setTeachers', teachers)

        return Promise.resolve()
      }).catch(() => {})
    },
    async loadTeacher({ commit }, teacherID) {
      axios.post('/teacher/get', {
        id: teacherID,
      }).then(({ data: { teacher, errors } }) => {
        if (errors) {
          return Promise.reject(errors)
        }

        commit('setTeacher', teacher)

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

        if (created && !errors) {
          return Promise.resolve()
        }

        return Promise.reject()
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async edit(_, teacherData) {
      try {
        const {
          data: {
            errors,
          },
        } = await axios.post('/teacher/edit', teacherData)

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
