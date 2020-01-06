<template>
  <div>
    <div class="student-name">
      {{student.name}} / 02.12.2020
    </div>

    <div class="scoring-system">5-ти бальна система оцінювання</div>

    <div class="mark-input">
      <span class="label">Оцінка</span>

      <app-input
        name="Оцінка"
        class="mark-field"
        @input="(val) => data.mark = val"
      ></app-input>
    </div>

    <div class="footer">
      <div class="is-missing">
        <div>
          <app-checkbox
            :checked="data.isMissing"
            @change="(val) => data.isMissing = val"
          ></app-checkbox>
        </div>

        <div class="text">
          Відсутній / нб
        </div>
      </div>

      <app-button
        :isOkay="true"
        class="submit-btn"
      >Поставити оцінку</app-button>
    </div>
  </div>
</template>

<script>
import AppInput from '../AppInput.vue'
import AppCheckbox from '../AppCheckbox.vue'
import AppButton from '../AppButtonCustom.vue'

export default {
  name: 'AppMarkSet.vue',
  components: {
    AppInput,
    AppCheckbox,
    AppButton,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    student: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
}
</script>

<style lang="less" scoped>
.student-name {
  color: #fff;
  font-size: 1.15em;
}

.submit-btn {
  padding: 10px 15px;
}

.scoring-system {
  color: var(--color-font-dark);
  margin-bottom: 10px;
}

.mark-input {
  display: flex;
  align-items: center;

  .mark-field {
    width: 150px;
    margin-left: 20px;
  }
}

.footer {
  margin-top: 20px;

  &, .is-missing {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }


  .text {
    margin-left: 10px;
  }
}
</style>
