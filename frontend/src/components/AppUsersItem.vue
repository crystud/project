<template>
  <div class="user">
    <div class="profile-image">
      <div class="image"></div>
    </div>

    <div class="info">
      <div v-if="isTeacherCreating">
        <app-custom-input
          type="text"
          placeholder="ПІБ вчителя"
          class="form-input-mg"
          :value="name"
          :isSuccess="!!teacherName"
          @change="(val) => teacherName = val"
        ></app-custom-input>

        <app-custom-input
          type="text"
          placeholder="Адреса вчителя"
          class="form-input-mg"
          :value="teacherAddress"
          :isSuccess="!!teacherAddress"
          @change="(val) => teacherAddress = val"
        ></app-custom-input>

        <app-select
          class="form-input"
          :options="commissions"
          :option="({ id, name }) => ({ label: name, value: id })"
          @change="(val) => teacherCommission = val"
          placeholder="Комісія"
        ></app-select>

        <button
          class="btn btn-cancel"
          @click="setNoCreating"
        >Скасувати</button>

        <button
          class="btn btn-teacher"
          @click="createTeacher"
        >Створити вчителя</button>
      </div>

      <div v-if="isStudentCreating">
        <app-custom-input
          type="text"
          placeholder="ПІБ студента"
          class="form-input-mg"
          :value="name"
          :isSuccess="!!studentName"
          @change="(val) => teacherName = val"
        ></app-custom-input>

        <app-custom-input
          type="text"
          placeholder="Адреса студента"
          class="form-input-mg"
          :value="address"
          :isSuccess="!!address"
          @change="(val) => studentAddress = val"
        ></app-custom-input>

        <app-select
          v-if="departments"
          class="form-input"
          :options="departments"
          :option="({ id, name }) => ({ label: name, value: id })"
          @change="loadSpecialtysList"
          placeholder="Відділення"
        ></app-select>

        <app-select
          class="form-input"
          v-if="specialtys.length"
          :options="specialtys"
          :option="({ id, name }) => ({ label: name, value: id })"
          @change="loadGroupsList"
          placeholder="Спеціальність"
        ></app-select>

        <app-select
          class="form-input"
          v-if="groups.length"
          :options="groups"
          :option="({ id, name }) => ({ label: name, value: id })"
          @change="(val) => studentGroupID = val"
          placeholder="Група"
        ></app-select>

        <button
          class="btn btn-cancel"
          @click="setNoCreating"
        >Скасувати</button>

        <button
          class="btn btn-student"
          @click="createStudent"
        >Створити студента</button>
      </div>

      <div v-if="!isCreating">
        <div class="name">{{name}}</div>
        <div class="email">{{email}}</div>
        <div class="address">{{address}}</div>

        <div class="accept-btns">
          <button class="btn btn-teacher" @click="switchTeacherCreating">Вчитель...</button>
          <button class="btn btn-student" @click="switchStudentCreating">Студент...</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppSelect from './AppSelect.vue'
import AppCustomInput from './AppCustomInput.vue'

export default {
  name: 'AppUsersItem',
  components: {
    AppSelect,
    AppCustomInput,
  },
  computed: {
    ...mapGetters({
      departments: 'departments/list',
      commissions: 'commissions/list',
      specialtys: 'specialty/specialtys',
      groups: 'group/list',
    }),
  },
  data() {
    return {
      isCreating: false,
      isTeacherCreating: false,
      isStudentCreating: false,
      teacherName: this.name,
      teacherCommission: 0,
      teacherAddress: this.address,
      studentName: this.name,
      studentAddress: this.address,
      studentGroupID: 0,
    }
  },
  methods: {
    ...mapActions({
      loadCommissions: 'commissions/loadCommissions',
      createTeacherAction: 'teachers/create',
      loadDepartments: 'departments/loadDepartments',
      loadSpecialtys: 'specialty/loadSpecialtys',
      loadGroups: 'group/loadGroups',
      setNoGroups: 'group/setNoGroups',
      setNoSpecialtys: 'specialty/setNoSpecialtys',
      createStudentAction: 'student/createStudent',
    }),
    setNoCreating() {
      this.isCreating = false
      this.isTeacherCreating = false
      this.isStudentCreating = false
    },
    loadGroupsList(specialtyID) {
      this.loadGroups(specialtyID).catch(() => {})
    },
    loadSpecialtysList(departmentID) {
      this.loadSpecialtys(departmentID).then(() => {
        this.setNoGroups()
      }).catch(() => {
        this.setNoSpecialtys()
      })
    },
    async switchTeacherCreating() {
      this.loadCommissions().then(() => {
        this.isCreating = true
        this.isTeacherCreating = true
      }).catch(() => {})
    },
    createStudent() {
      const {
        studentName: name,
        studentGroupID: groupID,
        userID,
        address,
      } = this

      this.createStudentAction({
        name, groupID, userID, address,
      }).then(() => {
        this.isCreating = false
        this.isStudentCreating = false

        this.$emit('updated')
      })
    },
    createTeacher() {
      const {
        teacherName: name,
        teacherCommission: commissionID,
        teacherAddress: address,
        userID,
      } = this

      this.createTeacherAction({
        name,
        commissionID,
        userID,
        address,
      }).then(() => {
        this.isCreating = false
        this.isTeacherCreating = false

        this.$emit('updated')
      }).catch(() => {})
    },
    switchStudentCreating() {
      this.loadDepartments().then(() => {
        this.isCreating = true
        this.isStudentCreating = true
      }).catch(() => {})
    },
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    userID: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style scoped lang="less">
.user {
  background: var(--color-bg-dark);
  padding: 20px;

  max-width: 450px;

  margin-bottom: 10px;

  display: flex;
  justify-content: left;
  align-items: center;

  border-radius: 8px;

  .image {
    width: 100px;
    height: 100px;
    background: var(--color-bg-light);
    border-radius: 50%;
  }

  .info {
    margin-left: 20px;
    width: 100%;

    .form-input {
      color: #fff;
      width: 100%;
    }

    .form-input-mg {
      margin-bottom: 10px;
    }

    .btn {
      padding: 10px;
      margin-right: 5px;

      border-radius: 5px;
      border: 0;

      color: #fff;
      cursor: pointer;

      font-size: 1em;
    }

    .btn-teacher {
      background: #0f8dea;
    }

    .btn-student {
      background: #f97035;
    }

    .btn-cancel {
      background: #f44;
    }

    .name {
      font-size: 1.3em;
      color: #919191;
      margin-bottom: 5px;
    }

    .address, .email {
      color: #2d3740;
      margin-bottom: 5px;;
    }

    .accept-btns {
      margin-top: 15px;
    }
  }
}
</style>
