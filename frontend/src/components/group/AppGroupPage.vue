<template>
  <div class="teacher">
    <app-card class="header">Група {{show}}</app-card>

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

    <app-modal-window :show="show" @close="show = false">
      <template v-slot:header>
        <div class="edit-group-header">
          <span class="group-name">П-42</span>
          <span class="group-students">16 студентів</span>
        </div>
      </template>

      <template v-slot:content>
        <div>
          <span class="group-edit">Редагування групи</span>
        </div>
      </template>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppCard from '../AppCard.vue'

import AppTeacherClassesInfo from './AppGroupClassesInfo.vue'
import AppTeacherPersonalInfo from './AppGroupInfo.vue'
import AppModalWindow from '../AppModalWindow.vue'

export default {
  name: 'AppTeacherPage',
  computed: {
    ...mapGetters({
      teacher: 'teachers/teacher',
    }),
  },
  methods: {
    ...mapActions({
      loadTeacher: 'teachers/loadTeacher',
    }),
  },
  data() {
    return {
      show: false,
    }
  },
  components: {
    AppCard,
    AppTeacherPersonalInfo,
    AppTeacherClassesInfo,
    AppModalWindow,
  },
  created() {
    // this.loadTeacher(this.$route.params.id).then(() => {
    //   console.log(this.teacher)
    // })
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

  .edit-group-header {
    display: flex;
    align-items: center;

    .group-name {
      font-size: 2em;
    }

    .group-students {
      margin-left: 25px;
      color: #55636d;
    }
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
