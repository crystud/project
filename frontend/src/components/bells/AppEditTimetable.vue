<template>
  <app-modal-window :show="show" @close="$emit('cancel')">
    <div slot="header">Редагування дзвінка</div>

    <div slot="content">
      <app-input
        type="number"
        name="Порядок"
        @input="newOrder => order = newOrder"
      ></app-input>

      <app-timepicker placeholder="Початок"></app-timepicker>
      <app-timepicker placeholder="Кінець"></app-timepicker>

      <div class="btns">
        <app-button
          :isOkay="false"
          class="btn"
          @click="$emit('cancel')"
        >Скасувати</app-button>

        <app-button
          :isOkay="true"
          class="btn"
          @click="$emit('cancel')"
        >Зберегти</app-button>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import AppModalWindow from '../AppModalWindow.vue'
import AppInput from '../AppInput.vue'
import AppButton from '../AppButtonCustom.vue'
import AppTimepicker from '../AppTimepicker.vue'

export default {
  name: 'AppEditTimetable.vue',
  components: {
    AppModalWindow,
    AppTimepicker,
    AppInput,
    AppButton,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    timetable: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      order: this.timetable.order,
    }
  },
}
</script>

<style lang="less" scoped>
.btns {
  display: flex;
  justify-content: flex-end;

  .btn {
    margin-left: 10px;
  }
}
</style>
