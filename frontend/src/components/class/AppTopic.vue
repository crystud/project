<template>
  <div class="topic">
    <div class="date">
      <div class="day">21/11</div>
      <div class="hours">2 години</div>
    </div>

    <div class="info" :class="Math.random() > 0.5 ? 'active-topic' : ''">
      <div>
        <div class="name">
          Тема: бло бло бло бло
        </div>

        <div class="homework">
          Домашнє завдання: бла бла бла бла
        </div>
      </div>

      <div class="actions">
        <font-awesome-icon
          icon="edit"
          class="icon edit"
        ></font-awesome-icon>

        <font-awesome-icon
          icon="trash"
          class="icon trash"
        ></font-awesome-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppTopic.vue',
}
</script>

<style lang="less" scoped>
.topic {
  display: grid;
  grid-template-columns: 90px 1fr;
  grid-gap: 20px;
  align-items: center;
  margin-bottom: 40px;

  .date {
    text-align: center;

    .hours {
      color: var(--color-font-dark);
    }
  }

  .info {
    display: grid;
    grid-template-columns: 1fr 60px;
    align-items: top;

    position: relative;

    background: var(--color-bg-light);
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.35);
    border-radius: 8px;

    padding: 15px;

    &.active-topic {
      padding-left: 25px;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;

        width: 10px;
        height: 100%;

        background: #3b42a2;
        border-radius: 10px;
      }
    }

    .actions {
      display: flex;

      .icon {
        margin-left: 10px;

        &.trash { color: #f44 }
        &.edit { color: var(--color-font-dark) }
      }
    }

    .name {
      font-weight: bold;
    }

    .homework {
      margin-top: 10px;
      color: var(--color-font-dark);
    }
  }
}
</style>
