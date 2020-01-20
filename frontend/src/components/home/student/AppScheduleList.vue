<template>
  <div class="schedule-list">
    <div
      class="item"

      v-for="i in 4"
      v-bind:key="i"
    >
      <div class="class">
        <div
          class="circle"
          :class="{
            'not-active': Math.random() > 0.5,
          }"
        ></div>

        <div class="info">
          <div class="name">Чисельні методи</div>
          <div class="teacher">
            Юрочко Ольга Михайлівна
          </div>
        </div>
      </div>

      <div
        class="transition"
        :class="{
          'passed': Math.random() > 0.5,
        }"
        v-if="i < 4"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppScheduleList.vue',
}
</script>

<style lang="less" scoped>
.schedule-list {
  margin-bottom: 30px;

  .item {
    width: 100%;
    font-weight: 200;

    .class {
      display: flex;
      align-items: center;

      .circle {
        width: 47px;
        height: 47px;
        background: #00FF87;
        border-radius: 50%;
        flex-shrink: 0;

        margin-right: 15px;
        position: relative;

        &::before {
          content: "";

          width: 57px;
          height: 57px;

          position: absolute;
          top: -5px;
          left: -5px;

          border: 1px solid #00FF87;
          border-radius: 50%;
        }

        &.not-active {
          background: #404A54;

          &::before {
            border-color: #404A54;
          }
        }

        .current-class {
          background: #404A54;
        }
      }

      .info {
        height: 47px;

        .name {
          font-size: 1.2em;
        }

        .teacher {
          color: var(--color-font-dark);
        }
      }
    }

    .transition {
      width: 47px;
      min-height: 58px;
      margin: 5px 0;
      position: relative;

      &::before {
        content: "";

        width: 1px;
        height: 100%;

        background: #404A54;

        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        margin: auto;
      }

      &.passed {
        &::before {
          background: #00FF87;
        }
      }
    }
  }
}
</style>
