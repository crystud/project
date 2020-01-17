import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    list: [],
    subgroup: {},
  },

  getters: {
    list: state => state.list,
    subgroup: state => state.subgroup,
  },

  mutations: {
    setList(state, list) {
      state.list = list
    },
    setSubgroup(state, subgroup) {
      state.subgroup = subgroup
    },
  },

  actions: {
    async create(_, { name, groupID }) {
      const {
        data: { errors },
      } = await axios.post('/subgroups/create', { name, groupID })

      if (!errors) {
        return Promise.resolve()
      }

      return Promise.reject()
    },
    async edit(_, { name, subgroupID }) {
      const {
        data: { errors },
      } = await axios.post('/subgroups/edit', { name, subgroupID })

      if (!errors) {
        return Promise.resolve()
      }

      return Promise.reject()
    },
    async loadAll({ commit }, { groupID }) {
      const {
        data: {
          errors,
          subgroups,
        },
      } = await axios.post('/subgroups/getOnGroup', { groupID })

      commit('setList', subgroups || [])

      if (!errors) {
        return Promise.resolve()
      }

      return Promise.reject(errors)
    },
    async get({ commit }, data) {
      if (data === null) {
        commit('setSubgroup', {})

        return Promise.resolve()
      }

      const { subgroupID } = data

      const {
        data: {
          errors,
          subgroup,
        },
      } = await axios.post('/subgroups/get', { subgroupID })

      commit('setSubgroup', subgroup || {})

      if (!errors && subgroup) {
        return Promise.resolve()
      }

      return Promise.reject()
    },
    async insertStudent(_, { subgroupID, studentID }) {
      const {
        data: {
          errors,
        },
      } = await axios.post('/subgroups/addStudent', { subgroupID, studentID })

      if (!errors) {
        return Promise.resolve()
      }

      return Promise.reject(errors)
    },
    async removeStudent(_, { subgroupID, studentID }) {
      const {
        data: {
          errors,
        },
      } = await axios.post('/subgroups/removeStudent', { subgroupID, studentID })

      if (!errors) {
        return Promise.resolve()
      }

      return Promise.reject(errors)
    },
  },
}
