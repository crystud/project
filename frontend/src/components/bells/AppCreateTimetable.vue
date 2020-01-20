<template>
  <app-modal-window :show="show" @close="$emit('cancel')">
    <div slot="header">Створення дзвінка</div>

    <div slot="content">
      <app-custom-input
        type="number"
        name="Порядок"
        placeholder="Порядок"
        :isSuccess="!!order"
        @change="newOrder => order = newOrder"
        class="line-input"
      ></app-custom-input>

      <app-timepicker
        placeholder="Початок"
        @change="setStart"
      ></app-timepicker>

      <app-timepicker
        placeholder="Кінець"
        @change="setFinish"
      ></app-timepicker>

      <div class="btns">
        <app-button
          :isOkay="false"
          class="btn"
          @click="$emit('cancel')"
        >Скасувати</app-button>

        <app-button
          :isOkay="true"
          class="btn"
          @click="create"
        >Створити</app-button>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import { mapActions } from 'vuex'

import AppModalWindow from '../AppModalWindow.vue'
import AppCustomInput from '../AppCustomInput.vue'
import AppButton from '../AppButtonCustom.vue'
import AppTimepicker from '../AppTimepicker.vue'

export default {
  name: 'AppEditTimetable.vue',
  components: {
    AppModalWindow,
    AppTimepicker,
    AppCustomInput,
    AppButton,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    type: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      createTimetable: 'timetables/create',
      fetchTimetables: 'timetables/fetch',
    }),
    setStart({ hour, minute }) {
      this.start = {
        hour,
        minute,
      }
    },
    setFinish({ hour, minute }) {
      this.finish = {
        hour,
        minute,
      }
    },
    create() {
      const {
        start: {
          hour: startHour,
          minute: startMinute,
        },
        finish: {
          hour: finishHour,
          minute: finishMinute,
        },
        type,
        order,
      } = this

      const start = `${startHour}:${startMinute}:00`
      const finish = `${finishHour}:${finishMinute}:00`

      this.createTimetable({
        isFullTime: type === 'fulltime',
        order,
        start,
        finish,
      }).then(async () => {
        await this.fetchTimetables()

        this.order = ''
        this.start = {}
        this.finish = {}

        this.$emit('done')
      }).catch(() => {})
    },
  },
  data() {
    return {
      order: '',
      start: {},
      finish: {},
    }
  },
}
</script>

<style lang="less" scoped>
.btns {
  display: flex;
  justify-content: flex-end;

  .btn {
    margin-left: 10px;
  }
}
</style>
