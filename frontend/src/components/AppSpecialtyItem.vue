<template>
  <div class="specialty-item">
    <div class="line"></div>

    <div class="info">
      <div v-if="isEditing">
        <div class="formgroup">
          <span class="label">Назва спеціальності</span>

          <app-input
            name="Specialty name"
            :value="edited.name"
            @input="(val) => edited.name = val"
          ></app-input>
        </div>

        <div class="formgroup">
          <span class="label">Символ спеціальності</span>

          <app-input
            name="Symbol"
            :value="edited.symbol"
            @input="(val) => edited.symbol = val"
          ></app-input>
        </div>

        <app-select
          class="formgroup"
          placeholder="Відділення"
          :option="({ id, name }) => ({ label: name, value: id })"
          :options="departments"
          :defaultValue="department"
          @change="(val) => edited.departmentID = parseInt(val)"
        ></app-select>

        <div class="confirm-btns">
          <app-button class="btn btn-cancel" @click="isEditing = false">Скасувати</app-button>
          <app-button class="btn btn-save" @click="save">Зберегти</app-button>
        </div>
      </div>

      <div v-if="!isEditing">
        <div class="header" v-if="!isEditing">
          <span class="name">{{name}}</span>
          <font-awesome-icon
            icon="edit"
            class="edit"
            @click="switchEdit"
          ></font-awesome-icon>
        </div>

        <div class="study-time">
          Період навчання:

          <span v-if="studyYears">
            {{studyYears}} роки
          </span>

          <span v-if="!studyYears">
            -
          </span>
        </div>

        <div class="students-count">
          Кількість студентів: {{studentsCount}}
        </div>

        <div class="groups-list">
          <div
            class="study-year"
            v-for="({ groups }, index) in sortedGroups"
            v-bind:key="index"
          >
            <div
              class="group"
              v-for="({ name }, index) in groups"
              v-bind:key="index"
            >{{name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppInput from './AppInput.vue'
import AppSelect from './AppSelect.vue'
import AppButton from './AppButton.vue'

export default {
  name: 'AppSpecialtyItem',
  components: {
    AppInput,
    AppSelect,
    AppButton,
  },
  computed: {
    ...mapGetters({
      departments: 'departments/list',
    }),
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    groups: {
      type: Array,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    department: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      loadDepartments: 'departments/loadDepartments',
      loadDepartment: 'departments/loadDepartment',
      editSpecialty: 'specialty/edit',
    }),
    switchEdit() {
      this.loadDepartments()

      this.isEditing = true
    },
    save() {
      const { edited, id: specialtyID } = this

      this.editSpecialty({
        ...edited,
        specialtyID,
      }).then(() => {
        this.loadDepartment(this.$route.params.id)

        this.isEditing = false
      })
    },
  },
  data() {
    return {
      studyYears: '',
      studentsCount: 0,
      sortedGroups: [],
      isEditing: false,
      edited: {
        name: this.name,
        symbol: this.symbol,
        departmentID: this.department.id,
      },
    }
  },
  created() {
    this.groups.forEach((group, index) => {
      const { students, entry, graduation } = group

      const entryTime = new Date(entry)
      const entryYear = entryTime.getFullYear()

      if (index === 0) {
        this.studyYears = new Date(graduation).getFullYear() - entryYear
      }

      let exists = false

      this.sortedGroups.forEach(({ entryYear: year }, groupIndex) => {
        if (year === entryYear) {
          this.sortedGroups[groupIndex].groups.unshift(group)

          exists = true
        }
      })

      if (!exists) {
        this.sortedGroups.push({
          entryYear: entryTime.getFullYear(),
          groups: [group],
        })
      }

      this.studentsCount += students.length || 0
    })
  },
}
</script>

<style scoped lang="less">
.specialty-item {
  background: #1E2329;
  border-radius: 5px;

  display: flex;

  .line {
    width: 32px;
    height: 1fr;

    border-radius: 5px;

    background: #eaa941;
  }

  .info {
    width: 100%;
    padding: 20px;
  }

  .confirm-btns {
    display: flex;
    justify-content: flex-end;

    .btn {
      padding: 10px 15px;
      background: var(--color-bg-light);
      color: var(--color-font-main);
      margin-right: 10px;

      cursor: pointer;
    }

    .btn-save {
      background: #2afe8e;
    }

    .btn-cancel {
      background: #f76f40;
    }
  }

  .label {
    display: block;
    margin-bottom: 10px;
  }

  .formgroup {
    margin-bottom: 15px;
  }

  .header {
    display: flex;
    justify-content: space-between;

    .name {
      font-size: 1.3em;
      font-weight: 700;
    }

    .edit {
      color: #55636E;
      cursor: pointer;
    }
  }

  .study-time,
  .students-count,
  .name {
    margin-bottom: 10px;
  }

  .groups-list {
    display: flex;

    .study-year {
      margin-right: 20px;
    }

    .group {
      background: #EBAC2D;
      width: 50px;
      height: 50px;

      color: #fff;

      display: flex;
      justify-content: center;
      align-items: center;

      margin-bottom: 10px;
      padding: 5px;

      border-radius: 9px;
    }
  }
}
</style>
