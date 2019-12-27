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
  width: 100%;
  min-height: 100%;
  background: var(--color-bg-main);
}
</style>
