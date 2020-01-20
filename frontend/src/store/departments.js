import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    list: [],
    department: {},
  },

  getters: {
    list: state => state.list,
    department: state => state.department,
  },

  mutations: {
    setDepartments(state, departments) {
      state.list = departments
    },
    setDepartment(state, department) {
      state.department = department
    },
  },

  actions: {
    async createDepartment(_, data) {
      const { data: { errors, created } } = await axios.post('/department/create', data)

      if (!errors && created) {
        return Promise.resolve()
      }

      return Promise.reject()
    },
    async loadDepartments({ commit }) {
      axios.post('/department/getAll').then(({ data: { departments } }) => {
        commit('setDepartments', departments)

        return Promise.resolve()
      }).catch(() => {})
    },
    async loadDepartment({ commit }, departmentID) {
      axios.post('/department/get', { departmentID }).then(({ data: { department } }) => {
        commit('setDepartment', department)

        return Promise.resolve()
      })
    },
    async edit(_, data) {
      const {
        data: {
          errors,
          updated,
        },
      } = await axios.post('/department/edit', data)

      if (!errors && updated) {
        return Promise.resolve()
      }

      return Promise.reject()
    },
  },
}
