<template>
  <div class="create">
    <app-datepicker
      @change="updateDate"
      :highlighthedDates="lessonDates"
    ></app-datepicker>

    <div class="date">Дата: {{date.normalTime}}</div>

    <div
      class="text-field topic-field"
      :class="!date.iso ? 'hidden-text-field' : ''"
    >
      <div class="title">Тема</div>

      <textarea
        class="field"
        placeholder="Тема..."
        v-model="topic"
        :disabled="!date.iso"
      ></textarea>
    </div>

    <div
      class="text-field homework-field"
      :class="!date.iso ? 'hidden-text-field' : ''"
    >
      <div class="title">Домашнє завдання</div>

      <textarea
        class="field"
        placeholder="Д/з..."
        v-model="homeWork"
        :disabled="!date.iso"
      ></textarea>
    </div>

    <div class="submit-btn">
      <app-button
        :isOkay="true"
        @click="createLesson"
        :disabled="!date.iso || !topic"
      >Створити тему</app-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppDatepicker from '../AppDatepicker.vue'
import AppButton from '../AppButtonCustom.vue'

export default {
  name: 'AppCreateTopic.vue',
  components: {
    AppDatepicker,
    AppButton,
  },
  computed: {
    ...mapGetters({
      lessons: 'lessons/lessons',
    }),
  },
  data() {
    return {
      homeWork: '',
      lessonDates: [],
      topic: '',
      date: {
        iso: '',
        normalTime: '',
      },
    }
  },
  watch: {
    lessons() {
      this.lessonDates = []

      this.lessons.forEach(({ date }) => {
        const time = new Date(date)

        const year = time.getFullYear()
        const month = time.getMonth() + 1
        const day = time.getDate()

        this.lessonDates.push(`${year}/${month}/${day}`)
      })
    },
  },
  methods: {
    ...mapActions({
      create: 'lessons/create',
      getAll: 'lessons/getAll',
    }),
    updateDate(date) {
      this.date = date
    },
    createLesson() {
      const {
        date: {
          iso: date,
        },
        topic,
        homeWork,
        $route: {
          params: {
            classID,
          },
        },
      } = this

      if (!date || !topic || !classID) {
        return
      }

      this.create({
        date,
        topic,
        home_work: homeWork,
        classID,
      }).then(() => {
        global.alert('added')

        this.homeWork = ''
        this.topic = ''

        this.getAll(classID)
      })
    },
  },
}
</script>

<style lang="less">
.create {
  background: var(--color-bg-dark);
  border-radius: 8px;
  color: #fff;
  padding: 10px;

  .datepicker {
    background: transparent;
    margin: 20px 70px;

    .header {
      color: #fff !important;
    }
  }

  .date {
    padding: 0 40px;
    margin-bottom: 15px;
    color: var(--color-font-dark);
  }

  .text-field {
    margin-bottom: 15px;
    padding: 0 40px;
    opacity: 1;
    transition: all .5s;

    &.homework-field {
      transition-delay: .15s;
    }

    &.hidden-text-field {
      opacity: .25;
    }

    .placeholder {
      margin-bottom: 5px;
    }

    .field {
      width: 100%;
      height: 150px;
      padding: 15px;
      margin-top: 10px;

      border: 0;
      background: #1E2329;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, .15);
      border-radius: 5px;
      color: var(--color-font-dark);

      font: 1em 'Exo 2', 'Lato';
      resize: none;
    }
  }

  .submit-btn {
    display: flex;
    justify-content: flex-end;
    padding: 0 40px 20px;
  }
}
</style>
