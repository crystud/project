import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    list: [],
    group: {},
  },

  getters: {
    list: state => state.list,
  },

  mutations: {
    setGroupsList(state, groups) {
      state.list = groups
    },
    setGroup(state, group) {
      state.group = group
    },
  },

  actions: {
    async loadGroups({ commit }, specialtyID) {
      try {
        const {
          data: {
            groups,
            errors,
          },
        } = await axios.post('/group/getAll', { specialtyID })

        console.log(errors, groups)

        if (!errors && groups) {
          commit('setGroupsList', groups)

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
