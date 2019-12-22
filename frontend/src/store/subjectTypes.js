import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    list: [],
    subjectType: {},
  },

  getters: {
    list: state => state.list,
    subject: state => state.subject,
  },

  mutations: {
    setSubjectTypes(state, list) {
      state.list = list
    },
    setSubjectType(state, subjectType) {
      state.subjectType = subjectType
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
  },
}
