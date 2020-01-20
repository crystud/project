<template>
  <div>
    <div class="personal-info">
      <div class="user-basic-info">
        <div class="group-info">
          <span class="name">{{name}}</span>

          <div class="additional-info">
            <span v-if="group.classes">Предметів - {{group.classes.length}}</span>
            <span v-show="false">8 вчителів</span>
          </div>
        </div>

        <button class="btn-edit" @click="$emit('onEdit')">
          <font-awesome-icon icon="edit"></font-awesome-icon>
        </button>
      </div>

      <div class="user-advanced-info">
        <div class="item" v-show="false">
          <font-awesome-icon icon="calendar-alt" class="icon"></font-awesome-icon>
          <span class="text">7 занять/тиждень</span>
        </div>

        <div class="item">
          <font-awesome-icon icon="user-tie" class="icon"></font-awesome-icon>
          <span class="text">{{specialty}}</span>
        </div>

        <template v-if="statistics.groupAVG !== undefined">
          <div class="item">
            <font-awesome-icon icon="lightbulb" class="icon"></font-awesome-icon>
            <span class="text">Середній бал {{statistics.groupAVG || '-'}}</span>
          </div>

          <div class="item">
            <font-awesome-icon icon="user-times" class="icon"></font-awesome-icon>
            <span class="text">Пропуски {{statistics.groupMissingsCount}}</span>
          </div>

          <div class="item">
            <font-awesome-icon icon="marker" class="icon"></font-awesome-icon>
            <span class="text">К-сть оцінок {{statistics.marksCount}}</span>
          </div>
        </template>
      </div>

      <div class="students">
        <div class="item no-students" v-if="!students.length">
          <font-awesome-icon icon="user-times" class="icon"></font-awesome-icon>
          <span class="text">В групі немає студентів...</span>
        </div>

        <div
          v-for="(data, i) in (statistics.students || students)"
          v-bind:key="i"
          class="student"
          @click="$router.push(`/student/${data.id}`)"
        >
          <div class="image-wrap">
            <div class="image good"></div>
          </div>

          <div class="info">
            <div class="name">{{data.name}}</div>
            <div class="success-data">
              <span
                v-if="data.marks !== undefined"
              >
                Сер. бал {{data.avg ? data.avg.toFixed(3) : '-'}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppGroupInfo',
  computed: {
    ...mapGetters({
      group: 'group/group',
      statistics: 'group/statistics',
    }),
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    students: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.personal-info {
  background: var(--color-bg-dark);
  border-radius: 4px;

  .no-students {
    margin-bottom: 15px;
  }

  .user-basic-info {
    width: 100%;

    display: flex;
    justify-content: space-between;
    flex-direction: row;

    padding: 20px;

    border-bottom: 1px solid #272f37;

    text-align: center;

    .group-info {
      display: flex;

      .name {
        font-size: 2em;
        color: #fff;
        text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);
      }

      .additional-info {
        text-align: left;
        margin-left: 20px;
        color: #5a6f84;

        span {
          display: block;
        }
      }
    }

    .btn-edit {
      width: 40px;
      height: 40px;

      border: 0;
      border-radius: 50%;
      background: #1e2329;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);

      outline: none;

      color: #5a6f84;
      cursor: pointer;
    }
  }

  .user-advanced-info {
    padding: 25px 10px 10px;
    color: #2d3740;
    font-size: 1.1em;
    font-weight: 400;
  }

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

  .students {
    border-top: 1px solid #272f37;
    padding: 25px 20px 10px;
    color: #2d3740;
    font-size: 1.1em;
    font-weight: 400;

    display: grid;
    grid-template-columns: 1fr;

    @media screen and (min-width: 1500px) {
      grid-template-columns: repeat(2, 1fr);
    }

    .student {
      display: flex;
      align-items: center;

      margin-bottom: 25px;
      cursor: pointer;

      .image {
        width: 60px;
        height: 60px;
        background: var(--color-bg-light);
        border-radius: 50%;
        margin-right: 15px;

        position: relative;

        &::before {
          content: "";

          position: absolute;
          left: -5px;
          top: -5px;

          display: block;
          border: 2px solid #000;

          width: 70px;
          height: 70px;
          border-radius: 50%;
        }

        &.bad::before {
          border-color: #d53232;
        }

        &.good::before {
          border-color: #32d558;
        }
      }

      .info {
        .name {
          color: #fff;
          margin-bottom: 5px;
        }

        .success-data {
          span {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
