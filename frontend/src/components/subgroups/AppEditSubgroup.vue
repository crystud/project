<template>
  <app-modal-window :show="show" @close="$emit('cancel')">
    <div slot="header">Редагування підгрупи</div>

    <div slot="content">
      <div class="label">Назва підгрупи</div>

      <app-input
        type="text"
        name="Назва"
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
          @click="save"
          class="btn"
        >Зберегти</app-button>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import { mapActions } from 'vuex'

import AppModalWindow from '../AppModalWindow.vue'
import AppButton from '../AppButtonCustom.vue'
import AppInput from '../AppInput.vue'

export default {
  name: 'AppEditSubgroup.vue',
  components: {
    AppModalWindow,
    AppButton,
    AppInput,
  },
  watch: {
    currentName() {
      this.name = this.currentName
    },
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    currentName: {
      type: String,
      required: true,
    },
    subgroupID: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      name: this.currentName,
    }
  },
  methods: {
    ...mapActions({
      updateSubgroup: 'subgroups/edit',
    }),
    save() {
      const { name, subgroupID } = this

      this.updateSubgroup({ name, subgroupID }).then(() => {
        this.$emit('saved')

        this.name = ''
      })
    },
  },
}
</script>

<style lang="less" scoped>
.label {
  margin-bottom: 5px;
  color: var(--color-font-dark);
}

.btns {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;

  .btn {
    margin-left: 10px;
  }
}
</style>
