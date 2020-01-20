<template>
  <app-modal-window
    :show="show"
    @close="$emit('cancel')"
    class="edit-teacher"
  >
    <div
      class="edit-teacher-header"
      slot="header"
    >
      <span class="teacher-name">Редагування вчителя</span>
    </div>

    <div slot="content">
      <span class="edit-title">Редагування вчителя: {{teacherName}}</span>

      <app-input
        placeholder="ПІБ вчителя"
        type="text"
        class="form-input"
        :isSuccess="!!name"
        :value="name"
        @change="(val) => name = val"
      ></app-input>

      <app-select
        class="form-input"
        placeholder="Комісія"
        :defaultValue="{ id: commission }"
        @change="(val) => commission = val"
        :options="commissions"
        :option="({ id, name }) => ({ label: name, value: id })"></app-select>

      <div class="submit-btns">
        <app-button
          @click="$emit('cancel')"
          :isOkay="false"
        >Скасувати</app-button>

        <app-button
          @click="editTeacher"
          :isOkay="true"
        >Зберегти</app-button>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppModalWindow from '../AppModalWindow.vue'
import AppInput from '../AppCustomInput.vue'
import AppSelect from '../AppSelect.vue'
import AppButton from '../AppButtonCustom.vue'

export default {
  name: 'AppEditTeacher.vue',
  components: {
    AppModalWindow,
    AppInput,
    AppSelect,
    AppButton,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    teacherName: {
      type: String,
      required: true,
    },
    teacherCommission: {
      type: Number,
      required: true,
    },
    teacherID: {
      type: Number,
      required: true,
    },
  },
  watch: {
    show() {
      this.name = this.teacherName
      this.commission = this.teacherCommission
    },
    teacherName() {
      this.name = this.teacherName
    },
    teacherCommission() {
      this.commission = this.teacherCommission
    },
  },
  methods: {
    ...mapActions({
      edit: 'teachers/edit',
      loadCommissions: 'commissions/loadCommissions',
    }),
    editTeacher() {
      const {
        name,
        commission: commissionID,
        teacherID: id,
      } = this

      this.edit({ name, commissionID, id }).then(() => {
        this.name = ''
        this.commission = null

        this.$emit('done')
      })
    },
  },
  computed: {
    ...mapGetters({
      commissions: 'commissions/list',
    }),
  },
  data() {
    return {
      name: '',
      commission: null,
    }
  },
  created() {
    this.loadCommissions()
  },
}
</script>

<style lang="less" scoped>
.edit-teacher {
  .edit-teacher-header {
    .teacher-name {
      font-size: 1.3em;
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
      margin-left: 10px;
    }
  }
}
</style>
