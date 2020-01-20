<template>
  <div>
    <app-modal-window :show="show" @close="$emit('close')">
      <template>
        <div slot="header">
          Редагування годин
        </div>
      </template>

      <template>
        <div slot="content">
          <app-input
            type="number"
            name="Години"
            :value="hoursValue"
            @input="(val) => newHours = val"
          ></app-input>

          <div class="btns">
            <app-button
              @click="$emit('close')"
              :isOkay="false"
              class="btn"
            >Скасувати</app-button>

            <app-button
              @click="deleteHours"
              :isOkay="false"
              class="btn"
            >
              <font-awesome-icon icon="trash"></font-awesome-icon>
            </app-button>

            <app-button
              @click="updateHours"
              :isOkay="true"
              class="btn"
            >Зберегти</app-button>
          </div>
        </div>
      </template>
    </app-modal-window>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppModalWindow from '../AppModalWindow.vue'
import AppInput from '../AppInput.vue'
import AppButton from '../AppButtonCustom.vue'

export default {
  name: 'AppEditSemester',
  components: {
    AppModalWindow,
    AppInput,
    AppButton,
  },
  data() {
    return {
      newHours: this.hoursValue,
    }
  },
  methods: {
    ...mapActions({
      editHours: 'hours/edit',
      removeHours: 'hours/delete',
    }),
    async updateHours() {
      const {
        hoursID,
        newHours: hours,
      } = this

      await this.editHours({ hoursID, hours })

      this.$emit('updated')
      this.$emit('close')
    },
    async deleteHours() {
      const { hoursID } = this

      await this.removeHours({ hoursID })

      this.$emit('updated')
      this.$emit('close')
    },
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    hoursID: {
      type: Number,
      required: true,
    },
    hoursValue: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.btns {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;

  .btn {
    margin-left: 10px;
  }
}
</style>
