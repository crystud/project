<template>
  <app-modal-window :show="show" @close="$emit('close')">
    <div slot="header">
      <span class="title">
        Редагування уроку
      </span>
    </div>

    <div slot="content">
      <app-textarea
        placeholder="Тема"
        :value="topic"
        @change="newVal => topic = newVal"
      ></app-textarea>

      <app-textarea
        placeholder="Домашнє завдання"
        :value="homeWork"
        @change="newVal => homeWork = newVal"
      ></app-textarea>

      <div class="btns">
        <div
          class="remove"
          @click="deleteLesson"
        >
          <font-awesome-icon
            class="icon"
            icon="trash"
          ></font-awesome-icon>

          <span>Видалити урок</span>
        </div>

        <div>
          <app-button
            :isOkay="false"
            class="btn"
            @click="$emit('close')"
          >Скасувати</app-button>

          <app-button
            :isOkay="true"
            class="btn"
            @click="saveLesson"
          >Зберегти</app-button>
        </div>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import { mapActions } from 'vuex'

import AppModalWindow from '../AppModalWindow.vue'
import AppTextarea from '../AppTextarea.vue'
import AppButton from '../AppButtonCustom.vue'

export default {
  name: 'AppEditLesson.vue',
  components: {
    AppModalWindow,
    AppTextarea,
    AppButton,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    lesson: {
      type: Object,
      required: true,
    },
  },
  watch: {
    lesson() {
      const { lesson } = this

      this.topic = lesson.topic
      this.homeWork = lesson.home_work
    },
  },
  data() {
    return {
      topic: this.lesson.topic,
      homeWork: this.lesson.topic,
    }
  },
  methods: {
    ...mapActions({
      pushLessonToDelete: 'lessons/deleteLesson',
      editLesson: 'lessons/edit',
    }),
    deleteLesson() {
      const { id: lessonID } = this.lesson

      if (lessonID) {
        this.pushLessonToDelete({ lessonID }).then(() => {
          global.alert('done')

          this.$emit('done')
        })
      }
    },
    saveLesson() {
      const { topic, homeWork } = this

      const { id: lessonID } = this.lesson

      if (!topic || !lessonID) return

      this.editLesson({
        topic,
        homeWork,
        lessonID,
      }).then(() => {
        this.$emit('done')
      })
    },
  },
}
</script>

<style lang="less" scoped>
.btns {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .btn {
    margin-left: 10px;
  }

  .remove {
    color: #f44;
    cursor: pointer;
    user-select: none;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    .icon {
      margin-right: 10px;
    }
  }
}
</style>
