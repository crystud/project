<template>
  <div>
    <div
      v-if="!data.subgroups"
      class="class"
    >
      <span
        class="order"
        v-if="data.order"
      >{{data.order}}</span>

      <app-class-template
        :showGroup="showGroup"
        :showTeacher="showTeacher"
        :showLocation="showLocation"
        :data="data.class ? data : { class: data }"
      ></app-class-template>
    </div>

    <div
      v-else-if="data.subgroups"
      class="class"
    >
      <span
        class="order"
        v-if="data.order"
      >{{data.order}}</span>

      <div class="subgroup-body">
        <span class="type">Підгрупи:</span>

        <div
          v-for="(subgroup, i) in data.subgroups"
          v-bind:key="i"
        >
          <div class="subgroup-name">
            Підгрупа: {{subgroup.class.subgroup ? subgroup.class.subgroup.name : ''}}
          </div>

          <app-class-template
            :showGroup="showGroup"
            :showTeacher="showTeacher"
            :showLocation="showLocation"
            :data="subgroup"
          ></app-class-template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppClassTemplate from './AppClassTemplate.vue'

export default {
  name: 'AppScheduleSingleClass',
  components: {
    AppClassTemplate,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    showGroup: {
      type: Boolean,
      required: true,
    },
    showTeacher: {
      type: Boolean,
      required: true,
    },
    showLocation: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style scoped>
.subgroup-body {
  padding: 5px 10px;
}
</style>
