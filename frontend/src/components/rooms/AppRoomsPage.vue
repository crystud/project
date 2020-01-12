<template>
  <div class="app-rooms-page">
    <div class="header">
      <app-card>Аудиторії</app-card>

      <span
        class="add"
        @click="isCreating = true"
      >
        <font-awesome-icon
          icon="plus"
          class="icon"
        ></font-awesome-icon>
      </span>
    </div>

    <div class="rooms">
      <app-room-item
        v-for="(room) in rooms"
        v-bind:key="room.id"
        :room="room"
        @click="
          editing.inProgress = true
          editing.room = room
        "
      ></app-room-item>
    </div>

    <app-create-room
      :show="isCreating"
      @cancel="isCreating = false"
      @done="
        isCreating = false
        load()
      "
    ></app-create-room>

    <app-edit-room
      :show="editing.inProgress"
      :room="editing.room"
      @cancel="
        editing = {
          inProgress: false,
          room: {},
        }
      "
      @done="
        editing = {
          inProgress: false,
          room: {},
        }

        load()
      "
    ></app-edit-room>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppCard from '../AppCard.vue'

import AppRoomItem from './AppRoomItem.vue'
import AppEditRoom from './AppEditRoom.vue'
import AppCreateRoom from './AppCreateRoom.vue'

export default {
  name: 'AppRoomsPage.vue',
  components: {
    AppCard,
    AppRoomItem,
    AppCreateRoom,
    AppEditRoom,
  },
  computed: {
    ...mapGetters({
      rooms: 'rooms/list',
    }),
  },
  data() {
    return {
      isCreating: false,
      editing: {
        inProgress: false,
        room: {},
      },
    }
  },
  methods: {
    ...mapActions({
      load: 'rooms/fetch',
    }),
  },
  created() {
    this.load()
  },
}
</script>

<style lang="less" scoped>
.app-rooms-page {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .app-card {
      display: inline-block;
      padding: 15px;
      color: #fff;
      font-size: 1.1em;
    }

    .add {
      width: 40px;
      height: 40px;

      border-radius: 50%;
      display: flex;

      cursor: pointer;

      background: var(--color-bg-dark);
      color: var(--color-font-dark);

      &:hover { color: #fff }

      .icon { margin: auto }
    }
  }

  .rooms {
    margin-top: 10px;
    padding: 20px;
    background: var(--color-bg-dark);
    border-radius: 8px;
    color: #fff;

    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;

    @media screen and (max-width: 1150px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media screen and (max-width: 950px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (max-width: 850px) {
      grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 750px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
