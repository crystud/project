import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    list: [],
    subgroups: [],
    groupSubjects: [],
    availableSubjects: [],
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
    subjects: state => state.groupSubjects,
    subgroups: state => state.subgroups,
    availableSubjects: state => state.availableSubjects,
  },

  mutations: {
    setGroupsList(state, groups) {
      state.list = groups
    },
    setGroup(state, group) {
      state.group = group
    },
    setGroupSubjects(state, subjects) {
      state.groupSubjects = subjects
    },
    setSubgroups(state, subgroups) {
      state.subgroups = subgroups
    },
    setGroupAvailableSubjects(state, subjects) {
      state.availableSubjects = subjects
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
    async loadSubgroups({ commit }, groupID) {
      try {
        const {
          data: {
            subgroups,
            errors,
          },
        } = await axios.post('/groups/getSubgroups', { groupID })

        if (!errors && subgroups) {
          commit('setSubgroups', subgroups)

          return Promise.resolve()
        }

        commit('setSubgroups', [])

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
    async create(_, createData) {
      try {
        const {
          data,
        } = await axios.post('/groups/create', createData)

        console.log(data)

        if (!data.errors) {
          return Promise.resolve()
        }

        return Promise.reject()
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async loadGroupSubjects({ commit }, groupID) {
      try {
        const {
          data: {
            subjects,
            errors,
          },
        } = await axios.post('/subject/getGroupSubjects', { groupID })

        if (!errors && subjects) {
          commit('setGroupSubjects', subjects)

          return Promise.resolve()
        }

        commit('setGroupSubjects', [])

        return Promise.reject()
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async loadGroupAvailableSubjects({ commit }, groupID) {
      try {
        const {
          data: {
            subjects,
            errors,
          },
        } = await axios.post('/subject/getGroupAvailableSubjects', { groupID })

        if (!errors && subjects) {
          commit('setGroupAvailableSubjects', subjects)

          return Promise.resolve()
        }

        commit('setGroupAvailableSubjects', [])

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
