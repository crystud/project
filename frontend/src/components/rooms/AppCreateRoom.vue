<template>
  <app-modal-window
    :show="show"
    @close="$emit('cancel')"
  >
    <div slot="header">Створення аудиторії</div>

    <div slot="content">
      <div class="fields">
        <app-input-custom
          class="field"
          placeholder="Назва аудиторії"
          :isSuccess="!!name"
          :value="name"
          @change="val => name = val"
        ></app-input-custom>

        <app-input-custom
          class="field"
          placeholder="Поверх"
          :isSuccess="!!floor"
          :value="floor"
          @change="val => floor = val"
        ></app-input-custom>
      </div>

      <div class="btns">
        <app-button
          :isOkay="false"
          @click="$emit('cancel')"
        >Скасувати</app-button>

        <app-button
          :isOkay="true"
          @click="create"
        >Створити</app-button>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import { mapActions } from 'vuex'

import AppModalWindow from '../AppModalWindow.vue'
import AppInputCustom from '../AppCustomInput.vue'
import AppButton from '../AppButtonCustom.vue'

export default {
  name: 'AppCreateRoom.vue',
  components: {
    AppInputCustom,
    AppModalWindow,
    AppButton,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      floor: '',
      name: '',
    }
  },
  methods: {
    ...mapActions({
      createRoom: 'rooms/create',
    }),
    create() {
      const { floor, name } = this

      this.createRoom({ floor, name }).then(() => {
        this.floor = ''
        this.name = ''

        this.$emit('done')
      }).catch(console.error)
    },
  },
}
</script>

<style lang="less" scoped>
.fields {
  display: flex;
  justify-content: space-between;

  .field {
    width: 200px;
  }
}

.btns {
  margin-top: 15px;

  display: flex;
  justify-content: flex-end;

  .btn {
    margin-left: 10px;
  }
}
</style>
