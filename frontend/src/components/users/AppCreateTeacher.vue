<template>
  <app-modal-window
    :show="show"
    @close="$emit('cancel')"
  >
    <div slot="header">Створення вчителя</div>

    <div slot="content">
      <app-custom-input
        type="text"
        placeholder="ПІБ вчителя"
        class="form-input-mg"
        :value="name"
        :isSuccess="!!name"
        @change="(val) => name = val"
      ></app-custom-input>

      <app-custom-input
        type="text"
        placeholder="Адреса вчителя"
        class="form-input-mg"
        :value="address"
        :isSuccess="!!address"
        @change="(val) => address = val"
      ></app-custom-input>

      <app-select
        class="form-input"
        :options="commissions"
        :option="({ id, name }) => ({ label: name, value: id })"
        @change="(val) => commissionID = val"
        placeholder="Комісія"
      ></app-select>

      <div class="accept-btns">
        <app-button
          :isOkay="false"
          @click="$emit('cancel')"
          class="btn"
        >Скасувати</app-button>

        <app-button
          :isOkay="true"
          @click="createTeacher"
          class="btn"
        >Створити вчителя</app-button>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppModalWindow from '../AppModalWindow.vue'
import AppButton from '../AppButtonCustom.vue'
import AppSelect from '../AppSelect.vue'
import AppCustomInput from '../AppCustomInput.vue'

export default {
  name: 'AppCreateTeacher.vue',
  components: {
    AppModalWindow,
    AppButton,
    AppSelect,
    AppCustomInput,
  },
  methods: {
    ...mapActions({
      loadCommissions: 'commissions/loadCommissions',
      createTeacherAction: 'teachers/create',
    }),
    createTeacher() {
      const {
        name,
        address,
        commissionID,
        teacher: { userID },
      } = this

      this.createTeacherAction({
        name,
        commissionID,
        userID,
        address,
      }).then(() => {
        this.isCreating = false
        this.isTeacherCreating = false

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
      address: '',
      commissionID: null,
    }
  },
  props: {
    teacher: {
      type: Object,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    async teacher() {
      const {
        teacher: {
          name,
          address,
        },
        loadCommissions,
      } = this

      loadCommissions().then(() => {
        this.name = name
        this.address = address
      }).catch(() => {})
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
