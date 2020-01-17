<template>
  <div>
    <div class="personal-info">
      <div class="user-basic-info">
        <div class="profile-image">
          <div
            class="edit"
            @click="$emit('onEdit')"
            v-show="false"
          >
            <font-awesome-icon icon="edit"></font-awesome-icon>
          </div>
        </div>

        <div class="user-name">
          {{name}}
        </div>

        <div class="user-email">
          {{email}}
        </div>

        <div class="user-role">
          Студент
        </div>
      </div>

      <div class="user-advanced-info">
        <div
          class="item cursor-pointer"
          @click="$router.push(`/group/${groupID}`)"
        >
          <font-awesome-icon icon="users" class="icon"></font-awesome-icon>
          <span class="text">Група: {{groupName}}</span>
        </div>

        <div
          v-if="
            semesterStatistics.current
            && $route.params.studentID === semesterStatistics.studentID
          "
          class="item"
        >
          <font-awesome-icon icon="lightbulb" class="icon"></font-awesome-icon>
          <span class="text">Сер. бал: {{
            semesterStatistics.current.avg !== 0 ?
              semesterStatistics.current.avg.toFixed(4) : '-'
            }}</span>
        </div>

        <div class="item">
          <font-awesome-icon icon="user-tie" class="icon"></font-awesome-icon>
          <span class="text">Спеціальність: {{specialty}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppTeacherPersonalInfo',
  computed: {
    ...mapGetters({
      semesterStatistics: 'student/semesterStatistics',
    }),
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    groupName: {
      type: String,
      required: true,
    },
    groupID: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.personal-info {
  background: var(--color-bg-dark);
  border-radius: 4px;

  .cursor-pointer {
    cursor: pointer;
  }

  .user-basic-info {
    width: 100%;

    display: flex;
    justify-content: center;
    flex-direction: column;

    border-bottom: 1px solid #272f37;
    padding-bottom: 40px;

    text-align: center;

    .profile-image {
      width: 150px;
      height: 150px;
      background: #1e2329;
      border-radius: 50%;

      position: relative;

      margin: 40px auto 20px;

      .edit {
        position: absolute;
        bottom: 0;
        right: 0;

        display: flex;
        justify-content: center;
        align-items: center;
        color: #5a6f84;
        cursor: pointer;

        width: 40px;
        height: 40px;
        background: #1e2329;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.16);
        border-radius: 50%;
      }
    }

    .user-name {
      color: #c8c9ca;
      font-size: 1.4em;
      padding: 0 20px;
    }

    .user-email {
      color: #2f3942;
      margin: 10px 0 5px;
    }

    .user-role {
      color: #f97035;
    }
  }

  .user-advanced-info {
    padding: 25px 10px;
    color: #2d3740;
    font-size: 1.1em;
    font-weight: 400;

    .item {
      display: flex;
      align-items: center;

      margin-bottom: 15px;

      .icon {
        margin-right: 10px;
        font-size: 1.4em;

        width: 50px;
      }
    }
  }
}
</style>
