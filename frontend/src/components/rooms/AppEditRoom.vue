<template>
  <app-modal-window :show="show" @close="$emit('cancel')">
    <div slot="header">Редагування аудиторії</div>

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
          @click="edit"
        >Зберегти</app-button>
      </div>
    </div>
  </app-modal-window>
</template>

<script>
import { mapActions } from 'vuex'

import AppModalWindow from '../AppModalWindow.vue'
import AppButton from '../AppButtonCustom.vue'
import AppInputCustom from '../AppCustomInput.vue'

export default {
  name: 'AppEditRoom.vue',
  components: {
    AppModalWindow,
    AppButton,
    AppInputCustom,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    room: {
      type: Object,
      required: true,
    },
  },
  watch: {
    room() {
      const {
        room: {
          name,
          floor,
        },
      } = this

      this.name = name
      this.floor = floor
    },
  },
  methods: {
    ...mapActions({
      editRoom: 'rooms/edit',
    }),
    edit() {
      const {
        name,
        floor,
        room: { id: roomID },
      } = this

      this.editRoom({
        roomID,
        name,
        floor,
      }).then(() => {
        this.name = ''
        this.floor = ''

        this.$emit('done')
      })
    },
  },
  data() {
    return {
      name: '',
      floor: '',
    }
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
