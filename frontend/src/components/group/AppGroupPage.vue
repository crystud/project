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
          <span class="edit-title">Редагування групи</span>

          <app-input
            name="Номер групи"
            type="number"
            class="form-input"
          ></app-input>

          <app-datepicker
            placeholder="Дата початку навчання"
            class="form-input"
          ></app-datepicker>

          <app-datepicker
            placeholder="Дата закінчення навчання"
            class="form-input"
            defaultTime="2016-12-12"
          ></app-datepicker>

          <app-select
            class="form-input"
            placeholder="Спеціальність"
            :options="[{ test: 1 }, { test: 2 }]"
            :option="({ test }) => ({ label: test, value: test })"></app-select>

          <div class="submit-btns">
            <button class="btn btn-cancel" @click="show = false">Скасувати</button>
            <button class="btn btn-change">Зберегти</button>
          </div>
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

import AppInput from '../AppInput.vue'
import AppDatepicker from '../AppDatepickerCustom.vue'
import AppSelect from '../AppSelect.vue'

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
    AppSelect,
    AppInput,
    AppDatepicker,
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
