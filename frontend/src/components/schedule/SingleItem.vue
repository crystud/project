<template>
  <div class="class" @click="setEditingItem()">
    <div class="order-number">
      <span class="value">
        {{data.timetable.order}}
      </span>
    </div>

    <span class="short-data">
      {{data.class.subject.name}},
      {{data.class.teacher.name}},
      {{data.room.name}}
      <span
        v-if="data.class.subgroup"
        class="subgroup-name"
      >({{data.class.subgroup.name}})</span>
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SingleItem.vue',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      setEditing: 'schedule/setEditingItem',
    }),
    setEditingItem() {
      this.setEditing(this.data)
    },
  },
}
</script>

<style lang="less" scoped>
.class {
  padding: 10px;
  color: #fff;
  display: flex;
  align-items: center;
  border: 1px solid var(--color-font-dark);
  border-radius: 5px;
  cursor: pointer;

  .order-number {
    display: flex;
    align-items: center;
    margin-right: 10px;

    .value {
      font-size: 1.35em;
      padding: 0 5px;
    }
  }

  .subgroup-name {
    color: var(--color-font-dark);
  }

  .label {
    display: block;
    margin-bottom: 5px;

    .icon, .title {
      margin-right: 5px;
    }
  }
}
</style>
