<template>
  <div class="subject" :class="coefficient > 0.5 ? 'high-coefficient' : 'low-coefficient'">
    <div class="labels" v-if="!isEditing">
      <span class="name">
        {{name}}
      </span>

      <span class="commission-name">
        {{commissionName}}
      </span>

      <span class="coefficient">
        {{coefficient}}
      </span>

      <span class="subject-type-name">
        {{subjectTypeName}}
      </span>

      <span class="scoring-system-name">
        {{scoringSystemName}}
      </span>
    </div>

    <span class="actions" v-if="!isEditing" @click="inActions = true">
      <span v-if="inActions">
        <font-awesome-icon
          icon="edit"
          class="icon edit"
          @click="switchToEdit"
        ></font-awesome-icon>
      </span>

      <font-awesome-icon
        v-if="!inActions"
        icon="ellipsis-h"
      ></font-awesome-icon>
    </span>

    <div class="editing" v-if="isEditing">
      <span class="edit-field">
        <app-custom-input
          placeholder="Назва предмету"
          :isSuccess="!!subjectName"
          :value="subjectName"
          @change="(val) => subjectName = val"
        ></app-custom-input>
      </span>

      <span class="edit-field">
        <app-select
          placeholder="Комісія"
          :options="commissions"
          :option="({ id, name }) => ({ label: name, value: id })"
          :defaultValue="{ id: this.commissionID }"
          @change="(val) => commission = val"
        ></app-select>
      </span>

      <span class="edit-field" v-if="subjectTypes.length">
        <app-select
          placeholder="Тип предмету"
          :options="subjectTypes"
          @change="(val) => subjectType = val"
          :option="
            ({
              id,
              name,
              coefficient,
              scoring_system,
            }) => ({
              label: `
                ${name} /
                коеф. ${coefficient} /
                ${scoring_system ? scoring_system.name : ''}`,
              value: id,
            })"
            :defaultValue="{ id: this.subjectTypeID }"
        ></app-select>
      </span>
    </div>

    <span class="edit-actions" v-if="isEditing">
      <button
        class="btn btn-cancel"
        @click="
          isEditing = false;
          inActions = false;
        "
        >Скасувати</button>

        <button
          class="btn btn-save"
          @click="saveChanges"
        >Зберегти зміни</button>
    </span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppCustomInput from '../AppCustomInput.vue'
import AppSelect from '../AppSelect.vue'

export default {
  name: 'AppSubjectsItem',
  data() {
    return {
      inActions: false,
      isEditing: false,
      subjectName: this.name,
      commission: this.commissionID,
      subjectType: this.subjectTypeID,
    }
  },
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
  methods: {
    ...mapActions({
      loadCommissions: 'commissions/loadCommissions',
      loadSubjectTypes: 'subjectTypes/load',
      loadSubjects: 'subjects/load',
      editSubject: 'subjects/edit',
    }),
    switchToEdit() {
      this.loadSubjectTypes()
      this.loadCommissions()

      this.isEditing = true
    },
    saveChanges() {
      const {
        subjectName: name,
        commission: commissionID,
        subjectType: subjectTypeID,
        id,
      } = this

      this.editSubject({
        subjectID: id,
        subjectTypeID,
        commissionID,
        name,
      }).then(() => {
        this.isEditing = false
        this.inActions = false

        this.loadSubjects()
      }).catch(console.error)
    },
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    subjectTypeID: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    commissionName: {
      type: String,
      required: true,
    },
    commissionID: {
      type: Number,
      required: true,
    },
    scoringSystemName: {
      type: String,
      required: true,
    },
    coefficient: {
      type: Number,
      required: true,
    },
    subjectTypeName: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="less">
.subject {
  border-left: 7px solid;
  background: var(--color-bg-dark);
  border-radius: 5px;
  padding: 20px 10px;

  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .labels {
    display: grid;
    grid-template-columns: 1.5fr 1.3fr 0.7fr 1fr 1.3fr;
    margin-left: 10px;

    width: 70%;
  }

  .btn {
    padding: 10px;
    font-size: .9em;
    border: 0;
    border-radius: 4px;
    margin-left: 10px;
    color: #fff;
    cursor: pointer;
  }

  .btn-save {
    background: var(--color-accent-green);
  }

  .btn-cancel {
    background: var(--color-accent-red);
  }

  .edit-actions {
    margin-right: 10px;
  }

  .editing {
    display: flex;
    justify-content: left;
    align-items: center;

    margin-left: 10px;
  }

  .edit-field {
    margin-right: 15px;
  }

  .actions {
    margin-right: 10px;
    cursor: pointer;
    font-size: 1.1em;

    .icon {
      margin-left: 15px;
    }

    .edit {
      color: #55636d;
    }
  }

  &.high-coefficient {
    border-color: #375ee1;
  }

  &.low-coefficient {
    border-color: #23c9cf;
  }
}
</style>
