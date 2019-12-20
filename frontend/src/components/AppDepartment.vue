<template>
  <div class="manage-department">
    <app-card class="pagename">123</app-card>

    <app-card class="content">
      <div class="header">
        <button class="btn-back" @click="$router.push({ name: 'departments' })">
          <font-awesome-icon icon="angle-left"></font-awesome-icon>
        </button>

        <div class="header-info">
          <div class="name">{{department.name}}</div>
          <div class="leader">{{department.leader ? department.leader.name : ''}}</div>
        </div>

        <div class="specialtys-count">
          Кількість спеціальностей: {{department.specialtys ? department.specialtys.length : ''}}
        </div>
      </div>
    </app-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppCard from './AppCard.vue'

export default {
  name: 'Department',
  components: {
    AppCard,
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
      padding: 10px 15px;
      font-size: 1.2em;
      cursor: pointer;

      background: #EBAC2D;
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
}
</style>
