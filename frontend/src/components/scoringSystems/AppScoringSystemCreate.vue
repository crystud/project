<template>
  <div class="scoring-system-create">
    <div class="labels">
      <div class="create" @click="switchToCreate" v-if="!isCreating">
        <font-awesome-icon icon="plus"></font-awesome-icon>
        <span class="label">Створити систему оцінювання</span>
      </div>

      <div v-if="isCreating" class="creating-fields">
        <app-custom-input
          class="form-input"
          placeholder="Назва"
          :isSuccess="!!name"
          @change="(val) => name = val"
        ></app-custom-input>

        <app-custom-input
          class="form-input"
          placeholder="Мін. оцінка"
          :isSuccess="!!minMark"
          @change="(val) => minMark = val"
        ></app-custom-input>

        <app-custom-input
          class="form-input"
          placeholder="Макс. оцінка"
          :isSuccess="!!maxMark"
          @change="(val) => maxMark = val"
        ></app-custom-input>

        <app-custom-input
          class="form-input"
          placeholder="Мін. прохідний бал"
          :isSuccess="!!minPassingMark"
          @change="(val) => minPassingMark = val"
        ></app-custom-input>

        <div>
          <app-button
            class="btn btn-cancel"
            :isOkay="false"
            @click="isCreating = false"
          >Скасувати</app-button>

          <app-button
            :isOkay="true"
            class="btn"
            :class="isOkay() ? 'create-able' : 'create-disable'"
            @click="create"
          >Створити</app-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppCustomInput from '../AppCustomInput.vue'
import AppButton from '../AppButtonCustom.vue'

export default {
  name: 'AppSubjectsHeader',
  components: {
    AppCustomInput,
    AppButton,
  },
  data() {
    return {
      isCreating: false,
      name: '',
      minMark: 0,
      maxMark: 0,
      minPassingMark: 0,
    }
  },
  methods: {
    ...mapActions({
      createScoringSystem: 'scoringSystems/create',
      loadScoringSystems: 'scoringSystems/load',
    }),
    isOkay() {
      const {
        name,
        minMark,
        maxMark,
        minPassingMark,
      } = this

      return (
        name
        && minMark
        && maxMark
        && minPassingMark
      )
    },
    switchToCreate() {
      this.isCreating = true
    },
    create() {
      const {
        minMark: minPossibleMark,
        minPassingMark,
        maxMark: maxPossibleMark,
        name,
        isOkay,
      } = this

      if (!isOkay()) {
        return
      }

      this.createScoringSystem({
        name,
        minPossibleMark,
        maxPossibleMark,
        minPassingMark,
      }).then(() => {
        this.loadScoringSystems()

        this.isCreating = false
      })
    },
  },
}
</script>

<style scoped lang="less">
.scoring-system-create {
  border-left: 7px solid #00ff87;
  background: var(--color-bg-dark);
  border-radius: 5px;
  cursor: pointer;

  width: 100%;

  display: flex;
  justify-content: left;

  .field-label {
    display: block;
    margin-bottom: 10px;
  }

  .create,
  .creating-fields {
    padding: 20px;
  }

  &.create-able {
    opacity: 1;
    cursor: pointer;
  }

  &.create-disable {
    opacity: .5;
    cursor: not-allowed;
  }

  .btn {
    margin-right: 10px;
  }

  .form-input {
    margin-right: 30px;
    width: auto;
    margin-bottom: 10px;
  }

  .creating-fields {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;

    align-items: flex-end;
  }

  .labels {
    width: 100%;
  }

  .create {
    color: #55636d;
    width: 100%;

    .label {
      margin-left: 15px;
    }
  }
}
</style>
