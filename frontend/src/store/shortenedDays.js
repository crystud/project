import axios from '../tools/axios'

export default {
  namespaced: true,

  state: {
    list: [],
    dates: [],
  },

  getters: {
    list: state => state.list,
    dates: state => state.dates,
  },

  mutations: {
    setDays(state, days) {
      state.list = days
    },
    setDates(state, dates) {
      state.dates = dates
    },
  },

  actions: {
    async load({ commit }) {
      try {
        const {
          data: {
            shortenedDays,
            errors,
          },
        } = await axios.post('/shortenedDays/getAll')

        if (!errors && shortenedDays) {
          const dates = []

          shortenedDays.forEach(({ date }) => {
            const time = new Date(date)

            dates.push(`${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}`)
          })

          commit('setDates', dates)
          commit('setDays', shortenedDays)

          return Promise.resolve()
        }


        commit('setDays', [])

        return Promise.reject()
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async delete(_, shortenedDayID) {
      try {
        const {
          data: {
            errors,
            deleted,
          },
        } = await axios.post('/shortenedDays/delete', { shortenedDayID })

        if (!errors && deleted) {
          return Promise.resolve()
        }

        return Promise.reject()
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async create(_, data) {
      try {
        const {
          data: {
            errors,
            created,
          },
        } = await axios.post('/shortenedDays/create', data)

        if (!errors && created) {
          return Promise.resolve()
        }

        return Promise.reject()
      } catch (e) {
        return Promise.reject(e)
      }
    },
    setNoDays({ commit }) {
      commit('setDays', [])
    },
  },
}
