<template>
  <div class="class">
    <span class="order">{{data.order}}</span>

    <div class="info">
      <span class="name">{{data.class ? data.class.subject.name : '-'}}</span>

      <div>
        <span v-if="showGroup" class="icon-block">
          <font-awesome-icon
            icon="users"
            class="icon"
          ></font-awesome-icon>

          <!-- <span class="text"></span> -->
        </span>

        <span
          v-if="showTeacher"
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
          >{{data.class.teacher.name | truncate(15) }}</span>
        </span>

        <span v-if="showLocation" class="icon-block">
          <font-awesome-icon
            icon="map-marker"
            class="icon"
          ></font-awesome-icon>

          <span class="text">{{data.room.name}}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppScheduleSingleClass',
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

<style>

</style>
