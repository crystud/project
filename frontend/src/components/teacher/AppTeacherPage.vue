<template>
  <div class="teacher">
    <app-card
      class="header"
      v-if="false"
    >Вчитель</app-card>

    <div class="sections">
      <app-teacher-personal-info
        :name="teacher.name"
        :commission="teacher.commission.name"
        :email="teacher.user.email"
        :department="teacher.department"
        @onEdit="show = true"
      ></app-teacher-personal-info>

      <app-teacher-classes-info></app-teacher-classes-info>
    </div>

    <app-edit-teacher
      :teacherName="teacher.name"
      :teacherCommission="teacher.commission.id"
      :teacherID="teacher.id || 0"
      :show="show"
      @cancel="show = false"
      @done="
        show = false
        loadTeacher($route.params.id)
      "
    ></app-edit-teacher>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppCard from '../AppCard.vue'

import AppTeacherClassesInfo from './AppTeacherClassesInfo.vue'
import AppTeacherPersonalInfo from './AppTeacherPersonalInfo.vue'

import AppEditTeacher from './AppEditTeacher.vue'

export default {
  name: 'AppTeacherPage',
  computed: {
    ...mapGetters({
      teacher: 'teachers/teacher',
    }),
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    ...mapActions({
      loadTeacher: 'teachers/loadTeacher',
    }),
  },
  components: {
    AppCard,
    AppTeacherPersonalInfo,
    AppTeacherClassesInfo,
    AppEditTeacher,
  },
  created() {
    const { loadTeacher, $route } = this

    loadTeacher($route.params.id)
  },
}
</script>

<style lang="less" scoped>
.teacher {
  max-height: 100%;
  overflow: auto;

  .header {
    color: #fff;
    padding: 10px;
  }

  .sections {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;

    .classes-info {
      background: var(--color-bg-dark);
      border-radius: 4px;
    }

    .classes-info {
      width: calc(100% - 300px);
    }
  }
}
</style>
