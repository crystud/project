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
        } = await axios.post('/groups/getAll', { specialtyID })

        console.log(errors, groups)

        if (!errors && groups) {
          commit('setGroupsList', groups)

          return Promise.resolve()
        }

        commit('setGroupsList', [])

        return Promise.reject()
      } catch (e) {
        return Promise.reject(e)
      }
    },
    setNoGroups({ commit }) {
      commit('setGroupsList', [])
    },
  },
}
