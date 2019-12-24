<template>
  <div class="schedule-list">
    <div class="label">18 тижнів</div>

    <div class="list">
      <div class="day" v-for="i in 6" v-bind:key="i">
        <div class="title">Понеділок</div>

        <div class="classes">
          <div class="class">
            <span class="number">1</span>

            <app-select :options="[]"></app-select>
          </div>

          <div v-if="Math.random() > 0.5" class="class">
            <span class="number">2</span>

            <app-select :options="[]"></app-select>
          </div>

          <div class="add-class">
            <span class="icon">
              <font-awesome-icon icon="plus"></font-awesome-icon>
            </span>

            <span class="text">Добавити пару</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppSelect from '../AppSelect.vue'

export default {
  name: 'AppScheduleList',
  components: {
    AppSelect,
  },
}
</script>

<style lang="less" scoped>
.schedule-list {
  .label {
    color: #707070;
  }

  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;

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
