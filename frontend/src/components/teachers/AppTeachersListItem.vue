<template>
  <div class="teacher" @click="$router.push(`/teacher/${id}`)">
    <div class="profile-image">
      <div class="image"></div>
    </div>

    <div class="info">
      <div class="name">{{name}}</div>
      <div class="email">{{email}}</div>
      <div class="address">{{address}}</div>
      <div class="role">Вчитель</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppTeachersListItem',
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="less">
.teacher {
  background: var(--color-bg-dark);
  border-radius: 8px;
  border-left: 10px solid #0f8dea;
  padding: 20px;

  cursor: pointer;

  display: flex;
  justify-content: left;
  align-items: center;

  .image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: var(--color-bg-light);
  }

  .info {
    margin-left: 20px;

    .name {
      color: #838384;
      font-size: 1.2em;
      margin-bottom: 5px;
    }

    .address, .email {
      color: #2d3740;
    }

    .role {
      margin-top: 10px;
      color: #0f8dea;
    }
  }
}
</style>
