<template>
  <div class="users">
    <h1>Користувачі</h1>

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
      <button class="btn-load-more">Загрузити ще...</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppUsersItem from './AppUsersItem.vue'

export default {
  name: 'UsersPage',
  components: {
    AppUsersItem,
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
