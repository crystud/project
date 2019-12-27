<template>
  <app-modal-window
    :show="show"
    @close="$emit('close')"
  >
    <div slot="header">
      Редагування типу предмета
    </div>

    <div
      slot="content"
      class="edit-content"
      v-if="data.id"
    >
      <app-input
        type="text"
        placeholder="Назва"
        :isSuccess="!!name"
        :value="data.name"
        @change="(val) => name = val"
        class="form-input"
      ></app-input>

      <app-input
        type="text"
        placeholder="Коефіцієнт"
        :isSuccess="!!coefficient"
        :value="data.coefficient"
        @change="(val) => coefficient = val"
        class="form-input"
      ></app-input>

      <app-select
        placeholder="Система оцінювання"
        :options="scoringSystems"
        :option="({ id: value, name: label }) => ({ value, label })"
        :defaultValue="{ id: data.id }"
        @change="(val) => scoringSystemID = val"
        class="form-input"
      ></app-select>

      <div class="btns">
        <app-button
          :isOkay="false"
          @click="$emit('close')"
          class="btn"
        >Скасувати</app-button>

        <app-button
          :isOkay="true"
          @click="saveChanges"
          class="btn"
        >Зберегти</app-button>
      </div>

    </div>
  </app-modal-window>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppModalWindow from '../../AppModalWindow.vue'
import AppInput from '../../AppCustomInput.vue'
import AppButton from '../../AppButtonCustom.vue'
import AppSelect from '../../AppSelect.vue'

export default {
  name: 'AppSubjectTypeEdit',
  data() {
    return {
      name: '',
      coefficient: '',
      scoringSystemID: '',
    }
  },
  computed: {
    ...mapGetters({
      data: 'subjectTypes/editingItem',
      scoringSystems: 'scoringSystems/list',
    }),
  },
  methods: {
    ...mapActions({
      loadScoringSystems: 'scoringSystems/load',
      editSubjectType: 'subjectTypes/edit',
      loadSubjectTypes: 'subjectTypes/load',
    }),
    saveChanges() {
      const {
        name,
        coefficient,
        scoringSystemID,
        data,
      } = this

      this.editSubjectType({
        subjectTypeID: data.id,
        name: name || data.name,
        coefficient: coefficient || data.coefficient,
        scoringSystemID: scoringSystemID || data.scoringSystemID,
      }).then(() => {
        this.name = ''
        this.coefficient = ''
        this.scoringSystemID = ''

        this.loadSubjectTypes()

        this.$emit('close')
      })
    },
  },
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
  },
  async created() {
    this.loadScoringSystems()
  },
}
</script>

<style lang="less" scoped>
.edit-content {
  .form-input {
    margin-bottom: 20px;
  }

  .btns {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;

    .btn {
      margin-left: 15px;
    }
  }
}

</style>
