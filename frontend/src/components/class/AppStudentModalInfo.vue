<template>
  <app-modal-window :show="show" :showClose="false">
    <div slot="header">
      <div class="student-info">
        <div class="info">
          <div class="name">Середній Олег Батькович</div>

          <div class="group">
            <span class="specialty">Інженерія програмного забезпечення</span>
            <span>П-42</span>
          </div>
        </div>
      </div>
    </div>

    <div slot="content">
      <div class="success-data">
        <div class="student-subject-data">
          <div class="data-item">
            Загальна к-сть оцінок: 9
          </div>

          <div class="data-item">
            Середній бал з предмету: 4.4
          </div>

          <div class="data-item">
            К-сть пропусків: 4
          </div>
        </div>

        <div class="chart">
          <div class="title">Успішність студента по предмету</div>

          <app-chart :height="200"></app-chart>
        </div>
      </div>

      <div class="mark-set">
        <div class="calendar">calendar</div>

        <div class="mark-field-wrap">
          <app-card>
            <app-mark-set
              :showName="false"
              :data="markData"
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
import AppModalWindow from '../AppModalWindow.vue'
import AppChart from '../AppChart.vue'
import AppCard from '../AppCard.vue'
import AppMarkSet from './AppMarkSet.vue'
import AppButton from '../AppButtonCustom.vue'

export default {
  name: 'AppStudentModalInfo.vue',
  components: {
    AppModalWindow,
    AppChart,
    AppCard,
    AppMarkSet,
    AppButton,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      markData: {
        mark: '',
        isMissing: false,
      },
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
  grid-template-columns: 3fr 2fr;

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
