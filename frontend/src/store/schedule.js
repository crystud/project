import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    creatingDay: 0,
    isEditing: false,
    isCreating: false,
    editingItem: {},
  },

  getters: {
    editing: state => state.editingItem,
    isEditing: state => state.isEditing,
    isCreating: state => state.isCreating,
    creatingDay: state => state.creatingDay,
  },

  mutations: {
    setEditingSchedule(state, schedule) {
      state.editingItem = schedule
      state.isEditing = true
    },
    setNoEditing(state) {
      state.isEditing = false
      state.editingItem = {}
    },
    setNoCreating(state) {
      state.isCreating = false
      state.creatingDay = 0
    },
    setCreating(state, day) {
      state.isCreating = true
      state.creatingDay = day
    },
  },

  actions: {
    async edit(_, scheduleData) {
      try {
        const { data: { errors } } = await axios.post('/schedule/edit', scheduleData)

        if (!errors) {
          return Promise.resolve()
        }

        return Promise.reject()
      } catch (e) {
        return Promise.reject()
      }
    },
    async create(_, createData) {
      try {
        const { data: { errors } } = await axios.post('/schedule/create', createData)

        if (!errors) {
          return Promise.resolve()
        }

        return Promise.reject(errors)
      } catch (e) {
        return Promise.reject()
      }
    },
    async deleteSchedule(_, deleteData) {
      try {
        const { data: { errors } } = await axios.post('/schedule/delete', deleteData)

        if (!errors) {
          return Promise.resolve()
        }

        return Promise.reject(errors)
      } catch (e) {
        return Promise.reject()
      }
    },
    setEditingItem({ commit }, schedule) {
      commit('setEditingSchedule', schedule)
    },
    setNoEditing({ commit }) {
      commit('setNoEditing')
    },
    setNoCreating({ commit }) {
      commit('setNoCreating')
    },
    setCreating({ commit }, day) {
      commit('setCreating', day)
    },
  },
}
