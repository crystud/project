<template>
  <div class="class">
    <div class="name">
      {{data.name}}
    </div>

    <div class="additional-info">
      <app-select
        class="form-input"
        placeholder="Вчитель"
        :options="teachers"
        :option="({ id: value, name: label }) => ({ value, label })"
        @change="(val) => {
            teacherID = val
            changes = true
          }"
        :defaultValue="{ id: data.class.teacherID }"
      ></app-select>

      <app-select
        v-if="data.class.subgroupID && isSubgroups"
        class="form-input"
        placeholder="Підгрупа"
        :options="subgroups"
        :option="({ id: value, name: label }) => ({ value, label })"
        @change="(val) => {
            subgroupID = val
            changes = true
          }"
        :defaultValue="{ id: data.class.subgroupID }"
      ></app-select>

      <app-select
        v-if="!data.class.subgroupID && isSubgroups"
        class="form-input"
        placeholder="Підгрупа"
        :options="subgroups"
        :option="({ id: value, name: label }) => ({ value, label })"
        @change="(val) => {
          subgroupID = val
          changes = true
        }"
      ></app-select>

      <div class="subgroups-check">
        <app-checkbox
          :checked="isSubgroups"
          @change="(checked) => {
            isSubgroups = checked
            changes = true
          }"
        ></app-checkbox>

        <span>Підгрупи</span>
      </div>

      <div class="btn" v-if="changes">
        <app-button
          class="form-input"
          :class="checkButtonIsDisactive() ? 'disactive' : ''"
          :isOkay="true"
          :disabled="checkButtonIsDisactive()"
          @click="editClass"
        >Зберегти пару</app-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppSelect from '../AppSelect.vue'
import AppCheckbox from '../AppCheckbox.vue'
import AppButton from '../AppButtonCustom.vue'

export default {
  name: 'AppClassesItem.vue',
  components: {
    AppSelect,
    AppCheckbox,
    AppButton,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    groupID: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isSubgroups: this.data.class.subgroupID,
      teacherID: this.data.class.teacherID,
      subgroupID: this.data.class.subgroupID,
      changes: false,
    }
  },
  computed: {
    ...mapGetters({
      teachers: 'teachers/teachers',
      subgroups: 'group/subgroups',
    }),
  },
  methods: {
    ...mapActions({
      saveClass: 'classes/edit',
    }),
    checkButtonIsDisactive() {
      const {
        isSubgroups,
        subgroupID,
        teacherID,
      } = this

      if (!teacherID) {
        return true
      }

      if (isSubgroups) {
        return !subgroupID
      }

      return false
    },
    editClass() {
      if (this.checkButtonIsDisactive()) {
        return false
      }

      const {
        teacherID,
        isSubgroups,
        subgroupID,
        groupID,
        data: {
          class: {
            id: classID,
            subjectID,
          },
        },
      } = this

      this.saveClass({
        classID,
        teacherID,
        groupID: isSubgroups ? null : groupID,
        subgroupID: isSubgroups ? subgroupID : null,
        subgroups: isSubgroups ? 1 : 0,
        subjectID,
      }).then(() => {
        this.changes = false
      })

      return true
    },
  },
}
</script>

<style lang="less" scoped>
.class {
  color: #fff;
  margin-bottom: 15px;
  background: var(--color-bg-dark);
  padding: 20px;
  border-radius: 6px;
  border-left: 7px solid #b54040;

  .semester-number {
    color: var(--color-font-dark);
  }

  &, .additional-info, .subgroups-check {
    display: flex;
    align-items: center;
  }


  justify-content: space-between;

  .subgroups-check {
    margin-left: 20px;

    span {
      margin-left: 10px;
    }
  }

  .form-input {
    margin-left: 20px;
  }

  .btn {
    width: 180px;
    margin-right: 20px;

    &.disactive {
      opacity: .25;
      cursor: not-allowed;
    }
  }
}
</style>
