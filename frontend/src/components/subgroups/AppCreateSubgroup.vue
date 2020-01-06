<template>
  <app-modal-window :show="show" @close="$emit('cancel')">
    <div slot="header">
      Створення підгрупи
    </div>

    <div slot="content">
      <app-input
        type="text"
        name="Назва підгрупи"
        :value="name"
        @input="newVal => name = newVal"
      ></app-input>

      <div class="btns">
        <app-button
          :isOkay="false"
          @click="$emit('cancel')"
          class="btn"
        >Скасувати</app-button>

        <app-button
          :isOkay="true"
          @click="createSubgroup"
          class="btn"
        >Створити</app-button>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import { mapActions } from 'vuex'

import AppModalWindow from '../AppModalWindow.vue'
import AppInput from '../AppInput.vue'
import AppButton from '../AppButtonCustom.vue'

export default {
  name: 'AppCreateSubgroup.vue',
  components: {
    AppModalWindow,
    AppInput,
    AppButton,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    groupID: {
      type: Number,
      required: true,
      default: () => 0,
    },
  },
  data() {
    return {
      name: '',
    }
  },
  methods: {
    ...mapActions({
      create: 'subgroups/create',
    }),
    createSubgroup() {
      const { name, groupID } = this

      if (!name) return

      this.create({ name, groupID }).then(() => {
        this.name = ''

        this.$emit('created')
      })
    },
  },
}
</script>

<style lang="less" scoped>
.btns {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;

  .btn {
    margin-left: 10px;
  }
}
</style>
