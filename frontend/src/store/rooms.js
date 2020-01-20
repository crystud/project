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
    async create(_, roomData) {
      const {
        data: { errors },
      } = await axios.post('/rooms/create', roomData)

      if (errors) {
        return Promise.reject(errors)
      }

      return Promise.resolve()
    },
    async edit(_, roomData) {
      const {
        data: { errors },
      } = await axios.post('/rooms/edit', roomData)

      if (errors) {
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

        if (errors) {
          return Promise.reject(errors)
        }

        commit('setRooms', rooms)

        return Promise.resolve()
      } catch (e) {
        return Promise.reject()
      }
    },
  },
}
