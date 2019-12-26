<template>
  <div class="teacher">
    <app-card class="header">Вчитель</app-card>

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
        <div class="edit-teacher-header">
          <span class="teacher-name">{{teacher.name}}</span>
        </div>
      </template>

      <template v-slot:content>
        <div>
          <span class="edit-title">Редагування вчителя {{teacherCommission}}</span>

          <app-input
            name="ПІБ вчителя"
            type="text"
            class="form-input"
            :value="teacher.name"
            @input="(val) => teacherName = val"
          ></app-input>

          <app-select
            class="form-input"
            placeholder="Комісія"
            :defaultValue="{ id: teacher.commissionID }"
            @change="(val) => teacherCommission = val"
            :options="commissions"
            :option="({ id, name }) => ({ label: name, value: id })"></app-select>

          <div class="submit-btns">
            <button class="btn btn-cancel" @click="show = false">Скасувати</button>
            <button class="btn btn-change" @click="editTeacher">Зберегти</button>
          </div>
        </div>
      </template>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppCard from '../AppCard.vue'

import AppTeacherClassesInfo from './AppTeacherClassesInfo.vue'
import AppTeacherPersonalInfo from './AppTeacherPersonalInfo.vue'
import AppModalWindow from '../AppModalWindow.vue'

import AppInput from '../AppInput.vue'
import AppSelect from '../AppSelect.vue'

export default {
  name: 'AppTeacherPage',
  computed: {
    ...mapGetters({
      teacher: 'teachers/teacher',
      commissions: 'commissions/list',
    }),
  },
  data() {
    return {
      show: false,
      teacherName: '',
      teacherCommission: 0,
    }
  },
  methods: {
    ...mapActions({
      loadTeacher: 'teachers/loadTeacher',
      edit: 'teachers/edit',
      loadCommissions: 'commissions/loadCommissions',
    }),
    editTeacher() {
      const {
        teacherName: name,
        teacherCommission: commissionID,
        teacher: {
          id,
        },
      } = this

      this.edit({
        name,
        commissionID,
        id,
      }).then(() => {
        this.loadTeacher(this.$route.params.id)

        this.show = false
      }).catch(console.error)
    },
  },
  components: {
    AppCard,
    AppTeacherPersonalInfo,
    AppTeacherClassesInfo,
    AppModalWindow,
    AppInput,
    AppSelect,
  },
  created() {
    Promise.all([
      this.loadTeacher(this.$route.params.id),
      this.loadCommissions(),
    ]).then(() => {
      this.teacherName = this.teacher.name
      this.teacherCommission = this.teacher.commissionID
    })
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

  .edit-teacher-header {
    .teacher-name {
      font-size: 1.6em;
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
