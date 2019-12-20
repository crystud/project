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
    async loadDepartments({ commit }) {
      axios.post('/department/getAll').then(({ data: { departments } }) => {
        commit('setDepartments', departments)

        return Promise.resolve()
      }).catch(() => {})
    },
    async loadDepartment({ commit }, departmentID) {
      axios.post('/department/get', {
        departmentID,
      }).then(({ data: { department } }) => {
        console.log(department)

        commit('setDepartment', department)
      })
    },
  },
}
