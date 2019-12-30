import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    list: [],
  },

  getters: {
    list: state => state.list,
  },

  mutations: {
    setRooms(state, rooms) {
      state.list = rooms
    },
  },

  actions: {
    async create(_, hoursData) {
      const {
        data: {
          created,
          errors,
        },
      } = await axios.post('/hours/create', hoursData)

      if (errors || !created) {
        return Promise.reject(errors)
      }

      return Promise.resolve()
    },
    async fetch({ commit }) {
      try {
        const {
          data: {
            errors,
            rooms,
          },
        } = await axios.post('/rooms/getAll')

        console.log(errors, rooms)

        commit('setRooms', rooms)

        return Promise.resolve()
      } catch (e) {
        console.error(e)

        return Promise.reject()
      }
    },
  },
}
