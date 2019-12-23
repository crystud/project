<template>
  <app-card class="datepicker">
    <div class="option year">
      <span class="icon">
        <font-awesome-icon icon="angle-left"></font-awesome-icon>
      </span>

      <span class="value">
        {{currentYear}}
      </span>

      <span class="icon">
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
      </span>
    </div>

    <div class="option month">
      <span class="icon">
        <font-awesome-icon icon="angle-left"></font-awesome-icon>
      </span>

      <span class="value">
        {{months[currentMonth]}}
      </span>

      <span class="icon">
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
      </span>
    </div>

    <div class="calendar">
      <div
        v-for="(day) in days"
        v-bind:key="day[0]"
        class="header"
      >{{day[1]}}</div>

      <div
        v-for="i in (daysInMonth + daysOffset)"
        v-bind:key="i - daysOffset"
        class="day"
        :class="
          [
            (currentDate === (i - daysOffset) ? 'green-day' : ''),
            (selected === (i - daysOffset) ? 'selected' : ''),
            (
              dates.includes(`${currentYear}/${currentMonth + 1}/${i - daysOffset}`)
              ? 'gray-day' : ''),
            (minDate.getTime() > new Date(currentYear, currentMonth, i - daysOffset).getTime()
              ? 'disabled' : ''),
          ]
        "
        @click="() => selectDate(i - daysOffset)"
      >
        <span v-if="i > daysOffset">
          {{i - daysOffset}}
        </span>
      </div>
    </div>
  </app-card>
</template>

<script>
import { mapGetters } from 'vuex'

import AppCard from './AppCard.vue'

export default {
  name: 'AppDatepicker',
  computed: {
    ...mapGetters({
      dates: 'shortenedDays/dates',
    }),
  },
  data() {
    return {
      currentMonth: 4,
      currentDate: 15,
      minDate: new Date(),
      currentYear: 0,
      daysInMonth: 0,
      daysOffset: 0,
      selected: 0,
      months: [
        'Січень',
        'Лютий',
        'Березень',
        'Квітень',
        'Травень',
        'Червень',
        'Липень',
        'Серпень',
        'Вересень',
        'Жовтень',
        'Листопад',
        'Грудень',
      ],
      days: [
        ['Неділя', 'нд'],
        ['Понеділок', 'пн'],
        ['Вівторок', 'вт'],
        ['Середа', 'ср'],
        ['Четвер', 'чт'],
        ['П\'ятниця', 'пт'],
        ['Субота', 'сб'],
      ],
    }
  },
  methods: {
    selectDate(dateNumber) {
      const {
        currentYear,
        currentMonth,
        months,
        days,
        minDate,
        daysOffset,
      } = this

      const currentTimestamp = new Date(
        currentYear,
        currentMonth,
        dateNumber - daysOffset,
      ).getTime()

      if (minDate.getTime() >= currentTimestamp) {
        return
      }

      if (this.selected === dateNumber) {
        this.selected = 0

        return
      }

      const dateString = `${currentYear}-${currentMonth + 1}-${dateNumber}`
      const date = new Date(currentYear, currentMonth + 1, dateNumber)

      this.selected = dateNumber

      this.$emit('change', {
        iso: dateString,
        normalTime: `${dateNumber} ${months[currentMonth]}, ${days[date.getDay()][0]}, ${currentYear}`,
      })
    },
    calculate() {
      const currentDate = new Date()

      this.currentMonth = currentDate.getMonth()
      this.currentYear = currentDate.getFullYear()
      this.currentDate = currentDate.getDate()

      const date = new Date(this.currentYear, this.currentMonth + 1, 0)

      this.daysInMonth = date.getDate()

      date.setDate(1)

      this.daysOffset = date.getDay()
    },
  },
  components: {
    AppCard,
  },
  created() {
    this.calculate()
  },
}
</script>

<style lang="less" scoped>
.datepicker {
  .option {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;

    .icon {
      font-size: 1.5em;
      color: #15191c;
      display: none;
    }

    .value {
      margin: 0 20px;
    }

    &.month .value {
      font-size: 1.3em;
    }

    &.year .value {
      font-size: 1.7em;
    }
  }

  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-row-gap: 20px;
    padding: 10px 40px;

    .day {
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, 0.3);
      }

      &.selected {
        background: #375ee1;
      }

      &.disabled {
        opacity: .3;
        cursor: default;
      }

      transition: all .3s;
    }

    .day, .header {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      padding: 20px;

      width: 50px;
      height: 50px;
      margin: 0 auto;

      &.green-day {
        border: 2px solid #00ff87;
      }

      &.gray-day {
        background: #1e2329;
      }
    }
  }

  .header {
    color: #15191c;
    font-weight: 400;
  }
}
</style>
