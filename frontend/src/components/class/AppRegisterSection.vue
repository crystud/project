<template>
  <div class="section">
    <div class="info">
      <div>
        <div class="name">Назва предмету</div>
        <div class="teacher">Ім'я вчителя</div>
      </div>

      <div>
        230 годин / 106 годин залишилось
      </div>
    </div>

    <div class="dates-wrap">
      <div></div>

      <div class="dates" ref="dates">
        <div class="row">
          <div
            class="column"
            v-for="(_, index) in 15"
            v-bind:key="index"
          >
            <div
              class="date"
              :class="index === 5 ? 'selected' : ''"
            >
              {{index+1}}/12
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="register-body">
      <div class="students" ref="students">
        <div
          class="student"
          v-for="(_, i) in 15"
          v-bind:key="i"
          @click="showStudentInfo"
        >
          <div class="number">
            {{i+1}}
          </div>

          <div class="image"></div>

          <div class="data">
            <div class="name">Середній Олег Батькович</div>
            <div class="avg">Сер. бал: 4.34; пропуски: 1</div>
          </div>
        </div>
      </div>

      <div class="wrap" ref="register" v-on:scroll="registerScroll">
        <div class="marks">
          <div class="row student-marks" v-for="(_, i) in 15" v-bind:key="i">
            <div
              class="column lesson"
              v-for="(_, i) in 15"
              v-bind:key="i"
              @click="openContextWindow"
            >
              <div class="mark">4</div>
              <div class="missing">
                <font-awesome-icon
                  icon="times"
                  class="icon"
                ></font-awesome-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <app-context-window
      :contextWindow="contextWindow"
    ></app-context-window>

    <app-student-modal-info
      :show="studentModal.show"
      @close="studentModal.show = false"
    ></app-student-modal-info>
  </div>
</template>

<script>
import AppStudentModalInfo from './AppStudentModalInfo.vue'
import AppContextWindow from './AppContextWindow.vue'

export default {
  name: 'AppRegisterSection.vue',
  components: {
    AppContextWindow,
    AppStudentModalInfo,
  },
  data() {
    return {
      studentModal: {
        studentIndex: null,
        show: false,
      },
      contextWindow: {
        show: false,
        isMissing: false,
        position: {
          x: 0,
          y: 0,
        },
      },
    }
  },
  methods: {
    showStudentInfo() {
      this.studentModal.show = true
    },
    registerScroll({
      target: { scrollTop, scrollLeft } = {},
    }) {
      this.$refs.students.scrollTo(0, scrollTop)
      this.$refs.dates.scrollTo(scrollLeft, 0)

      this.contextWindow.show = false
    },
    openContextWindow(ev) {
      const { register } = this.$refs

      ev.path.forEach((item) => {
        try {
          const { className = '' } = item

          const classNames = className.split(' ')

          if (classNames.includes('column')) {
            const {
              offsetLeft,
              offsetTop,
              offsetWidth,
              offsetHeight,
            } = item

            const xPosition = offsetLeft - register.scrollLeft + (offsetWidth / 1.25)
            const yPosition = offsetTop - register.scrollTop + (offsetHeight / 1.25)

            this.contextWindow.position.x = xPosition
            this.contextWindow.position.y = yPosition

            this.contextWindow.show = true
          }

          return true
        } catch (e) {
          console.error(e)

          return false
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.section {
  ::-webkit-scrollbar {
    width: 14px;
  }

  ::-webkit-scrollbar-track {
    background: #2C3339;
    border-radius: 18px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgb(18, 21, 24);
    border-radius: 14px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-bg-dark);
  }

  .info {
    display: flex;
    justify-content: space-between;

    color: #fff;
    margin: 10px 0;

    .name {
      font-size: 1.1em;
    }

    .teacher {
      margin-top: 5px;
      color: var(--color-font-dark);
    }
  }

  .register-body, .dates-wrap {
    display: grid;
    grid-template-columns: 2fr 6fr;
    grid-gap: 10px;
  }

  .limited-height {
    max-height: calc(100vh - 240px);
  }

  .register-body {
    .students {
      overflow: hidden;
      background: var(--color-bg-dark);
      border-radius: 8px;
      padding: 15px 10px;
      .limited-height();

      .student {
        display: grid;
        grid-template-columns: 20px 60px 1fr;
        grid-column-gap: 15px;
        align-items: center;
        color: #fff;
        cursor: pointer;

        margin-bottom: 10px;

        .number {
          font-size: 1.1em;
          color: var(--color-font-dark);

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .image {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #111;
        }

        .data {
          font-size: .95em;

          .name {
            font-size: 1.15em;
            margin-bottom: 5px;
          }

          .avg, .missings {
            color: var(--color-font-dark);
          }
        }
      }
    }
  }

  .wrap {
    background: var(--color-bg-dark);
    border-radius: 8px;
  }

  .wrap, .dates {
    width: 100%;
    overflow: scroll;
    .limited-height();

    .column {
      display: flex;
      width: 150px;
      flex-shrink: 0;
      justify-content: center;
      align-items: center;
    }

    .row {
      display: flex;
      flex-direction: row;
      width: fit-content;
    }

    .student-marks {
      border-bottom: 1px solid #333;
    }

    .lesson {
      color: #fff;

      height: 70px;
      border-right: 1px solid #333;
      cursor: pointer;

      .mark {
        background: #464A87;
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 1.3em;
      }

      .missing {
        padding: 10px;

        .icon {
          font-size: 1.35em;
          color: #3B42A2;
        }
      }
    }
  }

  .dates {
    padding-bottom: 20px;
    overflow: hidden;

    .date {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      padding: 10px;
      width: 50px;
      height: 50px;
      border-radius: 50%;

      &.selected {
        background: #3B42A2;
      }
    }
  }
}
</style>
