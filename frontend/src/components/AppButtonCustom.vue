<template>
  <button
    class="btn"
    :class="isOkay ? 'btn-change' : 'btn-cancel'"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'AppBusttonCustom',
  props: {
    isOkay: {
      type: Boolean,
      default: () => true,
    },
  },
}
</script>

<style lang="less" scoped>
.btn {
  padding: 12px 25px;
  border-radius: 4px;
  border: 0;
  font-size: 1em;
  color: #fff;
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);

  &.btn-change {
    background: #3242d5;
  }

  &.btn-cancel {
    background: #c72929;
  }
}
</style>
