<template>
  <app-card class="datepicker">
    <div class="options-wrap">
      <div class="icon-side">
        <span class="icon month-icon" @click="moveMonth(-1)">
          <font-awesome-icon icon="angle-left"></font-awesome-icon>
        </span>

        <span class="icon" @click="moveYear(-1)">
          <font-awesome-icon icon="angle-double-left"></font-awesome-icon>
        </span>
      </div>

      <div class="options">
        <div class="option year">
          <span class="value">
            {{date.getFullYear()}}
          </span>
        </div>

        <div class="option month">
          <span class="value">
            {{months[date.getMonth()]}}
          </span>
        </div>
      </div>

      <div class="icon-side">
        <span class="icon" @click="moveYear(1)">
          <font-awesome-icon icon="angle-double-right"></font-awesome-icon>
        </span>

        <span class="icon month-icon" @click="moveMonth(1)">
          <font-awesome-icon icon="angle-right"></font-awesome-icon>
        </span>
      </div>
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
        :class="evaluateClasses(i - daysOffset)"
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
import AppCard from './AppCard.vue'

export default {
  name: 'AppDatepicker',
  props: {
    highlighthedDates: {
      type: Array,
      required: false,
      default: () => [],
    },
    borderedDays: {
      type: Array,
      required: false,
      default: () => [],
    },
    activeDates: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      minDate: new Date(),
      daysInMonth: 0,
      daysOffset: 0,
      selected: 0,
      date: new Date(),
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
    moveYear(side) {
      const currentMonth = this.date.getMonth()
      const currentYear = this.date.getFullYear()
      const currentDate = this.date.getDate()

      this.date = new Date(currentYear + side, currentMonth, currentDate)
      this.calculate()
    },
    moveMonth(side) {
      const currentMonth = this.date.getMonth()
      const currentYear = this.date.getFullYear()
      const currentDate = this.date.getDate()

      this.date = new Date(currentYear, currentMonth + side, currentDate)
      this.calculate()
    },
    evaluateClasses(date) {
      const {
        highlighthedDates,
        borderedDays,
        activeDates,
        date: currentDateObj,
        selected,
        minDate,
      } = this

      const currentMonth = currentDateObj.getMonth()
      const currentYear = currentDateObj.getFullYear()
      const currentTimeObj = new Date()

      const currentSelectedTime = `${currentYear}/${currentMonth + 1}/${date}`
      const currentTime = `${currentTimeObj.getFullYear()}/${currentTimeObj.getMonth() + 1}/${currentTimeObj.getDate()}`

      const classes = [
        (currentSelectedTime === currentTime ? 'green-day' : ''),
      ]

      const currentTimeString = `${currentYear}/${currentMonth + 1}/${date}`

      if (date <= 0) {
        return [...classes, 'unactive']
      }

      if (minDate.getTime() > new Date(currentYear, currentMonth, date).getTime()) {
        return [...classes, 'disabled']
      }

      if (activeDates.length && !activeDates.includes(currentSelectedTime)) {
        return [...classes, 'disabled']
      }

      return [
        ...classes,
        (selected === date ? 'selected' : ''),
        (highlighthedDates.includes(currentTimeString) ? 'gray-day' : ''),
        (borderedDays.includes(currentTimeString) ? 'bordered-day' : ''),
      ]
    },
    selectDate(dateNumber) {
      const {
        currentYear,
        currentMonth,
        months,
        days,
        minDate,
      } = this

      const currentTimestamp = new Date(
        currentYear,
        currentMonth,
        dateNumber,
      ).getTime()

      if (minDate.getTime() >= currentTimestamp) {
        return
      }

      if (this.selected === dateNumber) {
        this.selected = 0

        this.$emit('change', {
          iso: '',
          normalTime: '',
        })

        return
      }

      const month = (currentMonth + 1) < 10 ? `0${currentMonth + 1}` : currentMonth
      const dayValue = (dateNumber + 1) < 10 ? `0${dateNumber}` : dateNumber

      const dateString = `${currentYear}-${month}-${dayValue}`
      const date = new Date(currentYear, currentMonth + 1, dateNumber)

      this.selected = dateNumber

      this.$emit('change', {
        iso: dateString,
        normalTime: `${dateNumber} ${months[currentMonth]}, ${days[date.getDay()][0]}, ${currentYear}`,
      })
    },
    calculate() {
      const { date: currentDate } = this

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
  .options-wrap {
    &, .icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .icon-side {
      display: flex;
      align-items: center;
      margin: 0 30px;
      user-select: none;
    }

    .icon {
      margin: 0 10px;
      font-size: 1.45em;
      background: var(--color-bg-dark);
      border-radius: 50%;

      width: 50px;
      height: 50px;

      color: #fff;
      cursor: pointer;

      transform: scale(1);
      transition: all .15s;

      &.month-icon {
        width: 40px;
        height: 40px;
      }

      &:hover {
        transform: scale(1.1);
      }
    }

    .option {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 10px;

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
  }

  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-row-gap: 20px;
    padding: 10px 40px;

    .day, .header {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      padding: 20px;

      width: 50px;
      height: 50px;
      margin: 0 auto;

      &.bordered-day {
        border: 3px solid #3b42a2;
      }

      &.green-day {
        border: 2px solid #00ff87;
      }

      &.gray-day {
        background: #1e2329;
      }
    }

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

      &.unactive {
        opacity: 0;
        visibility: hidden;
      }

      transition: all .3s;
    }
  }

  .header {
    color: #15191c;
    font-weight: 400;
  }
}
</style>
