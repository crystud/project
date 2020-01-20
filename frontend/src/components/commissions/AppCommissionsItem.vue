<template>
  <div class="commission">
    <div class="labels" v-if="!isEditing">
      <span class="name">
        {{name}}
      </span>

      <span>
        {{teachersCount}} вчителів
      </span>
    </div>

    <span class="actions" v-if="!isEditing" @click="inActions = true">
      <span v-if="inActions">
        <font-awesome-icon
          icon="edit"
          class="icon edit"
          @click="switchToEdit"
        ></font-awesome-icon>
      </span>

      <font-awesome-icon
        v-if="!inActions"
        icon="ellipsis-h"
      ></font-awesome-icon>
    </span>

    <div class="editing" v-if="isEditing">
      <span class="edit-field">
        <app-custom-input
          placeholder="Назва комісії"
          :isSuccess="!!commissionName"
          :value="commissionName"
          @change="(val) => commissionName = val"
        ></app-custom-input>
      </span>
    </div>

    <span class="edit-actions" v-if="isEditing">
      <button
        class="btn btn-cancel"
        @click="
          isEditing = false;
          inActions = false;
        "
        >Скасувати</button>

        <button
          class="btn btn-save"
          @click="saveChanges"
        >Зберегти зміни</button>
    </span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppCustomInput from '../AppCustomInput.vue'

export default {
  name: 'AppSubjectsItem',
  data() {
    return {
      inActions: false,
      isEditing: false,
      commissionName: this.name,
    }
  },
  components: {
    AppCustomInput,
  },
  computed: {
    ...mapGetters({
      commissions: 'commissions/list',
    }),
  },
  methods: {
    ...mapActions({
      editCommission: 'commissions/editCommission',
      loadCommissions: 'commissions/loadCommissions',
    }),
    switchToEdit() {
      this.isEditing = true
    },
    saveChanges() {
      const {
        commissionName: name,
        id,
      } = this

      this.editCommission({
        id,
        name,
      }).then(() => {
        this.isEditing = false
        this.inActions = false

        this.loadCommissions()
      })
    },
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    teachersCount: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style scoped lang="less">
.commission {
  border-left: 7px solid;
  background: var(--color-bg-dark);
  border-radius: 5px;
  padding: 20px 10px;

  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .labels {
    margin-left: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;

    width: 70%;
  }

  .btn {
    padding: 10px;
    font-size: .9em;
    border: 0;
    border-radius: 4px;
    margin-left: 10px;
    color: #fff;
    cursor: pointer;
  }

  .btn-save {
    background: var(--color-accent-green);
  }

  .btn-cancel {
    background: var(--color-accent-red);
  }

  .edit-actions {
    margin-right: 10px;
  }

  .editing {
    display: flex;
    justify-content: left;
    align-items: center;

    margin-left: 10px;
  }

  .edit-field {
    margin-right: 15px;
  }

  .actions {
    margin-right: 10px;
    cursor: pointer;
    font-size: 1.1em;

    .icon {
      margin-left: 15px;
    }

    .edit {
      color: #55636d;
    }
  }

  &.high-coefficient {
    border-color: #375ee1;
  }

  &.low-coefficient {
    border-color: #23c9cf;
  }
}
</style>
