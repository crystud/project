<template>
  <div class="classes-info">
    <div class="list-label">
      Успішність студентів %
    </div>

    <app-chart
      :height="300"
    ></app-chart>

    <div class="sections">
      <div class="schedule">
        <div class="list-label">Розклад занять на тиждень</div>

        <div class="week">
          <div
            class="day"
            v-for="({ classes }, index) in schedule"
            v-bind:key="index"
          >
            <div class="list-label title">{{weekDays[index]}}</div>

            <app-schedule-item
              v-for="(classData, i) in classes"
              v-bind:key="i"
              :classData="classData"
              :showGroup="false"
            ></app-schedule-item>
          </div>
        </div>
      </div>

      <div class="subjects">
        <div class="list-label">Предмети групи</div>

        <div class="list">
          <app-teacher-subject
            v-for="({ subject: { name, subjectTypeData }, }, i) in classesList"
            v-bind:key="i"
            :name="name"
            :coefficient="subjectTypeData.coefficient"
          ></app-teacher-subject>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppTeacherSubject from '@/components/teacher/AppTeacherSubject.vue'
import AppChart from '@/components/AppChart.vue'
import AppScheduleItem from '../schedule/AppScheduleItem.vue'

export default {
  name: 'AppTeacherClassesInfo',
  props: {
    schedule: {
      type: Array,
      required: true,
    },
    classesList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      weekDays: [
        'Понеділок',
        'Вівторок',
        'Середа',
        'Четвер',
        'П\'ятниця',
        'Субота',
        'Неділя',
      ],
    }
  },
  components: {
    AppTeacherSubject,
    AppScheduleItem,
    AppChart,
  },
}
</script>

<style lang="less" scoped>
.classes-info {
  .list-label {
    color: #576c80;
    padding: 10px;
    font-size: 1.25em;
  }

  .sections {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;

    margin-top: 10px;

    .schedule {
      padding: 0 10px;

      .week {
        .day {
          .title {
            text-align: center;
            font-size: 1.25em;
            color: #475868;
          }

          .no-padding {
            padding: 0 0 5px;
            margin: 0;
          }

          .options-label {
            padding: 5px 0 0;
            padding-left: 20px;
          }

          .option, .options-list {
            width: 100%;
            margin-right: 15px;
          }
        }
      }
    }

    .subjects {
      padding: 0 10px;
    }
  }
}
</style>
