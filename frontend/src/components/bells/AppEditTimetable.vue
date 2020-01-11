<template>
  <app-modal-window
    class="edit"
    :show="show"
    @close="$emit('cancel')"
  >
    <div slot="header">Редагування дзвінка</div>

    <div slot="content">
      <app-input
        type="number"
        name="Порядок"
        :value="order"
        @input="newOrder => order = newOrder"
      ></app-input>

      <app-timepicker
        :default="start"
        placeholder="Початок"
        @change="setStart"
      ></app-timepicker>

      <app-timepicker
        :default="finish"
        placeholder="Кінець"
      ></app-timepicker>

      <div class="label">Тип: {{type === 'fulltime' ? 'Повні пари' : 'Скорочені пари' }}</div>

      <div class="btns">
        <div>
          <button
            class="delete-timetable"
            @click="deleteTimetable"
          >
            Видалити дзвінок
          </button>
        </div>

        <div>
          <app-button
            :isOkay="false"
            class="btn"
            @click="$emit('cancel')"
          >Скасувати</app-button>

          <app-button
            :isOkay="true"
            class="btn"
            @click="$emit('cancel')"
          >Зберегти</app-button>
        </div>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import { mapActions } from 'vuex'

import AppInput from '../AppInput.vue'
import AppButton from '../AppButtonCustom.vue'
import AppTimepicker from '../AppTimepicker.vue'
import AppModalWindow from '../AppModalWindow.vue'

export default {
  name: 'AppEditTimetable.vue',
  components: {
    AppModalWindow,
    AppTimepicker,
    AppInput,
    AppButton,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    timetable: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  methods: {
    ...mapActions({
      submitDeleteTimetable: 'timetables/deleteTimetable',
      fetchTimetables: 'timetables/fetch',
    }),
    setStart(data) {
      console.log(data)
    },
    deleteTimetable() {
      const { timetableID } = this

      this.submitDeleteTimetable({ timetableID }).then(async () => {
        await this.fetchTimetables()

        this.$emit('done')
      }).catch(() => {})
    },
  },
  watch: {
    timetable() {
      const {
        timetable: {
          order,
          start,
          finish,
          type,
          id,
        },
      } = this

      this.order = order
      this.start = start
      this.finish = finish
      this.type = type
      this.timetableID = id
    },
  },
  data() {
    return {
      order: '',
      start: '',
      finish: '',
      type: '',
      timetableID: null,
    }
  },
}
</script>

<style lang="less" scoped>
.edit {
  .label {
    margin: 10px 0 20px;
  }

  .btns {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .delete-timetable {
      color: #f55;
      background: transparent;
      border: 0;
      cursor: pointer;
      font-size: 0.9rem;

      &:hover {
        text-decoration: underline;
      }
    }

    .btn {
      margin-left: 10px;
    }
  }
}
</style>
