<template>
  <div class="editing">
    <span class="edit-field">
      <app-custom-input
        placeholder="Назва"
        :isSuccess="!!edited.name"
        :value="name"
        @change="(val) => edited.name = val"
      ></app-custom-input>
    </span>

    <span class="edit-field">
      <app-custom-input
        placeholder="Мін. оцінка"
        :isSuccess="!!edited.minAllowedMark"
        :value="minAllowedMark"
        @change="(val) => edited.minAllowedMark = val"
      ></app-custom-input>
    </span>

    <span class="edit-field">
      <app-custom-input
        placeholder="Макс. оцінка"
        :isSuccess="!!edited.maxAllowedMark"
        :value="maxAllowedMark"
        @change="(val) => edited.maxAllowedMark = val"
      ></app-custom-input>
    </span>

    <span class="edit-field">
      <app-custom-input
        placeholder="Мін. прохідний бал"
        :isSuccess="!!edited.minGoodMark"
        :value="minGoodMark"
        @change="(val) => edited.minGoodMark = val"
      ></app-custom-input>
    </span>

    <span class="edit-actions">
      <app-button
        @click="
          isEditing = false;
          inActions = false;
        "
        :isOkay="false"
        class="app-button"
      >Скасувати</app-button>

        <app-button
          @click="saveChanges"
          :isOkay="true"
          class="app-button"
        >Зберегти зміни</app-button>
    </span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppCustomInput from '../AppCustomInput.vue'
import AppButton from '../AppButtonCustom.vue'

export default {
  name: 'AppScoringSystemEdit',
  components: {
    AppCustomInput,
    AppButton,
  },
  data() {
    return {
      edited: {
        name: this.name,
        minAllowedMark: this.minAllowedMark,
        maxAllowedMark: this.maxAllowedMark,
        minGoodMark: this.minGoodMark,
      },
    }
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      required: true,
    },
    minAllowedMark: {
      type: Number,
      required: true,
    },
    maxAllowedMark: {
      type: Number,
      required: true,
    },
    minGoodMark: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      commissions: 'commissions/list',
      subjectTypes: 'subjectTypes/list',
    }),
  },
  methods: {
    ...mapActions({
      edit: 'scoringSystems/edit',
    }),
    saveChanges() {
      const {
        edited: {
          name,
          minAllowedMark: minPossibleMark,
          maxAllowedMark: maxPossibleMark,
          minGoodMark: minPassingMark,
        },
        id: scoringSystemID,
      } = this

      this.edit({
        name,
        minPossibleMark,
        maxPossibleMark,
        minPassingMark,
        scoringSystemID,
      }).then(() => {
        this.$emit('edited')
      })
    },
  },
}
</script>

<style lang="less" scoped>
.edit-actions {
  margin-right: 10px;
  margin-top: 10px;

  .app-button {
    margin-right: 10px;
  }
}

.editing {
  display: flex;
  justify-content: left;
  align-items: flex-end;
  flex-wrap: wrap;

  margin-left: 10px;
}

.edit-field {
  margin-right: 15px;
  margin-top: 10px;
}
</style>
