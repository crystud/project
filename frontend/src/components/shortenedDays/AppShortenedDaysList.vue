<template>
  <app-card class="list">
    <div class="future-days">
      <div class="no-days" v-if="!futureDays.length">Покищо скорочених днів немає...</div>

      <div class="day" v-for="({ id, date, reason }, index) in futureDays" v-bind:key="index">
        <div class="date-label">
          {{normalizeTime(date)}}
        </div>

        <div class="block">
          <div class="reason">
            {{reason}}
          </div>

          <div class="edit">
            <font-awesome-icon
              icon="trash"
              class="action trash"
              @click="() => deleteShortenedDay(id)"></font-awesome-icon>
          </div>
        </div>
      </div>
    </div>

    <div class="past-days" v-if="pastDays.length">
      <div class="day" v-for="({ date, reason }, index) in pastDays" v-bind:key="index">
        <div class="date-label">
          {{normalizeTime(date)}}
        </div>

        <div class="block">
          <div class="reason">
            {{reason}}
          </div>
        </div>
      </div>
    </div>
  </app-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import store from '../../store'

import AppCard from '../AppCard.vue'

export default {
  name: 'AppShortenedDaysList',
  components: {
    AppCard,
  },
  computed: {
    ...mapGetters({
      list: 'shortenedDays/list',
    }),
  },
  data() {
    return {
      futureDays: [],
      pastDays: [],
    }
  },
  methods: {
    ...mapActions({
      loadShortenedDays: 'shortenedDays/load',
      deleteDay: 'shortenedDays/delete',
    }),
    normalizeTime(time) {
      const date = new Date(time)

      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    },
    deleteShortenedDay(id) {
      this.deleteDay(id).then(async () => {
        await this.loadShortenedDays()

        this.calculate()
      })
    },
    calculate() {
      const currentDate = new Date()

      this.futureDays = []
      this.pastDays = []

      this.list.forEach((item) => {
        if (new Date(item.date) > currentDate) {
          this.futureDays.push(item)
        } else {
          this.pastDays.push(item)
        }
      })
    },
  },
  created() {
    store.subscribeAction({
      after: (action) => {
        if (action.type === 'shortenedDays/load') {
          this.calculate()
        }
      },
    })

    this.loadShortenedDays().then(() => {
      this.calculate()
    })
  },
}
</script>

<style lang="less" scoped>
.list {
  .reason {
    width: 400px;
    overflow: auto;
  }

  .future-days {
    padding: 0 30px;

    .no-days {
      text-align: center;
      margin: 30px;
      font-size: 1.5em;
      color: #55636e;
    }

    .day {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;

      .date-label {
        font-size: 1.2em;
        margin-right: 40px;
        width: 100px;
      }

      .block {
        background: var(--color-bg-dark);
        border-left: 8px solid #00ff87;
        padding: 15px;
        border-radius: 7px;
        width: 400px;

        display: flex;
        justify-content: space-between;

        .edit {
          margin-left: 20px;
          display: flex;
          align-items: center;

          .action {
            margin-left: 15px;
            cursor: pointer;

            &.edit {
              color: #55636e;
            }

            &.trash {
              color: #df2c2c;
            }
          }
        }
      }
    }
  }

  .past-days {
    padding: 20px 30px 0;
    border-top: 1px solid #1e2329;

    .day {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;

      .date-label {
        font-size: 1.2em;
        margin-right: 40px;
        width: 100px;
      }

      .block {
        width: 400px;
        background: #1e2329;
        padding: 15px;
        border-radius: 7px;
      }
    }
  }
}
</style>
