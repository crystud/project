import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    list: [],
    subjectType: {},
    editingItem: {},
  },

  getters: {
    list: state => state.list,
    subject: state => state.subject,
    editingItem: state => state.editingItem,
  },

  mutations: {
    setSubjectTypes(state, list) {
      state.list = list
    },
    setSubjectType(state, subjectType) {
      state.subjectType = subjectType
    },
    setEditingItem(state, value) {
      state.editingItem = value
    },
  },

  actions: {
    async load({ commit }) {
      axios.post('/subjectType/getAll').then(({ data: { subjectTypes, errors } }) => {
        if (errors) {
          return Promise.reject(errors)
        }

        commit('setSubjectTypes', subjectTypes)

        return Promise.resolve()
      }).catch(() => {})
    },
    async edit(_, updateData) {
      const {
        data: { errors },
      } = await axios.post('/subjectType/edit', updateData)

      if (errors) {
        return Promise.reject(errors)
      }

      return Promise.resolve()
    },
    async create(_, createData) {
      const {
        data: { errors },
      } = await axios.post('/subjectType/create', createData)

      if (errors) {
        return Promise.reject(errors)
      }

      return Promise.resolve()
    },
  },
}
