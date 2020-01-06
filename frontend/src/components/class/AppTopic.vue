<template>
  <div class="topic">
    <div class="date">
      <div class="day">{{date}}</div>
      <div class="hours" style="opacity: .1">2 години</div>
    </div>

    <div class="info" :class="!isPassed ? 'active-topic' : ''">
      <div>
        <div class="name">
          Тема: {{lesson.topic}}
        </div>

        <div class="homework">
          Домашнє завдання: {{lesson.home_work}}
        </div>
      </div>

      <div class="actions">
        <font-awesome-icon
          icon="edit"
          class="icon edit"
          @click="$emit('edit', lesson)"
        ></font-awesome-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppTopic.vue',
  data() {
    return {
      date: '',
      isPassed: false,
    }
  },
  props: {
    lesson: {
      type: Object,
      required: true,
    },
  },
  watch: {
    lesson() {
      this.calculateDate()
    },
  },
  methods: {
    calculateDate() {
      const { date } = this.lesson

      const dateTime = new Date(date)
      const currentTime = new Date()

      if (currentTime > dateTime) {
        this.isPassed = true
      }

      if (!dateTime) {
        this.date = 'Invalid date'

        return
      }

      const day = dateTime.getDate()
      const month = dateTime.getMonth() + 1

      this.date = `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}`
    },
  },
  created() {
    this.calculateDate()
  },
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
      justify-content: flex-end;

      .edit { color: var(--color-font-dark) }

      .icon {
        cursor: pointer;
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
