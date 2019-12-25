<template>
  <div>
     <!-- <div class="day">
            <div class="list-label title">Вівторок</div>

            <div class="class" v-for="i in 4" v-bind:key="i">
              <span class="order">1</span>

              <div class="options-list">
                <div class="option">
                  <div class="list-label options-label">Чисельник</div>

                  <div class="info no-padding">
                    <span class="name">Name</span>

                    <div>
                      <span class="icon-block">
                        <font-awesome-icon
                          icon="users"
                          class="icon"
                        ></font-awesome-icon>

                        <span class="text">П-42</span>
                      </span>

                      <span class="icon-block">
                        <font-awesome-icon
                          icon="map-marker"
                          class="icon"
                        ></font-awesome-icon>

                        <span class="text">128</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div class="option">
                  <div class="list-label options-label">Знаменник</div>

                  <div class="info no-padding">
                    <span class="name">Name</span>

                    <div>
                      <span class="icon-block">
                        <font-awesome-icon
                          icon="users"
                          class="icon"
                        ></font-awesome-icon>

                        <span class="text">П-42</span>
                      </span>

                      <span class="icon-block">
                        <font-awesome-icon
                          icon="map-marker"
                          class="icon"
                        ></font-awesome-icon>

                        <span class="text">128</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->

    <app-schedule-single-class
      :data="classData"
      :showTeacher="showTeacher"
      :showGroup="showGroup"
      :showLocation="showLocation"
      v-if="classData.simpleClass"
    ></app-schedule-single-class>
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

  .order {
    display: flex;
    align-items: center;
    font-size: 1.2em;
    padding: 10px 15px;
    width: 40px;

    background: #07cc70;
    border-radius: 5px;
  }
}
</style>
