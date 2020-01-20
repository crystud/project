<template>
  <div class="commission">
    <div class="labels">
      <div class="create" @click="switchToCreate" v-if="!isCreating">
        <font-awesome-icon icon="plus"></font-awesome-icon>
        <span class="label">Створити комісію</span>
      </div>

      <div v-if="isCreating" class="creating-fields">
        <app-custom-input
          class="form-input"
          placeholder="Назва комісії"
          :isSuccess="!!name"
          @change="(val) => name = val"
        ></app-custom-input>

        <button
          class="btn btn-cancel"
          @click="cancel"
        >Скасувати</button>

        <button
          class="btn btn-create"
          :class="name ? 'create-able' : 'create-disable'"
          @click="createCommission"
        >Створити</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppCustomInput from '../AppCustomInput.vue'

export default {
  name: 'AppSubjectsHeader',
  components: {
    AppCustomInput,
  },
  computed: {
    ...mapGetters({
      commissions: 'commissions/list',
    }),
  },
  data() {
    return {
      isCreating: false,
      name: '',
    }
  },
  methods: {
    ...mapActions({
      loadCommissions: 'commissions/loadCommissions',
      create: 'commissions/create',
    }),
    cancel() {
      this.isCreating = false
      this.name = ''
    },
    switchToCreate() {
      this.isCreating = true
      this.name = ''
    },
    createCommission() {
      const {
        name,
      } = this

      if (!name) {
        return
      }

      this.create({ name }).then(() => {
        this.loadCommissions()

        this.isCreating = false
      })
    },
  },
}
</script>

<style scoped lang="less">
.commission {
  border-left: 7px solid #00ff87;
  background: var(--color-bg-dark);
  border-radius: 5px;
  cursor: pointer;

  width: 100%;

  display: flex;
  justify-content: left;

  .field-label {
    display: block;
    margin-bottom: 10px;
  }

  .create,
  .creating-fields {
    padding: 20px;
  }

  .btn {
    padding: 10px;
    margin-right: 10px;
    border: 0;
    border-radius: 5px;
    font-size: 1em;
    color: #ffffff;

    transition: all .3s;
  }

  .btn-cancel {
    background: #55636d;
  }

  .btn-create {
    background: #00ff87;

    &.create-able {
      opacity: 1;
      cursor: pointer;
    }

    &.create-disable {
      opacity: .5;
      cursor: not-allowed;
    }
  }

  .form-input {
    margin-right: 30px;
    width: auto;
  }

  .creating-fields {
    display: flex;
    justify-content: left;

    align-items: flex-end;
  }

  .labels {
    width: 100%;
  }

  .create {
    color: #55636d;
    width: 100%;

    .label {
      margin-left: 15px;
    }
  }
}
</style>
