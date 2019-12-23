<template>
  <app-card class="list">
    <div class="future-days">
      <div class="day" v-for="i in 5" v-bind:key="i">
        <div class="date-label">
          21.01.2020
        </div>

        <div class="block">
          <div class="reason">
            ПрЕчина ПрЕчина ПрЕчина ПрЕчина
          </div>

          <div class="edit">
            <font-awesome-icon icon="edit" class="action edit"></font-awesome-icon>
            <font-awesome-icon icon="trash" class="action trash"></font-awesome-icon>
          </div>
        </div>
      </div>
    </div>

    <div class="past-days">
      <div class="day" v-for="i in 5" v-bind:key="i">
        <div class="date-label">
          6.01.0001
        </div>

        <div class="block">
          <div class="reason">
            Маленький Ісусик, не спить, не дрімає. Його просто мама рождає
          </div>
        </div>
      </div>
    </div>
  </app-card>
</template>

<script>
import AppCard from '../AppCard.vue'

export default {
  name: 'AppShortenedDaysList',
  components: {
    AppCard,
  },
}
</script>

<style lang="less" scoped>
.list {
  .future-days {
    padding: 0 30px;

    .day {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;

      .date-label {
        font-size: 1.2em;
        margin-right: 40px;
      }

      .block {
        background: var(--color-bg-dark);
        border-left: 8px solid #00ff87;
        padding: 15px;
        border-radius: 7px;
        width: 400px;

        display: flex;
        justify-content: space-between;

        .edit {
          margin-left: 20px;

          .action {
            margin-left: 15px;
            cursor: pointer;

            &.edit {
              color: #55636e;
            }

            &.trash {
              color: #df2c2c;
            }
          }
        }
      }
    }
  }

  .past-days {
    padding: 20px 30px 0;
    border-top: 1px solid #1e2329;

    .day {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;

      .date-label {
        font-size: 1.2em;
        margin-right: 40px;
      }

      .block {
        width: 400px;
        background: #1e2329;
        padding: 15px;
        border-radius: 7px;
      }
    }
  }
}
</style>
