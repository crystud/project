import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    list: [],
    semester: {
      weeks: 0,
      specialtyID: 0,
      specialty: {},
      number: 0,
    },
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
      commit('setSemester', {
        weeks: 0,
        specialtyID: 0,
        specialty: {},
        number: 0,
      })
    },
    async loadSemesters({ commit }, specialtyID) {
      const { data: { semesters, errors } } = await axios.post('/semester/getAll', { specialtyID })

      if (errors) {
        return Promise.reject(errors)
      }

      commit('setSemesters', semesters)

      return Promise.resolve()
    },
    async loadSemester({ commit }, semesterID) {
      const { data: { semester, errors } } = await axios.post('/semester/get', { semesterID })

      if (errors) {
        return Promise.reject(errors)
      }

      commit('setSemester', semester)

      return Promise.resolve()
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
    async edit(_, editData) {
      try {
        const {
          data: { errors },
        } = await axios.post('/semester/edit', editData)

        console.log(errors)

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
