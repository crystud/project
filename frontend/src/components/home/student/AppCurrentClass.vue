<template>
  <div class="current-class">
    <div>
      <div class="class-header">
        <div>
          <div class="name">Чисельні методи</div>
          <div class="teacher">Юрочко Ольга Михайлівна</div>
        </div>

        <div class="rating">
          <div class="icons">
            <font-awesome-icon
              icon="chart-line"
              class="icon"
            ></font-awesome-icon>

            <font-awesome-icon
              icon="check"
              class="icon check mg"
            ></font-awesome-icon>
          </div>

          <div class="value">
            <div class="text">3.437</div>
            <div class="label">Рейтинг</div>
          </div>
        </div>
      </div>

      <div class="lesson info-label">
        Тема: Дуже собі складні обчислення з елементами дифур і вищого маташу
      </div>

      <div class="marks">
        <span class="info-label">Ваші оцінки з даного предмету:</span>

        <div class="list">
          <span
            v-for="i in 7"
            v-bind:key="i"

            class="mark"
          >{{Math.round(Math.random() * 5)}}</span>
        </div>
      </div>
    </div>

    <div class="timings">
      <div class="labels">
        <span>Початок: 11:50</span>
        <span>До закінчення: 00:34</span>
        <span>Кінець: 13:20</span>
      </div>

      <div class="progress">
        <div class="bar"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppCurrentClass.vue',
}
</script>

<style lang="less" scoped>
.current-class {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .class-header {
    font-weight: 200;

    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 40px;

    .name {
      font-size: 1.4em;
    }

    .teacher {
      color: var(--color-font-dark);
    }

    .rating {
      display: flex;
      align-items: center;

      .icons {
        display: flex;
        align-items: center;

        .icon {
          color: var(--color-font-dark);

          &.mg {
            margin: 0 20px 0 5px;
            color: #F97135;
          }

          &.check {
            font-size: .7em;
          }
        }
      }

      .value {
        text-align: center;

        .label {
          color: var(--color-font-dark);
        }

        .text {
          color: #fff;
        }
      }
    }
  }

  .info-header {
    color: #F5F5F5;
  }

  .lesson {
    margin-bottom: 40px;
  }

  .marks {
    display: flex;

    .list {
      display: flex;
      margin-left: 20px;

      .mark {
        margin-right: 7.5px;
      }
    }
  }

  .timings {
    .labels {
      display: flex;
      justify-content: space-between;

      color: #F5F5F5;
      font-weight: 100;
    }

    .progress {
      margin-top: 10px;

      width: 100%;
      height: 5px;
      background: #fff;
      border-radius: 5px;
      overflow: hidden;

      .bar {
        width: 30%;
        height: 100%;

        background: #00FF87;
      }
    }
  }
}
</style>
