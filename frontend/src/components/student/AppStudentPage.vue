<template>
  <div class="group">
    <div
      v-if="loaded"
      class="sections"
    >
      <app-student-personal-info
        :name="student.name || ''"
        :email="student.user ? student.user.email : ''"
        :specialty="student.group ? student.group.specialty.name : ''"
        :groupName="student.groupName"
        :groupID="student.group.id"
      ></app-student-personal-info>

      <app-student-classes-info
        :schedule="student.schedule ? student.schedule.list : []"
      ></app-student-classes-info>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppStudentClassesInfo from './AppStudentClassesInfo.vue'
import AppStudentPersonalInfo from './AppStudentInfo.vue'

export default {
  name: 'AppStudentPage.vue',
  computed: {
    ...mapGetters({
      student: 'student/student',
    }),
  },
  methods: {
    ...mapActions({
      getStudent: 'student/getStudent',
    }),
  },
  data() {
    return {
      show: false,
      loaded: false,
    }
  },
  components: {
    AppStudentClassesInfo,
    AppStudentPersonalInfo,
  },
  created() {
    const {
      getStudent,
      $route: { params },
    } = this

    getStudent(params.studentID)
      .then(() => {
        this.loaded = true
      })
      .catch(console.error)
  },
}
</script>

<style lang="less" scoped>
.group {
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

  .form-input {
    margin-bottom: 20px;
  }

  .edit-title {
    display: block;
    margin-bottom: 10px;
    color: var(--color-font-dark);
  }

  .submit-btns {
    display: flex;
    justify-content: flex-end;

    .btn {
      padding: 12px 25px;
      border-radius: 4px;
      border: 0;
      font-size: 1em;
      color: #fff;
      cursor: pointer;
      margin-left: 10px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);

      &.btn-change {
        background: #3242d5;
      }

      &.btn-cancel {
        background: #c72929;
      }
    }
  }

  .sections {
    margin-top: 10px;
    display: grid;
    grid-template-columns: 3fr 6fr;
    grid-gap: 20px;

    .classes-info {
      background: var(--color-bg-dark);
      border-radius: 4px;

      width: 100%;
    }

    .personal-info {
      width: 100%;
    }

    @media screen and (max-width: 1350px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
