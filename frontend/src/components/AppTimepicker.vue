<template>
  <div class="timepicker">
    <div
      v-if="placeholder"
      class="placeholder"
    >
      {{placeholder}}
    </div>

    <div class="selection">
      <app-select
        placeholder="Година"
        class="select"
        :option="option => ({
          label: option,
          value: option,
        })"
        :options="hours.list"
        @change="
          (hour) => {
            hours.selected = hour
            sendValue()
          }
        "
      ></app-select>

      <app-select
        placeholder="Хвилина"
        class="select"
        :option="option => ({
          label: option,
          value: option,
        })"
        :options="minutes.list"
        @change="
          (minute) => {
            minutes.selected = minute
            sendValue()
          }
        "
      ></app-select>
    </div>
  </div>
</template>

<script>
import AppSelect from './AppSelect.vue'

export default {
  name: 'AppTimepicker.vue',
  components: {
    AppSelect,
  },
  props: {
    placeholder: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      hours: {
        selected: null,
        list: [],
      },
      minutes: {
        selected: null,
        list: [],
      },
    }
  },
  methods: {
    sendValue() {
      const {
        hours: { selected: hour },
        minutes: { selected: minute },
      } = this

      this.$emit('change', { hour, minute })
    },
  },
  created() {
    for (let i = 0; i < 24; i += 1) {
      const hour = i

      this.hours.list.push(hour < 10 ? `0${hour}` : hour)
    }

    for (let i = 0; i < 60; i += 1) {
      const minute = i

      this.minutes.list.push(minute < 10 ? `0${minute}` : minute)
    }
  },
}
</script>

<style lang="less" scoped>
.timepicker {
  margin: 10px 0;

  .placeholder {
    color: var(--color-font-dark);
  }

  .selection {
    display: flex;
    margin: 5px 0;
    padding: 10px 10px 15px;
    background: #0c0f10;
    border-radius: 8px;

    .select {
      margin: 0 10px;
    }
  }
}
</style>
