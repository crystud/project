<template>
  <div class="specialty-item">
    <div class="line"></div>

    <div class="info">
      <div v-if="isCreating">
        <div class="formgroup">
          <span class="label">Назва спеціальності</span>

          <app-input
            name="Назва спеціальності"
            :value="name"
            @input="(val) => name = val"
          ></app-input>
        </div>

        <div class="formgroup">
          <span class="label">Символ спеціальності</span>

          <app-input
            name="Символ спеціальності"
            :value="symbol"
            @input="(val) => symbol = val"
          ></app-input>
        </div>

        <div class="formgroup label">
          Відділення: {{departmentName}}
        </div>

        <div class="confirm-btns">
          <app-button class="btn btn-cancel" @click="isCreating = false">Скасувати</app-button>
          <app-button class="btn btn-save" @click="create">Створити</app-button>
        </div>
      </div>

      <div v-if="!isCreating" @click="isCreating = true" class="create-specialty-label">
        <font-awesome-icon icon="plus"></font-awesome-icon>
        <span class="text">Створити нову спеціальність</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppInput from './AppInput.vue'
import AppButton from './AppButton.vue'

export default {
  name: 'AppSpecialtyItem',
  components: {
    AppInput,
    AppButton,
  },
  props: {
    departmentName: {
      type: String,
      required: true,
    },
    departmentID: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      createSpecialty: 'specialty/create',
    }),
    create() {
      const {
        name,
        symbol,
        departmentID,
      } = this

      this.createSpecialty({
        name,
        symbol,
        departmentID,
      }).then(() => {
        this.isCreating = false
      })
    },
  },
  data() {
    return {
      name: '',
      entry: '',
      graduation: '',
      symbol: '',
      isCreating: false,
    }
  },
}
</script>

<style scoped lang="less">
.specialty-item {
  background: #1E2329;
  border-radius: 5px;

  display: flex;

  .create-specialty-label {
    display: flex;

    justify-content: center;
    align-items: center;

    flex-direction: column;
    height: 100%;

    font-size: 1.3em;

    cursor: pointer;
    color: var(--color-font-gray);

    .text {
      margin-top: 10px;
    }
  }

  .line {
    width: 32px;
    height: 1fr;

    border-radius: 5px;

    background: #eaa941;
  }

  .info {
    width: 100%;
    padding: 20px;
  }

  .confirm-btns {
    display: flex;
    justify-content: center;

    .btn {
      padding: 10px 15px;
      background: var(--color-bg-light);
      color: var(--color-font-main);
      margin-right: 10px;

      cursor: pointer;
    }

    .btn-save {
      background: #2afe8e;
    }

    .btn-cancel {
      background: #f76f40;
    }
  }

  .label {
    display: block;
    margin-bottom: 10px;

    color: var(--color-font-dark);
  }

  .formgroup {
    margin-bottom: 15px;
  }

  .study-time,
  .students-count,
  .name {
    margin-bottom: 10px;
  }
}
</style>
