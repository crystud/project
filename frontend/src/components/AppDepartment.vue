<template>
  <div class="manage-department">
    <app-card class="pagename">Department</app-card>

    <app-card class="content">
      <div class="header">
        <button class="btn-back" @click="$router.push({ name: 'departments' })">
          <font-awesome-icon icon="angle-left"></font-awesome-icon>
        </button>

        <div class="header-info">
          <div class="name">{{department.name}}</div>
          <router-link
            :to="`/teacher/${department.leader ? department.leader.id : ''}`"
            class="leader"
          >
            {{department.leader ? department.leader.name : ''}}
          </router-link>
        </div>

        <div class="specialtys-count">
          Кількість спеціальностей: {{department.specialtys ? department.specialtys.length : ''}}
        </div>
      </div>

      <div class="specialtys-list" v-if="department && department.specialtys">
        <app-specialty-item
          v-for="({ id, name, groups, symbol }) in department.specialtys"
          v-bind:key="name"
          :name="name"
          :symbol="symbol"
          :department="department"
          :groups="groups"
          :id="id"
        ></app-specialty-item>

        <app-create-specialty
          :departmentName="department.name"
          :departmentID="department.id"
        ></app-create-specialty>
      </div>
    </app-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppSpecialtyItem from './AppSpecialtyItem.vue'
import AppCard from './AppCard.vue'
import AppCreateSpecialty from './AppCreateSpecialty.vue'

export default {
  name: 'Department',
  components: {
    AppCard,
    AppSpecialtyItem,
    AppCreateSpecialty,
  },
  computed: {
    ...mapGetters({
      department: 'departments/department',
    }),
  },
  methods: {
    ...mapActions({
      loadDepartment: 'departments/loadDepartment',
    }),
  },
  created() {
    this.loadDepartment(this.$route.params.id)
  },
}
</script>

<style lang="less" scoped>
.manage-department {
  width: 100%;
  display: block;

  .pagename {
    margin-bottom: 10px;
    display: inline-block;
  }

  .app-card {
    padding: 20px;
    color: #fff;
  }

  .specialtys-count {
    width: 100%;

    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 15px;
  }

  .header {
    padding: 0;

    width: 100%;
    display: flex;

    background: #1E2329;
    border-radius: 8px;

    .btn-back {
      padding: 0 15px;
      font-size: 1.5em;

      cursor: pointer;

      background: #EBAC2D;
      color: #fff;

      border: 0;
      border-radius: 8px;
    }

    .header-info {
      padding: 10px;

      .name {
        width: 300px;
        margin-bottom: 5px;
        font-weight: 700;
      }

      .leader {
        font-weight: 300;
      }
    }
  }

  .specialtys-list {
    margin-top: 10px;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: minmax(220px, auto);
    grid-gap: 20px;

    margin-top: 30px;
  }
}
</style>
