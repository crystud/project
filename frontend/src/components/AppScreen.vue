<template>
<div class="app-screen">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'AppScreen',
}
</script>

<style lang="less" scoped>
.app-screen {
  height: 100%;
  width: 100%;
  background: var(--color-bg-main);
}
</style>
