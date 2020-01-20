<template>
  <div class="group">
    <div class="sections" v-if="loaded">
      <app-group-personal-info
        @onEdit="show = true"
        :name="group.name"
        :specialty="group.specialty.name"
        :students="group.students"
      ></app-group-personal-info>

      <app-group-classes-info
        :schedule="group.schedule.list"
        :classesList="group.classes"
      ></app-group-classes-info>
    </div>

    <app-modal-window :show="show" @close="show = false">
      <div slot="header" class="edit-group-header">
        <span class="group-name">П-42</span>
        <span class="group-students">16 студентів</span>
      </div>

      <div slot="content">
        <div>
          <span class="edit-title">Редагування групи</span>

          <app-input
            name="Номер групи"
            type="number"
            class="form-input"
          ></app-input>

          <app-datepicker
            placeholder="Дата початку навчання"
            class="form-input"
          ></app-datepicker>

          <app-datepicker
            placeholder="Дата закінчення навчання"
            class="form-input"
            defaultTime="2016-12-12"
          ></app-datepicker>

          <app-select
            class="form-input"
            placeholder="Спеціальність"
            :options="[{ test: 1 }, { test: 2 }]"
            :option="({ test }) => ({ label: test, value: test })"></app-select>

          <div class="submit-btns">
            <button class="btn btn-cancel" @click="show = false">Скасувати</button>
            <button class="btn btn-change">Зберегти</button>
          </div>
        </div>
      </div>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppGroupClassesInfo from './AppGroupClassesInfo.vue'
import AppGroupPersonalInfo from './AppGroupInfo.vue'
import AppModalWindow from '../AppModalWindow.vue'

import AppInput from '../AppInput.vue'
import AppDatepicker from '../AppDatepickerCustom.vue'
import AppSelect from '../AppSelect.vue'

export default {
  name: 'AppTeacherPage',
  computed: {
    ...mapGetters({
      group: 'group/group',
    }),
  },
  methods: {
    ...mapActions({
      get: 'group/get',
      loadSemesters: 'semesters/loadSemesters',
    }),
  },
  data() {
    return {
      show: false,
      loaded: false,
    }
  },
  components: {
    AppGroupClassesInfo,
    AppGroupPersonalInfo,
    AppModalWindow,
    AppSelect,
    AppInput,
    AppDatepicker,
  },
  async created() {
    await this.get(this.$route.params.id)
    await this.loadSemesters(this.group.specialtyID)

    this.loaded = true
  },
}
</script>

<style lang="less" scoped>
.group {
  .header {
    color: #fff;
    padding: 10px;
  }

  .edit-group-header {
    display: flex;
    align-items: center;

    .group-name {
      font-size: 2em;
    }

    .group-students {
      margin-left: 25px;
      color: #55636d;
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
      padding: 12px 25px;
      border-radius: 4px;
      border: 0;
      font-size: 1em;
      color: #fff;
      cursor: pointer;
      margin-left: 10px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);

      &.btn-change {
        background: #3242d5;
      }

      &.btn-cancel {
        background: #c72929;
      }
    }
  }

  .sections {
    margin-top: 10px;
    display: grid;
    grid-template-columns: 3fr 6fr;
    grid-gap: 20px;

    .classes-info {
      background: var(--color-bg-dark);
      border-radius: 4px;

      width: 100%;
    }

    .personal-info {
      width: 100%;
    }

    @media screen and (max-width: 1350px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
