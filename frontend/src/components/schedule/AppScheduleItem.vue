<template>
  <div class="class-wrap">
    <app-schedule-single-class
      :data="classData"
      :showTeacher="showTeacher"
      :showGroup="showGroup"
      :showLocation="showLocation"
      v-if="classData.simpleClass"
    ></app-schedule-single-class>

    <div v-if="classData.numDenominatorClass">
      <div class="num-denom-wrap">
        <div class="order">{{classData.order}}</div>

        <div class="class-info">
          <div v-if="classData.num">
            <span class="type">Чисельник:</span>

            <app-schedule-single-class
              :data="classData.num"
              :showTeacher="showTeacher"
              :showGroup="showGroup"
              :showLocation="showLocation"
            ></app-schedule-single-class>
          </div>

          <div v-if="classData.denom">
            <span class="type">Знаменник:</span>

            <app-schedule-single-class
              :data="classData.denom"
              :showTeacher="showTeacher"
              :showGroup="showGroup"
              :showLocation="showLocation"
            ></app-schedule-single-class>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="classData.simpleSubgroupsClass"
      class="subgroups-wrap"
    >
      <div class="order">{{classData.order}}</div>

      <div>
        <span class="type">Підгрупи:</span>

        <div
          v-for="(subgroupClass, i) in classData.subgroups"
          v-bind:key="i"
        >
          <div class="subgroup-name">Підгрупа: {{subgroupClass.class.subgroup.name}}</div>

          <app-schedule-single-class
            :data="subgroupClass"
            :showTeacher="showTeacher"
            :showGroup="showGroup"
            :showLocation="showLocation"
          ></app-schedule-single-class>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppScheduleSingleClass from './AppScheduleSingleClass.vue'

export default {
  name: 'AppScheduleItem',
  components: {
    AppScheduleSingleClass,
  },
  props: {
    classData: {
      type: Object,
      required: true,
    },
    showGroup: {
      type: Boolean,
      default: () => true,
    },
    showTeacher: {
      type: Boolean,
      default: () => true,
    },
    showLocation: {
      type: Boolean,
      default: () => true,
    },
  },
}
</script>

<style lang="less">
.class-wrap {
  .order {
    display: flex;
    align-items: center;
    font-size: 1.2em;
    padding: 10px 15px;
    width: 40px;
    height: 1fr;

    background: #2243C7;
    border-radius: 5px;
  }

  .class {
    width: 100%;
    background: #1b2024;
    margin-bottom: 10px;
    color: #fff;
    border-radius: 5px;

    display: flex;
    align-items: top;

    .info {
      margin-left: 20px;
      font-size: 1.1em;

      width: 100%;

      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

      .icon-block,
      .name {
        display: inline-block;
        margin: 5px;
      }

      .icon-block {
        margin-right: 20px;

        &.cursor-pointer {
          cursor: pointer;
        }

        .icon {
          color: #2d373f;
          margin-right: 5px;
        }

        .text {
          color: #6f7274;
        }
      }
    }
  }

  .subgroup-name {
    color: #fff;
    margin: 10px 0 5px;
  }

  .num-denom-wrap,
  .subgroups-wrap {
    display: flex;

    .order {
      color: #fff;
      margin-right: 10px;
    }

    .type {
      color: var(--color-font-dark);
    }

    .info {
      margin-left: 10px;
    }
  }
}
</style>
