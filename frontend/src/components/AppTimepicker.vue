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
        :option="({ value }) => ({
          label: value,
          value,
        })"
        :options="hours.list"
        @change="
          (hour) => {
            hours.selected = hour
            sendValue()
          }
        "
        :defaultValue="{ value: hours.default }"
      ></app-select>

      <app-select
        placeholder="Хвилина"
        class="select"
        :option="({ value }) => ({
          label: value,
          value,
        })"
        :options="minutes.list"
        @change="
          (minute) => {
            minutes.selected = minute
            sendValue()
          }
        "
        :defaultValue="{ value: minutes.default }"
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
      required: false,
    },
    default: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      hours: {
        selected: 0,
        default: null,
        list: [],
      },
      minutes: {
        selected: 0,
        default: null,
        list: [],
      },
    }
  },
  watch: {
    default() {
      const { default: defaultValue } = this

      if (!defaultValue) {
        this.minutes.default = null
        this.hours.default = null

        return
      }

      const [hours, minutes] = defaultValue.split(':')

      this.hours.default = hours
      this.minutes.default = minutes
    },
  },
  methods: {
    sendValue() {
      const {
        hours: {
          selected: hour,
          default: defaultHour,
        },
        minutes: {
          selected: minute,
          default: defaultMinute,
        },
      } = this

      this.$emit('change', {
        hour: hour || defaultHour,
        minute: minute || defaultMinute,
      })
    },
  },
  created() {
    for (let i = 0; i < 24; i += 1) {
      const hour = i

      this.hours.list.push({
        value: hour < 10 ? `0${hour}` : `${hour}`,
      })
    }

    for (let i = 0; i < 60; i += 1) {
      const minute = i

      this.minutes.list.push({
        value: minute < 10 ? `0${minute}` : `${minute}`,
      })
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
