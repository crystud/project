<template>
  <app-modal-window :show="show" @close="$emit('done')">
    <div slot="header">
      <span class="text">Виставлення оцінки</span>
    </div>

    <div slot="content" v-if="classData && classData.subject">
      <div class="label">Тема пари: {{lesson.topic}}</div>
      <div class="label">Студент: {{student.name}}</div>

      <div
        class="mark-setting"
        :class="isMissing ? 'transparent-mark-setting' : ''"
      >
        <div class="mark-input">
          <app-input
            type="number"
            name="Оцінка"
            :value="mark"
            @input="val => mark = val "
          ></app-input>
        </div>

        <div class="label scoring-system" v-if="classData.subject.subjectTypeData">
          Система оцінювання: {{classData.subject.subjectTypeData.scoring_system.name}}
        </div>
      </div>

      <div class="label error" v-if="!isGoodTime">
        Неможливо виставити оцінку або н/б на майбутній урок
      </div>

      <div class="missing">
        <app-checkbox
          :checked="isMissing"
          @change="(val) => isMissing = val"
        ></app-checkbox>

        <span class="checkbox-label">Відсутній (нб)</span>
      </div>

      <div class="btns">
        <app-button
          :isOkay="false"
          class="btn"
          @click="$emit('done')"
        >Скасувати</app-button>

        <app-button
          :isOkay="true"
          class="btn"
          @click="setMark"
        >Поставити оцінку</app-button>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppModalWindow from '../AppModalWindow.vue'
import AppInput from '../AppInput.vue'
import AppButton from '../AppButtonCustom.vue'
import AppCheckbox from '../AppCheckbox.vue'

export default {
  name: 'AppSetMarkModal.vue',
  computed: {
    ...mapGetters({
      classData: 'lessons/class',
    }),
  },
  components: {
    AppModalWindow,
    AppInput,
    AppButton,
    AppCheckbox,
  },
  data() {
    return {
      isMissing: false,
      isGoodTime: false,
      mark: '',
    }
  },
  props: {
    student: {
      type: Object,
      required: true,
      default: () => {},
    },
    lesson: {
      type: Object,
      required: true,
      default: () => {},
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    lesson() {
      const { lesson } = this

      const lessonDate = new Date(lesson.date)
      const currentDate = new Date()

      this.isGoodTime = lessonDate < currentDate
    },
  },
  methods: {
    ...mapActions({
      createMark: 'classes/createMark',
      getClassInfo: 'lessons/getAll',
    }),
    setMark() {
      const {
        isMissing: isMiss,
        mark,
        lesson: { id: lessonID },
        student: { id: studentID },
      } = this

      const data = {
        isMiss,
        lessonID,
        studentID,
      }

      if (!isMiss) {
        data.mark = mark
      }

      this.createMark(data).then(() => {
        const {
          $route: { params },
          getClassInfo,
        } = this

        getClassInfo(params.classID).then(() => {
          this.mark = ''
          this.isMissing = false

          this.$emit('done')
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.label {
  margin-bottom: 5px;
  color: var(--color-font-dark);

  &.error {
    color: var(--color-accent-red);
    margin: 20px 0;
    font-weight: bold;
  }
}

.scoring-system {
  margin-top: 5px;
}

.mark-input {
  margin-top: 20px;
}

.mark-setting {
  opacity: 1;
  transition: all .15s;

  &.transparent-mark-setting {
    opacity: .15;
  }
}

.missing {
  display: flex;
  align-items: center;
  margin-top: 10px;

  .checkbox-label {
    margin-left: 10px;
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;

  .btn {
    margin-left: 10px;
  }
}

.text {
  font-size: 1.2em;
}
</style>
