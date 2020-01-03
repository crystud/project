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
          <app-button :isOkay="false" @click="isEditing = false">Скасувати</app-button>
          <app-button @click="save">Зберегти</app-button>
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
                v-for="({ name, id: groupID }, index) in groups"
                v-bind:key="index"
                @click="$router.push(`/group/${groupID}`)"
              >{{name}}</div>
          </div>

          <div
            class="group"
            @click="openCreate"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
          </div>
        </div>
      </div>
    </div>

    <app-modal-window :show="isCreating" @close="isCreating = false">
      <div slot="header">
        Створення групи
      </div>

      <div slot="content">
        <span class="edit-title">Редагування групи</span>

        <app-input
          name="Номер групи"
          type="number"
          class="form-input"
          @input="(val) => number = val"
        ></app-input>

        <app-datepicker
          placeholder="Дата початку навчання"
          class="form-input"
          @change="(val) => entry = val"
        ></app-datepicker>

        <app-datepicker
          placeholder="Дата закінчення навчання"
          class="form-input"
          @change="(val) => graduation = val"
        ></app-datepicker>

        <app-select
          class="form-input"
          placeholder="Спеціальність"
          :options="specialtys"
          :option="({ id: value, name: label }) => ({ label, value })"
          :defaultValue="{ id }"
          @change="(val) => specialtyID = val"
        ></app-select>

        <div class="submit-btns">
          <app-button
            :isOkay="false"
            class="btn"
            @click="isCreating = false"
          >Скасувати</app-button>

          <app-button
            class="btn"
            @click="createGroup"
          >Створити групу</app-button>
        </div>
      </div>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppInput from './AppInput.vue'
import AppSelect from './AppSelect.vue'
import AppButton from './AppButtonCustom.vue'
import AppDatepicker from './AppDatepickerCustom.vue'
import AppModalWindow from './AppModalWindow.vue'

export default {
  name: 'AppSpecialtyItem',
  components: {
    AppInput,
    AppSelect,
    AppButton,
    AppModalWindow,
    AppDatepicker,
  },
  computed: {
    ...mapGetters({
      departments: 'departments/list',
      specialtys: 'specialty/specialtys',
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
  watch: {
    groups() {
      this.calculateData()
    },
  },
  methods: {
    ...mapActions({
      loadDepartments: 'departments/loadDepartments',
      loadDepartment: 'departments/loadDepartment',
      editSpecialty: 'specialty/edit',
      loadSpecialtys: 'specialty/loadSpecialtys',
      createGroupAction: 'group/create',
    }),
    createGroup() {
      const {
        number,
        entry,
        graduation,
        specialtyID,
      } = this

      if (!number || new Date(entry) >= new Date(graduation) || !specialtyID) {
        return false
      }

      this.createGroupAction({
        number,
        entry,
        graduation,
        specialtyID,
      }).then(() => {
        this.loadDepartment(this.$route.params.id)

        this.isCreating = false
      })

      return true
    },
    switchEdit() {
      this.loadDepartments()

      this.isEditing = true
    },
    openCreate() {
      this.loadSpecialtys(this.department.id)
      this.isCreating = true
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
    calculateData() {
      this.sortedGroups = []
      this.studentsCount = 0

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
  },
  data() {
    return {
      studyYears: '',
      studentsCount: 0,
      sortedGroups: [],
      isEditing: false,
      isCreating: false,
      number: '',
      entry: '',
      graduation: '',
      specialtyID: this.id,
      edited: {
        name: this.name,
        symbol: this.symbol,
        departmentID: this.department.id,
      },
    }
  },
  created() {
    this.calculateData()
  },
}
</script>

<style scoped lang="less">
.specialty-item {
  background: #1E2329;
  border-radius: 5px;

  display: flex;

  .form-input {
    margin-bottom: 20px;
  }

  .submit-btns {
    .btn {
      margin-right: 10px;
    }
  }

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
      margin-left: 10px;
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
      min-width: 50px;
      height: 50px;

      color: #fff;
      cursor: pointer;

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
