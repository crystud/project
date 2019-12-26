import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    list: [],
    semester: {},
  },

  getters: {
    list: state => state.list,
    semester: state => state.semester,
  },

  mutations: {
    setSemesters(state, list) {
      state.list = list
    },
    setSemester(state, semester) {
      state.semester = semester
    },
  },

  actions: {
    setNoSemester({ commit }) {
      commit('setSemester', {})
    },
    async loadSemesters({ commit }, specialtyID) {
      axios.post('/semester/getAll', { specialtyID }).then(({ data: { semesters, errors } }) => {
        if (errors) {
          return Promise.reject(errors)
        }

        commit('setSemesters', semesters)

        return Promise.resolve()
      }).catch(() => {})
    },
    async loadSemester({ commit }, semesterID) {
      axios.post('/semester/get', { semesterID }).then(({ data: { semester, errors } }) => {
        if (errors) {
          return Promise.reject(errors)
        }

        commit('setSemester', semester)

        return Promise.resolve()
      }).catch(() => {})
    },
    async create({ dispatch }, semesterData) {
      try {
        const {
          data: {
            created,
            semester,
            errors,
          },
        } = await axios.post('/semester/create', semesterData)

        if (created && semester && !errors) {
          dispatch('loadSemesters', semesterData.specialtyID)

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
