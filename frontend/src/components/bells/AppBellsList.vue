<template>
  <div class="section">
    <div class="header">
      <div class="title">{{title}}</div>

      <div
        class="create"
        @click="isCreatingTimetable = true"
      >
        <font-awesome-icon
          icon="plus"
          class="icon"
        ></font-awesome-icon>
      </div>
    </div>

    <div class="list">
      <div class="hours">
        <span
          v-for="time in hoursList"
          v-bind:key="time"
        >{{time}}</span>
      </div>

      <div class="values">
        <div
          v-for="bell in bells"
          v-bind:key="bell.id"
          class="value"
          :style="calculateClassPosition({
            start: bell.start,
            finish: bell.finish,
          })"
          @click="openEditTimetable(bell)"
        >
          <div class="time">{{bell.start}}-{{bell.finish}}</div>
          <div class="duration">
            {{
              calculateClassDuration({
                start: bell.start,
                finish: bell.finish,
              })
            }}
          </div>
        </div>
      </div>
    </div>

    <app-create-timetable
      :show="isCreatingTimetable"
      @cancel="isCreatingTimetable = false"
      :type="type"
    ></app-create-timetable>

    <app-edit-timetable
      :show="editing.isEditing"
      :timetable="editing.timetable"
      @cancel="
        editing.isEditing = false
        editing.timetable = {}
      "
    ></app-edit-timetable>
  </div>
</template>

<script>
import AppEditTimetable from './AppEditTimetable.vue'
import AppCreateTimetable from './AppCreateTimetable.vue'

export default {
  name: 'AppBellsList.vue',
  components: {
    AppEditTimetable,
    AppCreateTimetable,
  },
  data() {
    return {
      editing: {
        isEditing: false,
        timetable: {},
      },
      isCreatingTimetable: false,
    }
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    bells: {
      type: Array,
      required: true,
      default: () => [],
    },
    hoursList: {
      type: Array,
      required: true,
      default: () => [],
    },
    type: {
      type: String,
      required: true,
      default: () => null,
    },
  },
  methods: {
    getTime({ start, finish }) {
      const [startHours, startMinutes, startSeconds] = start.split(':')
      const [finishHours, finishMinutes, finishSeconds] = finish.split(':')

      const startTime = (startHours * 60 * 60) + (startMinutes * 60) + (+startSeconds)
      const finishTime = (finishHours * 60 * 60) + (finishMinutes * 60) + (+finishSeconds)

      return [startTime, finishTime]
    },
    calculateClassDuration({ start, finish }) {
      const [startTime, finishTime] = this.getTime({ start, finish })

      const classDuration = (finishTime - startTime)

      const hours = Math.floor(classDuration / 3600)
      const minutes = (classDuration / 60) % 60

      return `${hours}:${minutes}`
    },
    calculateClassPosition({ start, finish }) {
      const [startTime, finishTime] = this.getTime({ start, finish })

      const { hoursList } = this

      const [listStartHours] = hoursList[0].split(':')
      const [listFinishHours] = hoursList[hoursList.length - 1].split(':')

      const listStartTime = +listStartHours
      const listFinishTime = +listFinishHours

      const aTime = (listFinishTime - (listStartTime - 1)) * 60
      const sTime = listStartTime

      const pm = x => (x / aTime) * 100

      const dTime = pm((finishTime / 60) - (startTime / 60))
      const bTime = pm(((startTime / 60) - (sTime) * 60))

      return `width: ${dTime}%; left: ${bTime}%`
    },
    openEditTimetable(timetable) {
      this.editing = {
        isEditing: true,
        timetable,
      }
    },
  },
}
</script>

<style lang="less" scoped>
.section {
  background: var(--color-bg-dark);
  border-radius: 8px;
  padding: 10px 20px;
  margin-top: 20px;

  .header {
    display: flex;
    justify-content: space-between;

    .title {
      font-size: 1.48em;
      color: #55636e;
    }

    .create {
      background: transparent;
      color: var(--color-font-dark);
      cursor: pointer;

      width: 40px;
      height: 40px;

      border-radius: 50%;
      font-size: 1.3em;

      display: flex;

      transform: scale(1);
      transition: all .15s;

      &:hover {
        background: #0c0f10;
        transform: scale(1.1);
      }

      .icon {
        margin: auto;
      }
    }
  }

  .list {
    margin: 20px 0;

    .hours {
      display: flex;
      justify-content: space-between;
      color: #55636e;
      font-size: 1.1em;

      margin: 0 20px 10px;
    }

    .values {
      background: #2c3339;
      border-radius: 8px;
      padding: 10px 20px;
      position: relative;
      height: 150px;

      .value {
        width: 100px;
        height: 100%;

        padding: 10px;
        background: #23b9aa;
        border-radius: 8px;

        position: absolute;
        top: 0;

        cursor: pointer;

        transition: all .3s;

        .time {
          color: #fff;
          font-size: 1.3em;
        }

        .duration {
          color: #5d6265;

          position: absolute;
          bottom: 10px;
          right: 10px;
        }
      }
    }
  }
}
</style>
