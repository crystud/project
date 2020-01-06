<template>
  <div class="item" @click="$emit('click')">
    <div
      class="border"
      :style="`background: ${borderColor}`"
    ></div>

    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppListItem.vue',
  props: {
    borderColor: {
      type: String,
      required: false,
      default: () => '#23c9cf',
    },
  },
}
</script>

<style lang="less" scoped>
.item {
  position: relative;
  background: #1e2329;
  border-radius: 8px;
  color: #fff;

  .border {
    position: absolute;
    top: 0;
    left: 0;

    width: 8px;
    height: 100%;

    background: transparent;

    border-radius: 8px;
    transition: all .3s;
  }

  .content {
    display: flex;
    align-items: center;
    padding: 15px;
    padding-left: 18px;
  }
}
</style>
