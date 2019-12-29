export default {
  namespaced: true,

  state: {
    isEditing: false,
    isCreating: false,
    editingItem: {},
  },

  getters: {
    editing: state => state.editingItem,
    isEditing: state => state.isEditing,
  },

  mutations: {
    setEditingSchedule(state, schedule) {
      state.editingItem = schedule
      state.isEditing = true
    },
    setNoEditing(state) {
      state.isEditing = false
    },
  },

  actions: {
    setEditingItem({ commit }, schedule) {
      commit('setEditingSchedule', schedule)
    },
    setNoEditing({ commit }) {
      commit('setNoEditing')
    },
  },
}
