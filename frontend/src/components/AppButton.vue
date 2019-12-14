<template>
<button @click="$emit('click')" class="app-button">
  <slot></slot>
</button>
</template>

<script>
export default {
  name: 'AppButton',
}
</script>

<style lang="less" scoped>
.app-button {
  border-radius: 8px;
  border: none;
  outline: none;
  padding: 19px 90px;
  font-weight: 500;
  font-size: 20px;
}
</style>
