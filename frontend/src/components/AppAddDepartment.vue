<template>
  <div class="department add-department" @click="isAdding = true">
    <div class="button-content">
      <div v-if="!isAdding">
        <font-awesome-icon class="icon" icon="plus"></font-awesome-icon>
        <div class="label">Створити нове відділення</div>
      </div>

      <div v-if="isAdding">
        <app-input
          class="name"
          name="Назва..."
          @input="(departmentName) => name = departmentName"
        ></app-input>

        <app-select
          class="leader-select"
          placeholder="Завідувач"
          :options="teachers"
          :option="(option) => ({ value: option.id, label: option.name })"
          @change="(value) => selectedTeacher = value"
        ></app-select>

        <app-button class="btn-create" @click="create">
          Створити
        </app-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppSelect from './AppSelect.vue'
import AppInput from './AppInput.vue'
import AppButton from './AppButton.vue'

export default {
  name: 'AddDepartment',
  components: {
    AppInput,
    AppButton,
    AppSelect,
  },
  computed: {
    ...mapGetters({
      teachers: 'teachers/teachers',
    }),
  },
  methods: {
    ...mapActions({
      getTeachers: 'teachers/loadAllTeachers',
      createDepartment: 'departments/createDepartment',
    }),
    create() {
      const {
        name,
        selectedTeacher: leaderID,
      } = this

      if (!name && !leaderID) {
        return null
      }

      this.createDepartment({ name, leaderID }).then(() => {
        this.isAdding = false

        this.name = ''
        this.selectedTeacher = ''

        this.$emit('onAdded')
      }).catch(() => {})

      return false
    },
  },
  data() {
    return {
      isAdding: false,
      selectedTeacher: 0,
      name: '',
    }
  },
  created() {
    this.getTeachers()
  },
}
</script>

<style lang="less" scoped>
.add-department {
  background: #1E2329;
  color: #55636E;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  .btn-create {
    background: var(--color-bg-light);
    color: var(--color-font-main);
    padding: 15px;
    font-size: 17px;
    cursor: pointer;
    width: 100%;
  }

  .button-content {
    text-align: center;
    font-weight: 300;

    .icon {
      font-size: 1.5em;
    }

    .label {
      margin-top: 10px;
    }
  }
}

.add-department:hover {
  background: rgb(25, 29, 34);
}
</style>
