import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    student: {},
  },

  getters: {
    student: state => state.student,
  },

  mutations: {
    setStudent(state, student) {
      state.student = student
    },
  },

  actions: {
    async create(_, createData) {
      try {
        const {
          data: { errors },
        } = await axios.post('/class/create', createData)

        if (errors) {
          return Promise.reject(errors)
        }

        return Promise.resolve()
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async edit(_, editData) {
      try {
        const {
          data: {
            errors,
          },
        } = await axios.post('/class/edit', editData)

        if (errors) {
          return Promise.reject(errors)
        }

        return Promise.resolve()
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async loadStudent({ commit }, data) {
      const {
        data: {
          errors,
          marks,
          student,
          classData,
        },
      } = await axios.post('/class/student', data)

      if (!errors && marks) {
        commit('setStudent', {
          marks,
          student,
          classData,
        })

        return Promise.resolve()
      }

      commit('setStudent', {
        marks: [],
        student: {},
      })

      return Promise.reject()
    },
    async createMark(_, data) {
      const {
        data: { errors },
      } = await axios.post('/class/setMark', data)

      if (!errors) {
        return Promise.resolve()
      }

      return Promise.reject()
    },
  },
}
