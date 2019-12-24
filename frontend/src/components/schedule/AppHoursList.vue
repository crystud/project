<template>
  <div class="hours-list">
    <div class="hour" v-for="i in 6" v-bind:key="i">
      <div class="preview">
        <div class="wrap">
          <div class="value">120</div>
          <div class="label">годин</div>
        </div>
      </div>

      <div class="info">
        <div class="name">Чисельні методи</div>
        <div class="teacher">Юрочко О. М.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHoursList',
}
</script>

<style lang="less" scoped>
.hours-list {
  background: var(--color-bg-dark);
  padding: 10px;
  color: #fff;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 15px;

  .hour {
    display: flex;
    align-items: center;
    margin: 15px 0;

    border-radius: 5px;
    background: #1E2329;

    &.danger {
      .preview {
        border: 1px solid #CF2323;

        .value {
          color: #CF2323;
        }
      }
    }

    &.success {
      .preview {
        border: 1px solid #00FF90;

        .value {
          color: #00FF90;
        }
      }
    }

    .preview {
      display: flex;
      justify-content: center;
      align-items: center;

      background: #131314;
      border-radius: 5px;

      height: 80px;
      width: 80px;

      padding: 0 15px;

      .label {
        color: #55636E;
      }

      .value {
        font-size: 1.5em;
        font-weight: bold;
      }
    }

    .info {
      padding: 5px 40px 5px 20px;

      .name {
        font-size: 1.1em;
        color: #fff;
      }

      .teacher {
        margin-top: 5px;
        font-size: .9em;
        color: #55636E;
      }
    }
  }
}
</style>
