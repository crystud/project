import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    subjects: [],
    subject: {},
  },

  getters: {
    subjects: state => state.subjects,
    subject: state => state.subject,
  },

  mutations: {
    setSubjects(state, subjects) {
      state.subjects = subjects
    },
    setSubject(state, subject) {
      state.subject = subject
    },
  },

  actions: {
    async load({ commit }) {
      axios.post('/subject/getAll').then(({ data: { subjects, errors } }) => {
        if (errors) {
          return Promise.reject(errors)
        }

        commit('setSubjects', subjects)

        return Promise.resolve()
      }).catch(() => {})
    },
    async create(_, subjectData) {
      try {
        const {
          data: {
            created,
            errors,
          },
        } = await axios.post('/subject/create', subjectData)

        if (created && !errors) {
          return Promise.resolve()
        }

        return Promise.reject()
      } catch (e) {
        console.error(e)

        return Promise.reject(e)
      }
    },
    async edit(_, subjectData) {
      try {
        const {
          data: { errors },
        } = await axios.post('/subject/edit', subjectData)

        if (!errors) {
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
