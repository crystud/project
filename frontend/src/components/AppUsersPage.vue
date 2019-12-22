<template>
  <div class="users">
    <app-card class="header">
      Користувачі
    </app-card>

    <app-card class="content">
       <div v-if="!usersList.list.length" class="no-result">
        <span>Користувачів не знайдено...</span>
      </div>

      <div class="list">
        <app-users-item
          v-for="({ id, name, address, email }, index) in usersList.list"
          v-bind:key="index"
          :userID="id"
          :name="name"
          :address="address"
          :email="email"
          @updated="updateUsers"
        ></app-users-item>
      </div>

      <div v-if="usersList.hasNextPage" class="load-more">
        <button class="btn-load-more" @click="loadMore">Загрузити ще...</button>
      </div>
    </app-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppCard from './AppCard.vue'
import AppUsersItem from './AppUsersItem.vue'

export default {
  name: 'UsersPage',
  components: {
    AppUsersItem,
    AppCard,
  },
  computed: {
    ...mapGetters({
      usersList: 'users/usersList',
    }),
  },
  methods: {
    ...mapActions({
      loadUsers: 'users/loadUsers',
    }),
    updateUsers() {
      const { loadUsers, currentPage } = this

      loadUsers(currentPage)
    },
    loadMore() {
      this.currentPage += 1

      this.loadUsers(this.currentPage)
    },
  },
  data() {
    return {
      currentPage: 0,
    }
  },
  created() {
    this.loadUsers(this.currentPage)
  },
}
</script>

<style scoped lang="less">
.users {
  max-height: 100%;
  overflow: auto;

  h1 {
    font-size: 1.5em;
    color: #fff;
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

  .app-card {
    margin-bottom: 10px;
    color: #fff;
  }

  .header {
    display: inline-block;
    font-size: 1.3em;
    padding: 10px;
  }

  .content {
    padding: 10px 20px;
  }

  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 5px 15px;

    margin-top: 20px;
  }

  .load-more {
    display: flex;
    justify-content: center;

    margin-top: 10px;

    .btn-load-more {
      padding: 10px 15px;
      background: #EBAC2D;
      color: #fff;
      font-size: 1em;
      font-weight: bold;
      border: 0;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>
