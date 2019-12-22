<template>
  <div class="teachers">
    <app-card class="header">Вчителі</app-card>

    <app-card>
      <div class="filters">
        <app-select
          class="select"
          placeholder="Комісія"
          :options="commissions"
          :option="({ id, name }) => ({ label: name, value: id })"
          @change="loadTeachers"
        ></app-select>
      </div>

      <div v-if="!teachers.length" class="no-result">
        <span v-if="!currentCommissionID">Оберіть комісію...</span>
        <span v-if="!teachers.length && currentCommissionID">Вчителів не знайдено...</span>
      </div>

      <div class="content">
        <app-teachers-list-item
          v-for="({ id, name, user: { address, email } }, index) in teachers"
          v-bind:key="index"
          :id="id"
          :name="name"
          :address="address"
          :email="email"
        ></app-teachers-list-item>
      </div>
    </app-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import store from '@/store/'

import AppCard from '@/components/AppCard.vue'
import AppSelect from '@/components/AppSelect.vue'
import AppTeachersListItem from '@/components/teachers/AppTeachersListItem.vue'

export default {
  name: 'AppTeachersPage',
  methods: {
    ...mapActions({
      loadCommissions: 'commissions/loadCommissions',
      loadTeachersAction: 'teachers/loadTeachers',
    }),
    loadTeachers(commissionID) {
      this.loadTeachersAction(commissionID)
    },
  },
  data() {
    return {
      currentCommissionID: 0,
    }
  },
  computed: {
    ...mapGetters({
      commissions: 'commissions/list',
      teachers: 'teachers/teachers',
    }),
  },
  components: {
    AppCard,
    AppSelect,
    AppTeachersListItem,
  },
  created() {
    store.commit('teachers/setTeachers', [])
    this.loadCommissions()
  },
}
</script>

<style scoped lang="less">
.teachers {
  max-height: 100%;
  overflow: auto;

  .app-card {
    margin-bottom: 10px;
    color: #fff;
  }

  .header {
    display: inline-block;
    font-size: 1.3em;
    padding: 10px;
  }

  .filters {
    padding: 20px;
    background: #15191c;
    border-radius: 8px;

    .select {
      max-width: 200px;
      color: #526069;
    }
  }

  .no-result {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    height: 180px;
    font-weight: 100;

    color: var(--color-font-dark);
  }

  .content {
    padding: 20px;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px 20px;
  }
}
</style>
