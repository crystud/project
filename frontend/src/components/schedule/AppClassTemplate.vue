<template>
  <div class="info">
    <span class="name">{{data.class ? data.class.subject.name : '-'}}</span>

    <div>
      <span
        v-if="showGroup"
        class="icon-block cursor-pointer"
        @click="$router.push(`/group/${data.class.group.id}`)"
      >
        <font-awesome-icon
          icon="users"
          class="icon"
        ></font-awesome-icon>

        <!-- <span class="text">{{data.class.group}}</span> -->
      </span>

      <span
        v-if="showTeacher && data.class.teacher"
        @click="$router.push(`/teacher/${data.class.teacher.id}`)"
        class="icon-block cursor-pointer"
      >
        <font-awesome-icon
          icon="user"
          class="icon"
        ></font-awesome-icon>

        <span
          class="text"
          :title="data.class.teacher.name"
        >{{data.class.teacher.name | truncate(25) }}</span>
      </span>

      <span
        v-if="showLocation"
        class="icon-block"
      >
        <font-awesome-icon
          icon="map-marker"
          class="icon"
        ></font-awesome-icon>

        <span class="text">{{data.room.name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppClassTemplate.vue',
  props: {
    data: {
      type: Object,
      required: true,
    },
    showGroup: Boolean,
    showLocation: Boolean,
    showTeacher: Boolean,
  },
}
</script>

<style>

</style>
