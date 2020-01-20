<template>
  <app-modal-window :show="isCreating" @close="setNoCreating">
    <div slot="header">Редагування елементу розкладу</div>
    <div slot="content" v-if="isCreating">
      <app-radio-choice
        :options="[
          { label: 'Проста пара', value: null },
          { label: 'Чисельник', value: 'numerator' },
          { label: 'Знаменник', value: 'denominator' },
        ]"
        @change="(val) => type = val"
        :defaultValue="null"
      ></app-radio-choice>

      <div class="creating-day">
        День: {{creatingDay}}
      </div>

      <app-select
        class="form-input"
        placeholder="Порядок"
        :options="timetables"
        :option="({ id, order, start, finish }) => ({
          value: id,
          label: `${order} / ${start}-${finish}`,
        })"
        @change="val => timetableID = val"
      ></app-select>

      <app-select
        class="form-input"
        placeholder="Пара"
        :options="classes"
        :option="({
          name,
          class: { id: value },
          class: classData,
        }) => ({
          value,
          label: `
            ${name} /
            ${classData.teacher.name}
            ${classData.subgroups ? `(${classData.subgroup.name})` : ''}`,
        })"
        @change="val => classID = val"
      ></app-select>

      <app-select
        class="form-input"
        placeholder="Аудиторія"
        :options="rooms"
        :option="({
          id: value,
          name,
          floor,
        }) => ({
          value,
          label: `${name} / ${floor} поверх`,
        })"
        @change="val => roomID = val"
      ></app-select>

      <div class="btns">
        <app-button
          :isOkay="false"
          class="btn"
          @click="setNoCreating"
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
import { mapGetters, mapActions } from 'vuex'

import AppModalWindow from '../AppModalWindow.vue'
import AppRadioChoice from '../AppRadioChoice.vue'
import AppSelect from '../AppSelect.vue'
import AppButton from '../AppButtonCustom.vue'

export default {
  name: 'AppScheduleEditing.vue',
  components: {
    AppModalWindow,
    AppRadioChoice,
    AppSelect,
    AppButton,
  },
  computed: {
    ...mapGetters({
      isCreating: 'schedule/isCreating',
      timetables: 'timetables/fulltime',
      classes: 'group/subjects',
      rooms: 'rooms/list',
      creatingDay: 'schedule/creatingDay',
    }),
  },
  data() {
    return {
      type: null,
      classID: 0,
      roomID: 0,
      timetableID: 0,
    }
  },
  methods: {
    ...mapActions({
      setNoCreating: 'schedule/setNoCreating',
      fetchTimetables: 'timetables/fetch',
      fetchClasses: 'group/loadGroupSubjects',
      fetchRooms: 'rooms/fetch',
      createSchedule: 'schedule/create',
    }),
    scheduleTypeToNumber(type) {
      if (!type) return 1

      switch (type) {
        case 'numerator':
          return 2
        case 'denominator':
          return 3
        default:
          return 1
      }
    },
    create() {
      const {
        type,
        timetableID,
        roomID,
        classID,
      } = this

      this.createSchedule({
        day: this.creatingDay,
        type: type || null,
        timetableID,
        roomID,
        classID,
      }).then(() => {
        this.setNoCreating()
        this.$emit('created')
      }).catch((e) => {
        console.error(e)
      })
    },
  },
  created() {
    this.fetchTimetables()
    this.fetchRooms()
  },
}
</script>

<style lang="less" scoped>
.form-input {
  margin-bottom: 10px;
}

.creating-day {
  margin: 20px 0;
  color: var(--color-font-dark);
}

.btns {
  margin-top: 25px;
  display: flex;
  justify-content: flex-end;

  .btn {
    margin-left: 10px;
  }
}
</style>
