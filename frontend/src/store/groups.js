import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    list: [],
    group: {
      entry: '',
      graduation: '',
      name: '',
      specialtyID: 0,
      number: 0,
      students: [],
      specialty: {},
      schedule: {
        list: [],
      },
    },
  },

  getters: {
    list: state => state.list,
    group: state => state.group,
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
    async get({ commit }, groupID) {
      try {
        const {
          data: {
            group,
            errors,
          },
        } = await axios.post('/groups/get', { groupID })

        console.log(errors, group)

        if (!errors && group) {
          commit('setGroup', group)

          return Promise.resolve()
        }

        commit('setGroup', {})

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
