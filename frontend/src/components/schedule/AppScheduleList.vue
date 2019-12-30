<template>
  <div class="schedule-list">
    <div class="label">18 тижнів</div>

    <div class="list">
      <div
        class="day"
        v-for="(data, index) in group.schedule.list"
        v-bind:key="index"
      >
        <div class="title">{{days[data.day - 1]}}</div>

        <div class="classes">
          <div
            v-for="(classData, classIndex) in data.classes"
            v-bind:key="classIndex"
            class="info"
          >
            <div class="order">
              {{classData.order}}
            </div>

            <app-class-item
              :classData="classData"
            ></app-class-item>
          </div>

          <div class="add-class">
            <span class="icon">
              <font-awesome-icon icon="plus"></font-awesome-icon>
            </span>

            <span
              class="text"
              @click="setCreating(data.day)"
            >Добавити пару</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppClassItem from './AppClassItem.vue'

export default {
  name: 'AppScheduleList',
  data() {
    return {
      days: [
        'Понеділок',
        'Вівторок',
        'Середа',
        'Четвер',
        'П\'ятниця',
        'Субота',
        'Неділя',
      ],
    }
  },
  components: {
    AppClassItem,
  },
  computed: {
    ...mapGetters({
      group: 'group/group',
    }),
  },
  methods: {
    ...mapActions({
      setCreating: 'schedule/setCreating',
    }),
  },
}
</script>

<style lang="less" scoped>
.schedule-list {
  .label {
    color: #707070;
    margin-bottom: 10px;
  }

  .info {
    display: flex;
    align-items: top;
    justify-content: space-between;

    .order {
      font-size: 1.5em;
      color: var(--color-font-dark);
      padding: 0 10px;
    }
  }

  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;

    @media screen and (max-width: 1500px) {
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 10px;
    }

    @media screen and (max-width: 1000px) {
      grid-template-columns: 1fr;
    }

    .day {
      background: var(--color-bg-dark);
      border-radius: 5px;

      .title {
        text-align: center;
        padding: 10px;
        color: #fff;
        font-size: 1.1em;
        border-bottom: 1px solid #2C3339;
      }

      .classes {
        padding: 10px;

        .class {
          width: 100%;
          display: flex;

          .number {
            width: 50px;
            height: 50px;

            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;

            font-size: 1.3em;
          }
        }

        .add-class {
          display: flex;
          align-items: center;
          cursor: pointer;

          margin-top: 20px;
          color: var(--color-font-dark);

          .icon {
            width: 50px;
            height: 50px;

            display: flex;
            justify-content: center;
            align-items: center;

            padding: 10px;
          }

          .text {
            font-size: 1.1em;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
