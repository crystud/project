import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    lessons: [],
    class: {
      subject: {},
      teacher: {},
    },
    students: [],
  },

  getters: {
    lessons: state => state.lessons,
    class: state => state.class,
    students: state => state.students,
  },

  mutations: {
    setLessons(state, lessons) {
      state.lessons = lessons
    },
    setClass(state, classData) {
      state.class = classData
    },
    setStudents(state, students) {
      state.students = students
    },
  },

  actions: {
    async create(_, data) {
      const {
        data: {
          errors,
        },
      } = await axios.post('/lessons/create', data)

      if (!errors) {
        return Promise.resolve()
      }

      return Promise.reject()
    },
    async getAll({ commit }, classID) {
      try {
        const {
          data: {
            errors,
            lessons,
            classData,
            students,
          },
        } = await axios.post('/lessons/getAll', { classID })

        commit('setLessons', lessons || [])
        commit('setClass', classData || [])
        commit('setStudents', students || [])

        if (!errors) {
          return Promise.resolve()
        }

        return Promise.reject(errors)
      } catch (e) {
        return Promise.reject()
      }
    },
    async deleteLesson(_, data) {
      const {
        data: {
          errors,
        },
      } = await axios.post('/lessons/delete', data)

      if (!errors) {
        return Promise.resolve()
      }

      return Promise.reject()
    },
    async edit(_, data) {
      const {
        data: {
          errors,
        },
      } = await axios.post('/lessons/edit', data)

      if (!errors) {
        return Promise.resolve()
      }

      return Promise.reject()
    },
  },
}
