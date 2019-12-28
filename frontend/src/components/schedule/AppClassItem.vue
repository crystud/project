<template>
  <div class="class">
    {{classData}}
  </div>
</template>

<script>
export default {
  name: 'AppClassItem',
  props: {
    classData: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.class {
  margin-bottom: 10px;
  background: #101215;
}
</style>
