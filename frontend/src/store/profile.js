import jwtDecode from 'jwt-decode'

import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    userID: null,
    avatar: '',
    name: '',
    email: '',
    address: '',
    roles: [],
  },

  getters: {
    userID: state => state.userID,
    name: state => state.name,
    email: state => state.email,
    address: state => state.address,
    roles: state => state.roles,
  },

  mutations: {
    setUserID: (state, userID) => {
      state.userID = userID
    },
    setAvatar: (state, avatar) => {
      state.avatar = avatar
    },
    setName(state, name) {
      state.name = name
    },
    setEmail(state, email) {
      state.email = email
    },
    setRoles(state, roles) {
      state.roles = roles
    },
    setAddress(state, address) {
      state.address = address
    },
    setTeacher() {

    },
  },

  actions: {
    load({ commit, dispatch, rootGetters }) {
      axios.post('/profile/getInformation')
        .then(({
          data: {
            user: {
              id, email, name, address, ...roles
            },
          },
        }) => {
          const token = rootGetters['authorization/accessToken']
          const { roles: rolesList } = jwtDecode(token)

          commit('setRoles', rolesList)

          commit('setUserID', id)
          commit('setEmail', email)
          commit('setName', name)
          commit('setAddress', address)

          if (rolesList.includes('student')) {
            const { student } = roles

            commit('student/setIsStudent', true, { root: true })
            commit('student/setStudentID', student.id, { root: true })
            commit('student/setGroupID', student.groupID, { root: true })

            dispatch('student/loadStatistics', null, { root: true })
          }

          if (rolesList.includes('teacher')) {
            commit('setTeacher', roles.teacher)
          }

          return Promise.resolve()
        })
        .catch(() => {})
    },
  },
}
