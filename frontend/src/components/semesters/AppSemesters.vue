<template>
  <div class="list">
    <div v-if="!specialtyID" class="specialty-not-selected">
      Оберіть спеціальність...
    </div>

    <div v-if="specialtyID">
      <div class="semesters-list-wrap border-bottom">
        <span class="label">Семестри:</span>

        <div class="semesters-list">
          <div
            class="semester"
            :class="semester.id === data.id ? 'selected' : ''"
            v-for="(data) in semesters"
            v-bind:key="data.id"
            @click="setSemester(data.id)"
          >{{data.number}}</div>

          <div
            class="semester"
            @click="showCreateSemester = true"
          >Додати семестр</div>
        </div>
      </div>

      <div v-if="semester.id && selectedSemester">
        <div class="weeks border-bottom">
          <div class="label">Кількість тижнів</div>

          <div class="value">
            <app-input
              name="Кількість тижнів"
              type="number"
              :value="semester.weeks"
            ></app-input>
          </div>
        </div>

        <div
          class="commission border-bottom"
          v-for="({ name, subjects, id }) in semester.commissions"
          v-bind:key="id"
        >
          <div class="label">{{name}}</div>

          <div class="subjects">
            <div
              class="subject"
              v-for="(subject) in subjects"
              v-bind:key="subject.id"
              @click="selected = subject.id"
            >
              <span class="name">{{subject.name}}</span>

              <span
                class="hours"
                v-if="subject.hours"
              >{{subject.hours.hours}}</span>

              <span
                class="hours"
                @click="createHours(subject)"
                v-if="!subject.hours"
              >
                <font-awesome-icon
                  icon="plus"
                ></font-awesome-icon>
              </span>
            </div>
          </div>
        </div>
      </div>

      <app-modal-window
        :show="showCreateHours"
        @close="cancelCreateHours"
      >
        <template slot="header">
          <div>
            Створення годин для "{{createHoursSubject.name}}"
          </div>
        </template>

        <template slot="content">
          <div>
            <app-input
              name="Години"
              type="number"
              v-model="hoursValue"
            ></app-input>

            <div class="btns">
              <app-button
                class="btn"
                :isOkay="false"
                @click="cancelCreateHours"
              >Скасувати</app-button>

              <app-button
                class="btn"
                :isOkay="true"
                @click="createHoursSubmit">Створити</app-button>
            </div>

          </div>
        </template>
      </app-modal-window>

      <app-modal-window
        :show="showCreateSemester"
        @close="showCreateSemester = false"
      >
        <template slot="header">
          <div>
            Створення семестру для "{{specialtyName}}"
          </div>
        </template>

        <template slot="content">
          <div>
            <app-input
              name="Номер"
              type="number"
              v-model="semesterNumber"
              class="form-input"
            ></app-input>

            <app-input
              name="К-сть тижнів"
              type="number"
              v-model="semesterWeeks"
              class="form-input"
            ></app-input>

            <div class="btns">
              <app-button
                class="btn"
                :isOkay="false"
                @click="showCreateSemester = false"
              >Скасувати</app-button>

              <app-button
                class="btn"
                :isOkay="true"
                @click="createSemester">Створити</app-button>
            </div>
          </div>
        </template>
      </app-modal-window>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppInput from '../AppInput.vue'
import AppModalWindow from '../AppModalWindow.vue'
import AppButton from '../AppButtonCustom.vue'

export default {
  name: 'AppSemesters',
  components: {
    AppInput,
    AppButton,
    AppModalWindow,
  },
  computed: {
    ...mapGetters({
      semester: 'semesters/semester',
    }),
  },
  data() {
    return {
      selectedSemester: 0,
      selected: 0,
      showCreateSemester: false,
      showCreateHours: false,
      createHoursSubject: {},
      hoursValue: '',
      semesterNumber: '',
      semesterWeeks: '',
    }
  },
  methods: {
    ...mapActions({
      loadSemester: 'semesters/loadSemester',
      createSemesterSubmit: 'semesters/create',
      createHoursAction: 'hours/create',
    }),
    createHours(subject) {
      this.createHoursSubject = subject
      this.showCreateHours = true
    },
    cancelCreateHours() {
      this.createHoursSubject = {}
      this.showCreateHours = false
    },
    createHoursSubmit() {
      const {
        hoursValue: hours,
        specialtyID,
        selectedSemester: semesterID,
        createHoursSubject: {
          id: subjectID,
        },
      } = this

      this.createHoursAction({
        hours,
        specialtyID,
        semesterID,
        subjectID,
      }).then(() => {
        this.loadSemester(semesterID)

        this.createHoursSubject = {}
        this.showCreateHours = false
      })
    },
    setSemester(semesterID) {
      this.loadSemester(semesterID)
      this.selectedSemester = semesterID
    },
    async createSemester() {
      const {
        semesterNumber: number,
        semesterWeeks: weeks,
        specialtyID,
      } = this

      await this.createSemesterSubmit({
        number,
        weeks,
        specialtyID,
      })

      this.showCreateSemester = false
      this.semesterWeeks = ''
      this.semesterNumber = ''
    },
  },
  props: {
    semesters: {
      type: Array,
      required: true,
      default: () => [],
    },
    specialtyID: {},
    specialtyName: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.semesters {
  .label {
    color: #55636E;
  }

  .specialty-not-selected {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 2em;
    color: #55636E;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;

    .btn {
      margin-left: 10px;
    }
  }

  .form-input {
    margin-bottom: 10px;
  }

  .semesters-list-wrap {
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 0 20px 20px;

    .semesters-list {
      display: flex;
      margin-left: 10px;

      .semester {
        padding: 8px 30px;
        background: #15191C;
        margin-right: 15px;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
        user-select: none;
        border: 1px solid transparent;

        transition: all .075s;

        &.selected {
          border-color: #B54040;
        }

        &.disabled {
          background: #2C3339;
          color: #55636E;
          cursor: default;
        }
      }
    }
  }

  .weeks {
    display: flex;
    align-items: center;
    padding: 20px;

    .value {
      margin-left: 10px;
    }
  }

  .commission {
    padding: 20px;

    .subjects {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;

      .subject {
        display: flex;
        align-items: center;

        margin: 0 20px 20px 0;
        padding: 5px 10px 5px 20px;
        background: #15191C;
        color: #fff;
        border-radius: 5px;

        cursor: pointer;
        user-select: none;

        border-left: 7px solid transparent;
        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);

        transition: all .3s;

        .hours {
          margin-left: 30px;
          background: #1E2329;
          padding: 10px 15px;
          border-radius: 5px;
        }

        &.selected {
          border-left-color: #B54040;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
        }
      }
    }
  }

  .border-bottom {
    border-bottom: 1px solid #15191C;
  }
}
</style>
