<template>
  <div class="subject" :class="coefficient > 0.5 ? 'high' : 'low'">
    <span>{{name}}</span>
  </div>
</template>

<script>
export default {
  name: 'AppTeacherSubject.vue',
  props: {
    name: {
      type: String,
      required: true,
    },
    coefficient: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.subject {
  background: #1b2024;
  margin-bottom: 12px;
  border-radius: 5px;
  color: #d3d4d4;
  padding: 15px 20px;
  border-left: 7px solid transparent;

  &.high {
    border-color: #375ee1;
  }

  &.low {
    border-color: #23c9cf;
  }
}
</style>
