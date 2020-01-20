<template>
  <div class="user">
    <div class="profile-image">
      <div class="image"></div>
    </div>

    <div class="info">
      <div class="name">{{name}}</div>
      <div class="email">{{email}}</div>
      <div class="address">{{address}}</div>

      <div class="accept-btns">
        <button class="btn btn-teacher" @click="switchTeacherCreating">Вчитель...</button>
        <button class="btn btn-student" @click="switchStudentCreating">Студент...</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppUsersItem',
  methods: {
    async switchTeacherCreating() {
      const {
        name,
        address,
        email,
        userID,
      } = this

      this.$emit('creatingTeacher', {
        name,
        address,
        email,
        userID,
      })
    },
    switchStudentCreating() {
      const {
        name,
        address,
        email,
        userID,
      } = this

      this.$emit('creatingStudent', {
        name,
        address,
        email,
        userID,
      })
    },
  },
  props: {
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
    userID: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style scoped lang="less">
.user {
  background: var(--color-bg-dark);
  padding: 20px;

  max-width: 450px;

  margin-bottom: 10px;

  display: flex;
  justify-content: left;
  align-items: center;

  border-radius: 8px;
  border-left: 10px solid #0f8dea;

  .image {
    width: 100px;
    height: 100px;
    background: var(--color-bg-light);
    border-radius: 50%;
  }

  .info {
    margin-left: 20px;
    width: 100%;

    .btn {
      padding: 10px;
      margin-right: 5px;

      border-radius: 5px;
      border: 0;

      color: #fff;
      cursor: pointer;

      font-size: 1em;
    }

    .btn-teacher {
      background: #0f8dea;
    }

    .btn-student {
      background: #f97035;
    }

    .name {
      font-size: 1.3em;
      color: #919191;
      margin-bottom: 5px;
    }

    .address, .email {
      color: #2d3740;
      margin-bottom: 5px;;
    }
  }
}
</style>
