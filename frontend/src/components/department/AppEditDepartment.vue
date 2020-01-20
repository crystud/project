<template>
  <app-modal-window
    :show="show"
    @close="$emit('cancel')"
    class="app-edit-department"
  >
    <div slot="header">
      Редагування відділення
    </div>

    <div slot="content">
      <div class="label">
        Редагування відділення: {{department.name}}
      </div>

      <app-input
        class="form-input"
        :isSuccess="!!name"
        placeholder="Назва"
        :value="name"
        @change="newVal => name = newVal"
      ></app-input>

      <app-select
        placeholder="Завідувач"
        class="form-input"
        :options="teachers"
        :option="({ id: value, name: label }) => ({ value, label })"
        :defaultValue="{ id: leaderID }"
        @change="newVal => leaderID = newVal"
      ></app-select>

      <div class="btns">
        <app-button
          :isOkay="false"
          @click="$emit('cancel')"
          class="btn"
        >Скасувати</app-button>

        <app-button
          :isOkay="true"
          @click="save"
          class="btn"
        >Зберегти</app-button>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppModalWindow from '../AppModalWindow.vue'
import AppInput from '../AppCustomInput.vue'
import AppSelect from '../AppSelect.vue'
import AppButton from '../AppButtonCustom.vue'

export default {
  name: 'AppEditDepartment.vue',
  components: {
    AppModalWindow,
    AppInput,
    AppSelect,
    AppButton,
  },
  data() {
    return {
      name: '',
      leaderID: null,
    }
  },
  computed: {
    ...mapGetters({
      teachers: 'teachers/teachers',
    }),
  },
  watch: {
    department() {
      const {
        department: { name, leaderID },
      } = this

      this.name = name
      this.leaderID = leaderID
    },
  },
  methods: {
    ...mapActions({
      loadAllTeachers: 'teachers/loadAllTeachers',
      editDepartment: 'departments/edit',
    }),
    save() {
      const {
        name,
        leaderID,
        department: { id },
      } = this

      this.editDepartment({
        id,
        name,
        leaderID,
      }).then(() => {
        this.name = ''
        this.leaderID = null

        this.$emit('done')
      })
    },
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    department: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.loadAllTeachers()
  },
}
</script>

<style lang="less" scoped>
.app-edit-department {
  .label {
    color: var(--color-font-dark);
  }

  .form-input, .label {
    margin-bottom: 10px;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;

    .btn {
      margin-left: 10px;
    }
  }
}
</style>
