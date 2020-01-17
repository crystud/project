<template>
  <div class="classes-info">
    <div
      v-if="
        semesterStatistics.marks.length
        && $route.params.studentID === semesterStatistics.studentID
      "
    >
      <div class="list-label">
        Успішність студента (у обраному семестрі)
      </div>

      <app-chart
        :height="300"
        :leftBarKeys="['75-100%', '50-75%', '25-50%', '0-25%']"
        :chartData="semesterStatistics.marks"
        :option="({ mark, isMiss, lesson: { class: classData } }) => {
          if (isMiss) return null

          const { subject: { subjectTypeData: { scoring_system } } } = classData

          return (mark / scoring_system.max) * 100
        }"
      ></app-chart>
    </div>

    <div class="semesters">
      <div class="title">Оберіть семестр для показу статистики:</div>

      <div class="list">
        <div
          v-for="semester in semesters"
          v-bind:key="semester.id"
          @click="setSemester(semester.id)"
          class="semester"
          :class="selectedSemester === semester.id ? 'selected' : ''"
        >
          {{semester.number}}
        </div>
      </div>
    </div>

    <div class="sections">
      <div class="schedule">
        <div class="list-label">Розклад занять на тиждень</div>

        <div class="week">
          <div
            class="day"
            v-for="({ classes }, index) in groupSchedule"
            v-bind:key="index"
          >
            <div class="list-label title">{{weekDays[index]}}</div>

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
              class="schedule-item"
            ></app-schedule-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppChart from '@/components/AppChart.vue'
import AppScheduleItem from '../schedule/AppScheduleItem.vue'

export default {
  name: 'AppTeacherClassesInfo.vue',
  props: {
    schedule: {
      type: Array,
      required: true,
    },
  },
  watch: {
    statistics() {
      const { statistics } = this

      let chartValues = []

      statistics.students.forEach(({ marks }) => {
        if (!marks) return

        chartValues = [...chartValues, ...marks]
      })

      chartValues.sort((a, b) => {
        const { lesson: { date: aDate } } = a
        const { lesson: { date: bDate } } = b

        return Date.parse(aDate) - Date.parse(bDate)
      })

      this.chartValues = chartValues
    },
    schedule() {
      this.renderSchedule()
    },
  },
  computed: {
    ...mapGetters({
      semesters: 'semesters/list',
      semesterStatistics: 'student/semesterStatistics',
      student: 'student/student',
    }),
  },
  methods: {
    ...mapActions({
      loadStatistics: 'student/loadSemesterStatistics',
      loadSemesters: 'semesters/loadSemesters',
    }),
    renderSchedule() {
      const { schedule } = this

      schedule.forEach((dayItem, i) => {
        const { classes, day } = dayItem

        classes.sort((a, b) => (a.order > b.order ? 1 : -1))

        schedule[i] = {
          day,
          classes,
        }
      })

      this.groupSchedule = schedule
    },
    async setSemester(semesterID) {
      const {
        $route: {
          params: { studentID },
        },
      } = this

      this.selectedSemester = semesterID

      await this.loadStatistics({ studentID, semesterID })
    },
  },
  data() {
    return {
      chartValues: [],
      weekDays: [
        'Понеділок',
        'Вівторок',
        'Середа',
        'Четвер',
        'П\'ятниця',
        'Субота',
        'Неділя',
      ],
      selectedSemester: null,
      groupSchedule: [],
    }
  },
  components: {
    AppScheduleItem,
    AppChart,
  },
  async created() {
    await this.loadSemesters(this.student.group.specialtyID)
    this.renderSchedule()
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

  .no-items {
    text-align: center;
    margin: 20px 0;
    font-size: 1.3em;
    color: #475868;
    font-weight: 300;
  }

  .semesters {
    padding: 10px;

    .title {
      font-size: 1.1em;
      color: #576c80;
    }

    .list {
      margin-top: 10px;

      .semester {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, .2);
        border-radius: 4px;
        color: #fff;

        text-align: center;
        line-height: 40px;
        margin-right: 10px;

        cursor: pointer;

        transition: all .15s;

        &:hover,
        &.selected {
          background: #F97135;
          box-shadow: 0px 0px 10px #F97135;
        }
      }
    }
  }

  .sections {
    margin-top: 10px;

    .schedule-item {
      margin-bottom: 10px;
    }

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
