<template>
  <app-modal-window
    :show="show"
    @close="$emit('cancel')"
  >
    <div slot="header">Створення студента</div>

    <div slot="content">
      <app-custom-input
        type="text"
        placeholder="ПІБ студента"
        class="form-input-mg"
        :value="name"
        :isSuccess="!!name"
        @change="(val) => name = val"
      ></app-custom-input>

      <app-custom-input
        type="text"
        placeholder="Адреса студента"
        class="form-input-mg"
        :value="address"
        :isSuccess="!!address"
        @change="(val) => address = val"
      ></app-custom-input>

      <app-select
        v-if="departments"
        class="form-input form-input-mg"
        :options="departments"
        :option="({ id, name }) => ({ label: name, value: id })"
        @change="loadSpecialtysList"
        placeholder="Відділення"
      ></app-select>

      <app-select
        class="form-input form-input-mg"
        v-if="specialtys.length"
        :options="specialtys"
        :option="({ id, name }) => ({ label: name, value: id })"
        @change="loadGroupsList"
        placeholder="Спеціальність"
      ></app-select>

      <app-select
        class="form-input form-input-mg"
        v-if="groups.length"
        :options="groups"
        :option="({ id, name }) => ({ label: name, value: id })"
        @change="(val) => groupID = val"
        placeholder="Група"
      ></app-select>

      <div class="accept-btns">
        <app-button
          :isOkay="false"
          class="btn"
          @click="$emit('cancel')"
        >Скасувати</app-button>

        <app-button
          :isOkay="true"
          class="btn"
          @click="createStudent"
        >Створити студента</app-button>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppModalWindow from '../AppModalWindow.vue'
import AppCustomInput from '../AppCustomInput.vue'
import AppButton from '../AppButtonCustom.vue'
import AppSelect from '../AppSelect.vue'

export default {
  name: 'AppCreateStudent.vue',
  components: {
    AppModalWindow,
    AppCustomInput,
    AppButton,
    AppSelect,
  },
  computed: {
    ...mapGetters({
      departments: 'departments/list',
      specialtys: 'specialty/specialtys',
      groups: 'group/list',
    }),
  },
  data() {
    return {
      address: '',
      name: '',
      groupID: null,
    }
  },
  watch: {
    async student() {
      const { loadDepartments, student } = this

      this.loadDepartments()

      await loadDepartments()

      this.name = student.name
      this.address = student.address
      this.groupID = null
    },
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    student: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      loadDepartments: 'departments/loadDepartments',
      loadSpecialtys: 'specialty/loadSpecialtys',
      loadGroups: 'group/loadGroups',
      setNoGroups: 'group/setNoGroups',
      setNoSpecialtys: 'specialty/setNoSpecialtys',
      createStudentAction: 'student/createStudent',
    }),
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
    createStudent() {
      const {
        name,
        groupID,
        address,
        student: { userID },
      } = this

      this.createStudentAction({
        name,
        groupID,
        userID,
        address,
      }).then(() => {
        this.$emit('done')
      })
    },
  },
}
</script>

<style lang="less" scoped>
.form-input {
  color: #fff;
  width: 100%;
}

.form-input-mg {
  margin-bottom: 10px;
}

.accept-btns {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;

  .btn {
    margin-left: 10px;
  }
}
</style>
