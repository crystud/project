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
    addDepartment(state, department) {
      state.list.unshift(department)
    },
  },

  actions: {
    async createDepartment(_, data) {
      axios.post('/department/create', data).then(({ data: { errors, created } }) => {
        if (!errors && created) {
          return Promise.resolve()
        }

        return Promise.reject()
      })
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
  },
}
