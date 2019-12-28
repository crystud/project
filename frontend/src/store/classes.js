import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {},

  getters: {},

  mutations: {},

  actions: {
    async create(_, createData) {
      try {
        const {
          data: {
            errors,
            created,
          },
        } = await axios.post('/class/create', createData)

        console.log(errors, created)

        if (errors) {
          return Promise.reject(errors)
        }

        return Promise.resolve()
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async edit(_, editData) {
      console.log(editData)

      try {
        const {
          data: {
            errors,
            edited,
          },
        } = await axios.post('/class/edit', editData)

        console.log(errors, edited)

        if (errors) {
          return Promise.reject(errors)
        }

        return Promise.resolve()
      } catch (e) {
        return Promise.reject(e)
      }
    },
  },
}
