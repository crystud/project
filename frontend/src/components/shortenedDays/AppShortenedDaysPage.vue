<template>
  <div class="shortened-days">
    <app-card>Скорочені дні</app-card>

    <div class="sections">
      <app-shortened-days-list></app-shortened-days-list>

      <div>
        <app-datepicker
          :highlighthedDates="dates"
          @change="setDate"
        ></app-datepicker>

        <app-card class="form">
          <span class="label date">Дата: {{normalTime || 'Вкажіть дату'}}</span>
          <span class="label">Причина</span>

          <textarea
            class="reason"
            placeholder="Причина..."
            v-model="reason"
          ></textarea>

          <div class="btn-create">
            <app-button
              :isOkay="(!!isoTime && !!reason)"
              @click="createShortenedDay"
            >Добавити</app-button>
          </div>
        </app-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppCard from '../AppCard.vue'
import AppButton from '../AppButtonCustom.vue'
import AppDatepicker from '../AppDatepicker.vue'
import AppShortenedDaysList from './AppShortenedDaysList.vue'


export default {
  name: 'AppShortenedDaysPage',
  components: {
    AppCard,
    AppButton,
    AppDatepicker,
    AppShortenedDaysList,
  },
  computed: {
    ...mapGetters({
      dates: 'shortenedDays/dates',
    }),
  },
  data() {
    return {
      isoTime: '',
      normalTime: '',
      reason: '',
    }
  },
  methods: {
    ...mapActions({
      create: 'shortenedDays/create',
      load: 'shortenedDays/load',
    }),
    setDate({ iso, normalTime }) {
      this.isoTime = iso
      this.normalTime = normalTime
    },
    createShortenedDay() {
      const {
        isoTime: date,
        reason,
      } = this

      if (!date || !reason) {
        return
      }

      this.create({ date, reason }).then(() => {
        this.isoTime = ''
        this.normalTime = ''
        this.reason = ''

        this.load()
      }).catch(() => {})
    },
  },
}
</script>

<style lang="less" scoped>
.shortened-days {
  max-height: 100%;
  overflow: auto;

  .sections {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 20px;

    margin-top: 20px;
  }

  @media screen and (max-width: 1500px) {
    .sections {
      grid-template-columns: 1fr;
    }
  }

  .app-card {
    padding: 20px;
    color: #fff;
    border-radius: 6px;
  }

  .form {
    margin-top: 10px;
    padding: 30px 60px;

    .label {
      display: block;
      font-size: 1.1em;
      margin-bottom: 10px;
    }

    .date {
      color: #55636e;
    }

    .reason {
      width: 100%;
      height: 120px;
      resize: none;
      display: block;
      background: #1e2329;
      color: #fff;
      padding: 10px;
      border: 0;
      border-radius: 5px;
      font: 1.3rem 'Exo 2', 'Lato',
    }

    .btn-create {
      width: 100%;

      display: flex;
      justify-content: flex-end;

      margin-top: 20px;
    }
  }
}
</style>
