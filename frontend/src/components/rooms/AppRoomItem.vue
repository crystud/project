<template>
  <div
    class="room"
    @click="$emit('click')"
  >
    <div class="name">{{room.name}}</div>
    <div class="floor">{{room.floor}} поверх</div>
  </div>
</template>

<script>
export default {
  name: 'AppRoomItem.vue',
  props: {
    room: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.room {
  cursor: pointer;
  padding: 10px;
  padding-left: 20px;

  position: relative;

  border-radius: 8px;
  background: rgba(0, 0, 0, .2);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;

    width: 10px;
    height: 100%;

    background: #3B42A2;
    border-radius: 8px;
  }

  .name {
    font-size: 1.35em;
  }

  .floor {
    color: var(--color-font-dark);
  }
}
</style>
