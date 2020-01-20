<template>
  <div>
    <div class="list">
      <app-topic
        v-for="(lesson, i) in lessons"
        v-bind:key="i"
        :lesson="lesson"
        @edit="openEditModal"
      ></app-topic>
    </div>

    <app-edit-lesson
      :lesson="editingLesson"
      :show="showEdit"
      @close="editingLesson = {}; showEdit = false"
      @done="updateLesson"
    ></app-edit-lesson>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppEditLesson from './AppEditLesson.vue'
import AppTopic from './AppTopic.vue'

export default {
  name: 'AppTopicsList.vue',
  computed: {
    ...mapGetters({
      lessons: 'lessons/lessons',
    }),
  },
  components: {
    AppTopic,
    AppEditLesson,
  },
  data() {
    return {
      showEdit: false,
      editingLesson: {},
    }
  },
  methods: {
    ...mapActions({
      fetchLessons: 'lessons/getAll',
    }),
    openEditModal(lesson) {
      this.showEdit = true
      this.editingLesson = lesson
    },
    updateLesson() {
      this.showEdit = false
      this.editingLesson = {}

      const {
        $route: { params },
        fetchLessons,
      } = this

      fetchLessons(params.classID).then(() => {
        this.loaded = true
      })
    },
  },
}
</script>

<style lang="less" scoped>
.list {
  padding: 20px;
  border-radius: 8px;
  background: var(--color-bg-dark);
  color: #fff;
}
</style>
