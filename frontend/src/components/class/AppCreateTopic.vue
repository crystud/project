<template>
  <div class="create">
    <app-datepicker
      @change="updateDate"
    ></app-datepicker>

    <div class="date">Дата: {{date.normalTime}}</div>

    <div class="text-field">
      <div class="title">Тема</div>

      <textarea
        class="field"
        placeholder="Тема..."
      ></textarea>
    </div>

    <div class="text-field">
      <div class="title">Домашнє завдання</div>

      <textarea
        class="field"
        placeholder="Тема..."
      ></textarea>
    </div>

    <div class="submit-btn">
      <app-button
        :isOkay="true"
      >Створити тему</app-button>
    </div>
  </div>
</template>

<script>
import AppDatepicker from '../AppDatepicker.vue'
import AppButton from '../AppButtonCustom.vue'

export default {
  name: 'AppCreateTopic.vue',
  components: {
    AppDatepicker,
    AppButton,
  },
  data() {
    return {
      date: {
        iso: '',
        normalTime: '',
      },
    }
  },
  methods: {
    updateDate(date) {
      this.date = date
    },
  },
}
</script>

<style lang="less">
.create {
  background: var(--color-bg-dark);
  border-radius: 8px;
  color: #fff;
  padding: 10px;

  .datepicker {
    background: transparent;
    margin: 20px 70px;

    .header {
      color: #fff !important;
    }
  }

  .date {
    padding: 0 40px;
    margin-bottom: 15px;
    color: var(--color-font-dark);
  }

  .text-field {
    margin-bottom: 15px;
    padding: 0 40px;

    .placeholder {
      margin-bottom: 5px;
    }

    .field {
      width: 100%;
      height: 150px;
      padding: 15px;
      margin-top: 10px;

      border: 0;
      background: #1E2329;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, .15);
      border-radius: 5px;
      color: var(--color-font-dark);

      font: 1em 'Exo 2', 'Lato';
      resize: none;
    }
  }

  .submit-btn {
    display: flex;
    justify-content: flex-end;
    padding: 0 40px 20px;
  }
}
</style>
