<template>
<app-screen>
  <div class="sidebar">
    <div class="header">
      <font-awesome-icon icon="bars" />
    </div>

    <div class="user">
      <div class="avatar"></div>

      <div class="name">{{ name }}</div>
    </div>

    <div class="roles">
      <div
          v-for="(role, index) in roles"
          :key="index"
          class="role"
          :class="[`role-${role}`]"
      >{{ localization.role[role] }}</div>
    </div>

    <div v-if="this.roles.includes('student') && studentStatistics" class="stats">
      <div class="item">
        <div class="icon">
          <font-awesome-icon icon="chart-line" />
        </div>
        <div class="status">
          <font-awesome-icon icon="check" />
        </div>

        <div class="value">
          <div class="number">{{studentStatistics.avgMark}}</div>
          <div class="title">Рейтинг</div>
        </div>
      </div>

      <div class="line"></div>

      <div class="item">
        <div class="icon">
          <font-awesome-icon icon="home" />
        </div>
        <div class="status">
          <font-awesome-icon icon="times" />
        </div>

        <div class="value">
          <div class="number">
            {{ studentStatistics.studentWasMissing }}
          </div>

          <div class="title">Пропусків</div>
        </div>
      </div>
    </div>

    <div class="menu">
      <app-home-link role="user" link="home">Домівка користувача</app-home-link>
      <app-home-link role="student" link="homeStudent">Домівка студента</app-home-link>
      <app-home-link role="teacher" link="homeTeacher">Домівка вчителя</app-home-link>
      <app-home-link role="admin" link="departments">Структура коледжу</app-home-link>
      <app-home-link role="admin" link="users">Користувачі</app-home-link>
      <app-home-link role="admin" link="teachers">Вчителі</app-home-link>
      <app-home-link role="admin" link="subjects">Предмети</app-home-link>
      <app-home-link role="admin" link="commissions">Комісії</app-home-link>
    </div>
  </div>

  <router-view class="content"></router-view>
</app-screen>
</template>

<script>
import { mapGetters } from 'vuex'

import AppScreen from '../components/AppScreen.vue'
import AppHomeLink from '../components/AppHomeLink.vue'

export default {
  name: 'Home.vue',
  data() {
    return {
      localization: {
        role: {
          user: 'Користувач',
          student: 'Студент',
          admin: 'Адміністратор',
          teacher: 'Викладач',
        },
      },
    }
  },
  computed: {
    ...mapGetters({
      name: 'profile/name',
      email: 'profile/email',
      address: 'profile/address',
      roles: 'profile/roles',
      studentStatistics: 'student/monthStatistics',
    }),
  },
  methods: {

  },
  components: {
    AppScreen,
    AppHomeLink,
  },
}
</script>

<style lang="less" scoped>
.app-screen {
  display: grid;

  grid-template-rows: 1fr;
  grid-template-columns: 360px 1fr;
  grid-template-areas: 'name .';

  .sidebar {
    grid-area: name;
    background: var(--color-bg-dark);

    .header {
      height: 15px;
      margin-top: 20px;
      color: var(--color-font-gray);
      margin-left: 20px;
      font-size: 24px;
    }

    .user {
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .avatar {
        height: 130px;
        width: 130px;
        background: var(--color-bg-main);
        border-radius: 50%;
      }

      .name {
        margin-top: 20px;
        color: var(--color-font-main);
        font-size: 17px;
        font-weight: 600;
      }
    }

    .roles {
      display: flex;
      justify-content: center;
      margin-top: 7px;

      .role {
        margin: 0 8px;
        font-size: 17px;
      }

      .role-user {
        color: var(--color-accent-green);
      }

      .role-student {
        color: var(--color-accent-orange);
      }

      .role-teacher {
        color: var(--color-accent-red);
      }

      .role-admin {
        color: var(--color-accent-orange);
      }
    }

    .stats {
      display: flex;
      margin-top: 25px;
      justify-content: space-between;
      align-items: center;
      padding: 0 45px;

      .item {
        display: flex;
        align-items: center;

        .icon {
          height: 18px;
          width: 18px;
          color: var(--color-font-gray);
        }

        .status {
          margin-left: 5px;
          color: var(--color-accent-orange);
        }

        .value {
          margin-left: 7px;

          .number {
            color: var(--color-font-main);
            font-size: 16px;
            text-align: center;
          }

          .title {
            color: var(--color-font-gray);
            font-size: 14px;
          }
        }
      }

      .line {
        height: 45px;
        width: 1px;
        background: var(--color-font-gray);
      }
    }

    .menu {
      margin-top: 20px;
    }
  }

  .content {
    padding: 20px 45px;
  }
}
</style>
