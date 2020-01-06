<template>
  <div class="section">
    <div class="info">
      <div>
        <div class="name">{{classData.subject.name}}</div>
        <div class="teacher">{{classData.teacher.name}}</div>
      </div>

      <div>
        загально {{hours.totalLessons}} уроки /
        {{hours.totalLessons - hours.passedLessons}} залишилось
      </div>
    </div>

    <div class="dates-wrap">
      <div></div>

      <div class="dates" ref="dates">
        <div class="row">
          <div
            class="column"
            v-for="(lesson, index) in lessons"
            v-bind:key="index"
            :title="`
              Тема: ${lesson.topic}.
              д/з: ${lesson.home_work};
            `"
          >
            <div
              class="date"
              :class="index === 5 ? 'selected' : ''"
            >
              {{toTimeString(lesson.date)}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="register-body">
      <div class="students" ref="students">
        <div
          class="student"
          v-for="(data, i) in studentsList"
          v-bind:key="i"
          @click="showStudentInfo(data.id)"
        >
          <div class="number">
            {{i+1}}
          </div>

          <div class="image"></div>

          <div class="data">
            <div class="name">{{ data.name || data.student.name }}</div>
            <div class="avg" v-show="false">Сер. бал: 4.34; пропуски: 1</div>
          </div>
        </div>
      </div>

      <div class="wrap" ref="register" v-on:scroll="registerScroll">
        <div class="marks">
          <div
            class="row student-marks"
            v-for="(student, i) in studentsList"
            v-bind:key="i"
          >
            <div
              class="column lesson"
              v-for="(lesson, i) in lessons"
              v-bind:key="i"
              @click="openContextWindow(student, lessons[i])"
            >
              <span
                v-for="mark in student.marks"
                v-bind:key="mark.id"
              >
                <span v-if="lesson.id === mark.lessonID">
                  <div
                    class="mark"
                    v-if="mark.type === 'mark'"
                  >{{mark.mark}}</div>

                  <div
                    class="missing"
                    v-if="mark.type === 'miss'"
                  >
                    <font-awesome-icon
                      icon="times"
                      class="icon"
                    ></font-awesome-icon>
                  </div>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <app-student-modal-info
      :show="studentModal.show"
      @close="studentModal.show = false"
    ></app-student-modal-info>

    <app-set-mark-modal
      :student="setMarkModal.student"
      :lesson="setMarkModal.lesson"
      :show="setMarkModal.show"
      @done="closeSetMark"
    ></app-set-mark-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppStudentModalInfo from './AppStudentModalInfo.vue'
import AppSetMarkModal from './AppSetMarkModal.vue'

export default {
  name: 'AppRegisterSection.vue',
  components: {
    AppStudentModalInfo,
    AppSetMarkModal,
  },
  computed: {
    ...mapGetters({
      students: 'lessons/students',
      classData: 'lessons/class',
      lessons: 'lessons/lessons',
    }),
  },
  watch: {
    students() {
      this.studentsList = []

      this.students.forEach((data) => {
        const student = data.name ? data : data.student

        student.marksList = []

        this.lessons.forEach((lesson) => {
          const { id: lessonID } = lesson

          const localMarksList = []

          student.marks.forEach((mark) => {
            const { lessonID: markLessonID } = mark

            if (lessonID === markLessonID) {
              localMarksList.push(mark)
            }
          })

          student.marksList.push(localMarksList)
        })

        this.studentsList.push(student)
      })
    },
    lessons() {
      this.hours.totalLessons = this.lessons.length

      this.lessons.forEach(({ date }) => {
        const time = new Date(date)

        if (time < new Date()) {
          this.hours.passedLessons += 1
        }
      })
    },
  },
  data() {
    return {
      studentModal: {
        studentIndex: null,
        show: false,
      },
      hours: {
        totalLessons: 0,
        passedLessons: 0,
      },
      studentsList: [],
      setMarkModal: {
        student: {},
        lesson: {},
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
    ...mapActions({
      loadStudentData: 'classes/loadStudent',
    }),
    closeSetMark() {
      this.setMarkModal = {
        lesson: {},
        student: {},
        show: false,
      }
    },
    toTimeString(time) {
      const date = new Date(time)

      const day = date.getDate()
      const month = date.getMonth() + 1

      return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}`
    },
    showStudentInfo(studentID) {
      this.loadStudentData({
        studentID,
        classID: this.$route.params.classID,
      }).then(() => {
        this.studentModal.show = true
      })
    },
    registerScroll({
      target: { scrollTop, scrollLeft } = {},
    }) {
      this.$refs.students.scrollTo(0, scrollTop)
      this.$refs.dates.scrollTo(scrollLeft, 0)

      this.contextWindow.show = false
    },
    openContextWindow(student, lesson) {
      this.setMarkModal = {
        student,
        lesson,
        show: true,
      }
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
