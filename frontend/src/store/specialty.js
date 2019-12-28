import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    specialtys: [],
    specialtysList: [],
    specialty: {},
  },

  getters: {
    specialtys: state => state.specialtys,
    specialty: state => state.specialty,
    specialtysList: state => state.specialtysList,
  },

  mutations: {
    setSpecialtys(state, specialtys) {
      state.specialtys = specialtys
    },
    setSpecialty(state, specialty) {
      state.specialty = specialty
    },
    setSpecialtysList(state, specialtys) {
      state.specialtysList = specialtys
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
      }).catch(() => {
        commit('setSpecialtys', [])
      })
    },
    async listSpecialtys({ commit }) {
      const { data: { specialtys } } = await axios.post('/specialty/list')

      commit('setSpecialtysList', specialtys)
    },
    async edit(_, data) {
      const { data: { updated, errors } } = await axios.post('/specialty/edit', data)

      if (updated && !errors) {
        return Promise.resolve()
      }

      return Promise.reject(errors)
    },
    setNoSpecialtys({ commit }) {
      commit('setSpecialtys', [])
    },
  },
}
