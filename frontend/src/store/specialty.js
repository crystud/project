import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    specialtys: [],
    specialty: {},
  },

  getters: {
    specialtys: state => state.specialtys,
    specialty: state => state.specialty,
  },

  mutations: {
    setSpecialtys(state, specialtys) {
      state.specialtys = specialtys
    },
    setSpecialty(state, specialty) {
      state.specialty = specialty
    },
  },

  actions: {
    async create(_, data) {
      const { data: { errors, created } } = await axios.post('/specialty/create', data)

      if (!errors && created) {
        return Promise.resolve()
      }

      return Promise.reject(errors)
    },
    async loadSpecialtys({ commit }, departmentID) {
      axios.post('/specialty/getAll', { departmentID }).then(({ data: { errors, specialtys } }) => {
        if (errors) {
          return Promise.reject(errors)
        }

        commit('setSpecialtys', specialtys)

        return Promise.resolve()
      }).catch(() => {})
    },
    async edit(_, data) {
      axios.post('/specialty/edit', data).then(({ data: { updated, errors } }) => {
        if (updated && !errors) {
          return Promise.resolve()
        }

        return Promise.reject(errors)
      })
    },
  },
}
