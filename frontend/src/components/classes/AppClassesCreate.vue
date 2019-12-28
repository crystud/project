<template>
  <div class="create-class" v-if="groupID">
    <div class="create" @click="openCreate">
      <font-awesome-icon icon="plus"></font-awesome-icon>
      <span class="label">Створити пару</span>
    </div>

    <app-modal-window :show="isCreating" @close="closeCreate">
      <div slot="header">Створення пари</div>
      <div slot="content">
        <app-select
          class="form-input"
          placeholder="Предмет"
          :options="subjects"
          :option="({ hours: { subject: { name, id } } }) => ({ value: id, label: name })"
          @change="(val) => subjectID = val"
        ></app-select>

        <app-select
          class="form-input"
          placeholder="Вчитель"
          :options="teachers"
          :option="({ id: value, name: label }) => ({ value, label })"
          @change="(val) => teacherID = val"
        ></app-select>

        <div class="subgroups-check">
          <app-checkbox
            :checked="isSubgroups"
            @change="(checked) => isSubgroups = checked"
          ></app-checkbox>

          <span>Підгрупи</span>
        </div>

        <app-select
          v-if="isSubgroups"
          class="form-input"
          placeholder="Підгрупа"
          :options="subgroups"
          :option="({ id: value, name: label }) => ({ value, label })"
          @change="(val) => subgroupID = val"
        ></app-select>

        <div class="btn">
          <app-button
            class="form-input"
            :class="checkButtonIsDisactive() ? 'disactive' : ''"
            :isOkay="true"
            :disabled="checkButtonIsDisactive()"
            @click="createClass"
          >Створити пару</app-button>
        </div>
      </div>
    </app-modal-window>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppSelect from '../AppSelect.vue'
import AppCheckbox from '../AppCheckbox.vue'
import AppButton from '../AppButtonCustom.vue'
import AppModalWindow from '../AppModalWindow.vue'

export default {
  name: 'AppClassesCreate.vue',
  components: {
    AppSelect,
    AppCheckbox,
    AppButton,
    AppModalWindow,
  },
  props: {
    groupID: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isSubgroups: false,
      teacherID: 0,
      subgroupID: 0,
      subjectID: 0,
      isCreating: false,
    }
  },
  computed: {
    ...mapGetters({
      teachers: 'teachers/teachers',
      subgroups: 'group/subgroups',
      subjects: 'group/availableSubjects',
    }),
  },
  methods: {
    ...mapActions({
      createClassAction: 'classes/create',
      loadGroupSubjects: 'group/loadGroupSubjects',
    }),
    checkButtonIsDisactive() {
      const {
        isSubgroups,
        subgroupID,
        teacherID,
        subjectID,
      } = this

      if (!teacherID || !subjectID) {
        return true
      }

      if (isSubgroups) {
        return !subgroupID
      }

      return false
    },
    openCreate() {
      this.isCreating = true
    },
    closeCreate() {
      this.isCreating = false

      this.isSubgroups = false
      this.teacherID = 0
      this.subgroupID = 0
    },
    createClass() {
      if (this.checkButtonIsDisactive()) {
        return false
      }

      const {
        teacherID,
        isSubgroups,
        subgroupID,
        groupID,
        subjectID,
      } = this

      this.createClassAction({
        teacherID,
        groupID: isSubgroups ? null : groupID,
        subgroupID: isSubgroups ? subgroupID : null,
        subgroups: isSubgroups ? 1 : 0,
        subjectID,
      }).then(() => {
        this.loadGroupSubjects(groupID).then(this.closeCreate)
      })

      return true
    },
  },
}
</script>

<style lang="less" scoped>
.create-class {
  .create {
    color: #fff;
    margin-bottom: 15px;
    background: var(--color-bg-dark);
    padding: 20px;
    border-radius: 6px;
    border-left: 7px solid #b54040;
    cursor: pointer;
    color: var(--color-font-dark);

    display: flex;
    align-items: center;

    .label {
      margin-left: 10px;
    }
  }

  .btn {
    opacity: 1;
    transition: all .15s;

    &.disactive {
      opacity: .25;
      cursor: not-allowed;
    }
  }

  .subgroups-check {
    margin: 20px 0;
    display: flex;

    span {
      margin-left: 10px;
    }
  }

  .form-input {
    margin: 10px 0;
  }
}
</style>
