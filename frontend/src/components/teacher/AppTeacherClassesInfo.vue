<template>
  <div class="classes-info">
    <div v-if="false">
      <div class="list-label">
        Успішність студентів %
      </div>

      <app-chart
        :height="300"
      ></app-chart>
    </div>

    <div class="sections">
      <div class="schedule">
        <div class="list-label">Розклад занять на тиждень</div>

        <div
          class="week"
          v-if="teacher.schedule"
        >
          <div
            v-for="({ classes }, i) in teacherSchedule"
            v-bind:key="i"

            class="day"
          >
            <div class="list-label title">{{weekDays[i]}}</div>

            <div
              v-if="!classes.length"
              class="no-items"
            >
              В цей день пар немає
            </div>

            <app-schedule-item
              v-for="(classData, i) in classes"
              v-bind:key="i"

              :classData="classData"
              :showTeacher="false"
              class="schedule-item"
            ></app-schedule-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AppChart from '@/components/AppChart.vue'
import AppScheduleItem from '../schedule/AppScheduleItem.vue'

export default {
  name: 'AppTeacherClassesInfo',
  components: {
    AppScheduleItem,
    AppChart,
  },
  computed: {
    ...mapGetters({
      teacher: 'teachers/teacher',
    }),
  },
  watch: {
    teacher() {
      const { list: schedule } = this.teacher.schedule

      schedule.forEach((dayItem, i) => {
        const { classes, day } = dayItem

        classes.sort((a, b) => {
          console.log(a.order < b.order ? 1 : 0)

          return a.order > b.order ? 1 : -1
        })

        schedule[i] = {
          day,
          classes,
        }
      })

      this.teacherSchedule = schedule
    },
  },
  data() {
    return {
      teacherSchedule: [],
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
    margin-top: 10px;

    .schedule {
      padding: 0 10px;

      .schedule-item {
        margin-bottom: 10px;
      }

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

          .class {
            width: 100%;
            background: #1b2024;
            margin-bottom: 10px;
            color: #fff;
            border-radius: 5px;

            display: flex;
            align-items: top;

            .info {
              margin-left: 20px;
              font-size: 1.1em;

              width: 100%;

              display: flex;
              justify-content: space-between;
              align-items: center;

              .icon-block {
                margin-right: 20px;

                .icon {
                  color: #2d373f;
                  margin-right: 5px;
                }

                .text {
                  color: #6f7274;
                }
              }
            }

            .order {
              display: flex;
              align-items: center;
              font-size: 1.2em;
              padding: 10px 15px;
              width: 40px;

              background: #07cc70;
              border-radius: 5px;
            }
          }
        }
      }
    }

    .no-items {
      text-align: center;
      margin: 20px 0;
      font-size: 1.3em;
      color: #475868;
      font-weight: 300;
    }

    .subjects {
      padding: 0 10px;
    }
  }
}
</style>
