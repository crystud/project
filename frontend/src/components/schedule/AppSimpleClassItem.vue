<template>
  <div class="class">
    <div v-if="!data.id && !data.subgroups">
      Invalid data provided
    </div>

    <div v-if="data.id || data.subgroups">
      <div v-if="data.id">
        <app-single-item :data="data"></app-single-item>
      </div>

      <div v-if="data.subgroups">
        <span class="title">Підгрупи:</span>

        <div
          v-for="(classData, index) in data.subgroups"
          v-bind:key="index"
          class="subgroups-list"
        >
          <app-single-item :data="classData"></app-single-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppSingleItem from './SingleItem.vue'

export default {
  name: 'AppSimpleClassItem.vue',
  components: {
    AppSingleItem,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.class {
  .title {
    display: block;
    font-size: 0.95em;
    color: var(--color-font-dark);
    margin-bottom: 5px;
  }
}
</style>
