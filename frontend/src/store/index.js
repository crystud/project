import Vue from 'vue'
import Vuex from 'vuex'

import authorization from './authorization'
import profile from './profile'
import student from './student'
import departments from './departments'
import teachers from './teachers'
import specialty from './specialty'
import users from './users'
import commissions from './commissions'
import group from './groups'
import subjects from './subjects'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authorization,
    profile,
    student,
    departments,
    teachers,
    specialty,
    users,
    commissions,
    group,
    subjects,
  },
})
