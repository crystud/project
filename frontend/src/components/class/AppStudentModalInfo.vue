<template>
  <app-modal-window :show="show && !!data.student" :showClose="false">
    <div slot="header">
      <div class="student-info" v-if="data.student">
        <div class="info">
          <div class="name">{{data.student.name}}</div>
        </div>
      </div>
    </div>

    <div slot="content" v-if="data.marks">
      <div class="success-data">
        <div class="student-subject-data">
          <div class="data-item">
            Загальна к-сть оцінок: {{data.marks.length}}
          </div>

          <div class="data-item">
            Середній бал з предмету: {{avg}}
          </div>

          <div class="data-item">
            К-сть пропусків: {{missings}}
          </div>
        </div>

        <div class="chart" v-if="data.classData">
          <div class="title">Успішність студента по предмету</div>

          <app-chart
            :height="200"
            :chartData="data.marks"
            :option="
              ({ type, mark }) => (type !== 'miss' ?
                ((mark / data.classData.subject.subjectTypeData.scoring_system.max) * 100)
                : null)
            "
            :leftBarKeys="['0-25%', '25-50%', '50-75%', '75-100%'].reverse()"
          ></app-chart>
        </div>
      </div>

      <div class="mark-set" v-show="false">
        <div class="calendar">
          <app-calendar></app-calendar>
        </div>

        <div class="mark-field-wrap">
          <app-card>
            <app-mark-set
              :showName="false"
              :data="markData"
              :student="data.student"
            ></app-mark-set>
          </app-card>
        </div>
      </div>

      <div class="close-btn">
        <app-button
          :isOkay="false"
          @click="$emit('close')"
        >Закрити</app-button>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import { mapGetters } from 'vuex'

import AppModalWindow from '../AppModalWindow.vue'
import AppChart from '../AppChart.vue'
import AppCard from '../AppCard.vue'
import AppMarkSet from './AppMarkSet.vue'
import AppButton from '../AppButtonCustom.vue'
import AppCalendar from '../AppDatepicker.vue'

export default {
  name: 'AppStudentModalInfo.vue',
  components: {
    AppModalWindow,
    AppChart,
    AppCard,
    AppMarkSet,
    AppButton,
    AppCalendar,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      data: 'classes/student',
    }),
  },
  watch: {
    data() {
      const { marks } = this.data

      let marksValuesCount = 0
      let marksCount = 0
      let missingsCount = 0

      marks.forEach(({ mark, type }) => {
        if (type === 'mark') {
          marksValuesCount += mark
          marksCount += 1
        } else {
          missingsCount += 1
        }
      })

      this.avg = marksCount !== 0 ? (marksValuesCount / marksCount).toFixed(3) : '-'
      this.missings = missingsCount
    },
  },
  data() {
    return {
      markData: {
        mark: '',
        isMissing: false,
      },
      missings: 0,
      avg: 0,
    }
  },
}
</script>

<style lang="less" scoped>
.student-info {
  min-width: 800px;
  display: flex;
  justify-content: center;

  .info {
    .name {
      font-size: 2em;
      color: #fff;
    }

    .group {
      display: flex;
      justify-content: space-between;
      color: var(--color-font-dark);
      font-size: .9em;
      font-weight: 100;

      .specialty {
        margin-right: 20px;
      }
    }
  }
}

.success-data {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-gap: 20px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #0F1214;

  .student-subject-data {
    .data-item {
      margin-bottom: 20px;
      color: var(--color-font-dark);
    }
  }

  .chart {
    .title {
      color: var(--color-font-dark);
      font-size: 1.1em;
      margin-bottom: 15px;
    }
  }
}

.mark-set {
  display: grid;
  grid-template-columns: 500px 1fr;
  grid-gap: 20px;

  .app-card {
    background: #1E2329;
    padding: 30px;
  }
}

.close-btn {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;

  .btn {
    padding: 13px 35px;
    background: #A23B3B;
  }
}
</style>
