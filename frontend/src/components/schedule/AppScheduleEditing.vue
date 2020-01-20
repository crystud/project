<template>
  <app-modal-window :show="isEditing" @close="setNoEditing">
    <div slot="header">Редагування елементу розкладу</div>
    <div slot="content" v-if="isEditing">
      <app-radio-choice
        :options="[
          { label: 'Проста пара', value: null },
          { label: 'Чисельник', value: 'numerator' },
          { label: 'Знаменник', value: 'denominator' },
        ]"
        :defaultValue="editing.type"
        @change="(val) => type = val"
      ></app-radio-choice>

      <app-select
        class="form-input"
        placeholder="Порядок"
        :options="timetables"
        :option="({ id, order, start, finish }) => ({
          value: id,
          label: `${order} / ${start}-${finish}`,
        })"
        :defaultValue="{ id: editing.timetableID }"
        @change="val => timetableID = val"
      ></app-select>

      <app-select
        class="form-input"
        placeholder="Пара"
        :defaultValue="{ class: { id: editing.classID } }"
        :options="classes"
        :option="({
          name,
          class: { id: value },
          class: classData,
        }) => ({
          value,
          label: `
            ${name} /
            ${classData.teacher ? classData.teacher.name : ''}
            ${classData.subgroups ? `(${classData.subgroup.name})` : ''}`,
        })"
        @change="val => classID = val"
      ></app-select>

      <app-select
        class="form-input"
        placeholder="Аудиторія"
        :defaultValue="{ id: editing.roomID }"
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
        <button
          class="delete-btn"
          @click="deleteSchedule(editing.id)"
        >Вилучити пару з розкладу</button>

        <div>
          <app-button
            :isOkay="false"
            class="btn"
            @click="setNoEditing()"
          >Скасувати</app-button>

          <app-button
            :isOkay="true"
            class="btn"
            @click="save"
          >Зберегти</app-button>
        </div>
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
  props: {
    groupID: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      editing: 'schedule/editing',
      isEditing: 'schedule/isEditing',
      timetables: 'timetables/fulltime',
      classes: 'group/subjects',
      rooms: 'rooms/list',
    }),
  },
  watch: {
    groupID() {
      this.fetchClasses(this.groupID)
    },
    editing() {
      if (this.editing) {
        const { editing } = this

        this.type = editing.type
        this.timetableID = editing.timetableID
        this.classID = editing.classID
        this.roomID = editing.roomID
      }
    },
  },
  data() {
    return {
      type: this.editing ? this.editing.type : 0,
      classID: this.editing ? this.editing.classID : 0,
      roomID: this.editing ? this.editing.roomID : 0,
      timetableID: this.editing ? this.editing.timetableID : 0,
    }
  },
  methods: {
    ...mapActions({
      setNoEditing: 'schedule/setNoEditing',
      editSchedule: 'schedule/edit',
      fetchTimetables: 'timetables/fetch',
      fetchClasses: 'group/loadGroupSubjects',
      fetchRooms: 'rooms/fetch',
      deleteScheduleAction: 'schedule/deleteSchedule',
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
    deleteSchedule(scheduleID) {
      this.deleteScheduleAction({ scheduleID }).then(() => {
        this.setNoEditing()
        this.$emit('edited')
      })
    },
    save() {
      const {
        type,
        timetableID,
        roomID,
        classID,
      } = this

      this.editSchedule({
        scheduleID: this.editing.id,
        day: this.editing.day,
        type: type || null,
        timetableID,
        roomID,
        classID,
      }).then(() => {
        this.setNoEditing()
        this.$emit('edited')
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

.btns {
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .delete-btn {
    color: #c72929;
    background: transparent;
    font-size: 1em;
    border: 0;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .btn {
    margin-left: 10px;
  }
}
</style>
