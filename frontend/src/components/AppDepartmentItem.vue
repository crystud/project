<template>
  <div class="department" @click="$router.push(`/departments/${id}`)">
    <div class="name">{{name}}</div>
    <div :to="`/teacher/${leader.id}`" class="leader-name">{{leader.name}}</div>

    <div class="specialtys-count">Кількість спеціальностей: {{specialtysCount}}</div>
  </div>
</template>

<script>
export default {
  name: 'DepartmentItem',
  props: {
    name: {
      type: String,
      required: true,
    },
    leader: {
      type: Object,
      required: true,
    },
    specialtysCount: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="less">
.department {
  padding: 25px;
  background: #1E2329;
  border-radius: 8px;

  cursor: pointer;

  display: grid;
  grid-template-rows: 1fr 1fr 3fr;

  .name {
    font-size: 1.2em;
    font-weight: 700;
    display: block;
  }

  .leader-name {
    display: block;
    font-weight: 300;
  }

  .specialtys-count {
    display: flex;
    align-items: flex-end;
  }
}
</style>
