import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {},

  getters: {},

  mutations: {},

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
  },
}
