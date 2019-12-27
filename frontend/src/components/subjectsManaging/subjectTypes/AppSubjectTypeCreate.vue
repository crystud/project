<template>
  <div class="create">
    <div
      class="global-title"
      @click="isCreating = true"
      v-if="!isCreating"
    >
      <font-awesome-icon
        icon="plus"
        class="icon"
      ></font-awesome-icon>

      <span class="text">Створити тип предмету</span>
    </div>

    <div class="creating" v-if="isCreating">
      <span class="form-input">
        <app-input
          placeholder="Назва"
          :isSuccess="!!name"
          @change="(val) => name = val"
        ></app-input>
      </span>

      <span class="form-input coefficient-field">
        <app-input
          placeholder="Коефіцієнт"
          :isSuccess="!!coefficient"
          @change="(val) => coefficient = val"
        ></app-input>
      </span>

      <span class="form-input">
        <app-select
          placeholder="Система оцінювання"
          :options="scoringSystems"
          :option="({ id: value, name: label }) => ({ label, value })"
          @change="(val) => scoringSystemID = val"
        ></app-select>
      </span>

      <span class="btns form-input">
        <app-button
          :isOkay="false"
          @click="isCreating = false"
          class="btn"
        >Скасувати</app-button>

        <app-button
          :isOkay="true"
          @click="create"
          class="btn"
        >Створити</app-button>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppInput from '../../AppCustomInput.vue'
import AppButton from '../../AppButtonCustom.vue'
import AppSelect from '../../AppSelect.vue'

export default {
  name: 'AppSubjectTypeCreate',
  data() {
    return {
      isCreating: false,
      name: '',
      coefficient: '',
      scoringSystemID: '',
    }
  },
  computed: {
    ...mapGetters({
      scoringSystems: 'scoringSystems/list',
    }),
  },
  components: {
    AppInput,
    AppButton,
    AppSelect,
  },
  methods: {
    ...mapActions({
      loadScoringSystems: 'scoringSystems/load',
      createSubjectType: 'subjectTypes/create',
      loadSubjectTypes: 'subjectTypes/load',
    }),
    create() {
      const {
        name,
        coefficient,
        scoringSystemID,
      } = this

      this.createSubjectType({
        name, coefficient, scoringSystemID,
      }).then(() => {
        this.loadSubjectTypes()
        this.isCreating = false
      })
    },
  },
  created() {
    this.loadScoringSystems()
  },
}
</script>

<style lang="less" scoped>
.create {
  display: block;
  width: 100%;
  border-left: 7px solid #00ff87;
  border-radius: 5px;
  background: #15191C;
  margin-bottom: 10px;
  color: #fff;
  cursor: pointer;

  .global-title {
    color: #55636d;

    .text {
      margin-left: 15px;
    }
  }

  .global-title,
  .creating {
    padding: 20px;
  }

  .coefficient-field {
    width: 130px;
  }

  .form-input {
    display: inline-block;
    margin-top: 15px;
    margin-right: 15px;
  }

  .btn {
    margin-right: 10px;
  }
}
</style>
