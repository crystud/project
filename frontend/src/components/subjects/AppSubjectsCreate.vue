<template>
  <div class="subject">
    <div class="labels">
      <div class="create" @click="switchToCreate" v-if="!isCreating">
        <font-awesome-icon icon="plus"></font-awesome-icon>
        <span class="label">Створити предмет</span>
      </div>

      <div v-if="isCreating" class="creating-fields">
        <app-custom-input
          class="form-input"
          placeholder="Назва предмету"
          :isSuccess="!!subjectName"
          @change="(val) => subjectName = val"
        ></app-custom-input>

        <app-select
          placeholder="Система оцінювання / тип предмету"
          class="form-input"
          :options="subjectTypes"
          :option="
            ({
              id,
              name,
              coefficient,
              scoring_system,
            }) => ({
              label: `${name} / коеф. ${coefficient} / ${scoring_system.name}`,
              value: id,
            })"
          @change="(val) => subjectType = val"
        ></app-select>

        <app-select
          placeholder="Комісія"
          class="form-input"
          :options="commissions"
          :option="({ id, name }) => ({ label: `${name}`, value: id })"
          @change="(val) => commissionID = val"
        ></app-select>

        <button
          class="btn btn-cancel"
          @click="isCreating = false"
        >Скасувати</button>

        <button
          class="btn btn-create"
          :class="commissionID && subjectType && subjectName ? 'create-able' : 'create-disable'"
          @click="createSubject"
        >Створити</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppCustomInput from '../AppCustomInput.vue'
import AppSelect from '../AppSelect.vue'

export default {
  name: 'AppSubjectsHeader',
  components: {
    AppCustomInput,
    AppSelect,
  },
  computed: {
    ...mapGetters({
      commissions: 'commissions/list',
      subjectTypes: 'subjectTypes/list',
    }),
  },
  data() {
    return {
      isCreating: false,
      subjectName: '',
      commissionID: 0,
      subjectType: 0,
    }
  },
  methods: {
    ...mapActions({
      loadCommissions: 'commissions/loadCommissions',
      loadSubjectTypes: 'subjectTypes/load',
      createSubjectAction: 'subjects/create',
      loadSubjects: 'subjects/load',
    }),
    switchToCreate() {
      this.loadCommissions()
      this.loadSubjectTypes()

      this.isCreating = true
    },
    createSubject() {
      const {
        commissionID,
        subjectType: subjectTypeID,
        subjectName: name,
      } = this

      if (!name || !subjectTypeID || !commissionID) {
        return
      }

      this.createSubjectAction({
        commissionID,
        subjectTypeID,
        name,
      }).then(() => {
        this.isCreating = false
        this.loadSubjects()
      }).catch(console.error)
    },
  },
}
</script>

<style scoped lang="less">
.subject {
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

  .btn {
    padding: 10px;
    margin-right: 10px;
    border: 0;
    border-radius: 5px;
    font-size: 1em;
    color: #ffffff;

    transition: all .3s;
  }

  .btn-cancel {
    background: #55636d;
  }

  .btn-create {
    background: #00ff87;

    &.create-able {
      opacity: 1;
      cursor: pointer;
    }

    &.create-disable {
      opacity: .5;
      cursor: not-allowed;
    }
  }

  .form-input {
    margin-right: 30px;
    width: auto;
  }

  .creating-fields {
    display: flex;
    justify-content: left;

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
