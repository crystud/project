<template>
  <div>
    <div class="personal-info">
      <div class="user-basic-info">
        <div class="group-info">
          <span class="name">П-42</span>

          <div class="additional-info">
            <span>7 предметів</span>
            <span>8 вчителів</span>
          </div>
        </div>

        <button class="btn-edit" @click="$emit('onEdit')">
          <font-awesome-icon icon="edit"></font-awesome-icon>
        </button>
      </div>

      <div class="user-advanced-info">
        <div class="item">
          <font-awesome-icon icon="calendar-alt" class="icon"></font-awesome-icon>
          <span class="text">7 занять/тиждень</span>
        </div>

        <div class="item">
          <font-awesome-icon icon="user-tie" class="icon"></font-awesome-icon>
          <span class="text">Інженерія програмного забезпечення</span>
        </div>

        <div class="item">
          <font-awesome-icon icon="lightbulb" class="icon"></font-awesome-icon>
          <span class="text">Середній бал 3.43</span>
        </div>

        <div class="item">
          <font-awesome-icon icon="user-times" class="icon"></font-awesome-icon>
          <span class="text">Пропуски 132</span>
        </div>
      </div>

      <div class="students">
        <div class="student" v-for="i in 5" v-bind:key="i">
          <div class="image-wrap">
            <div class="image" :class="Math.random() > 0.5 ? 'good' : 'bad'"></div>
          </div>

          <div class="info">
            <div class="name">Безфамільна Анжеліка...</div>
            <div class="success-data">
              <span>Сер. бал 3.43</span>
              <span>Проп. 13</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppGroupInfo',
}
</script>

<style lang="less" scoped>
.personal-info {
  width: 350px;
  margin-right: 10px;

  background: var(--color-bg-dark);
  border-radius: 4px;

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
  }

  .students {
    border-top: 1px solid #272f37;
    padding: 25px 20px 10px;
    color: #2d3740;
    font-size: 1.1em;
    font-weight: 400;

    .student {
      display: flex;
      align-items: center;

      margin-bottom: 25px;

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
