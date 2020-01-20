<template>
  <div class="subject">
    <div class="labels" v-if="!isEditing">
      <span>
        {{scoringSystem.name}}
      </span>

      <span>
        {{scoringSystem.min}}
      </span>

      <span>
        {{scoringSystem.max}}
      </span>

      <span>
        {{scoringSystem.minMark}}
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

    <app-scoring-system-edit
      v-if="isEditing"
      :id="scoringSystem.id"
      :name="scoringSystem.name"
      :minAllowedMark="scoringSystem.min"
      :maxAllowedMark="scoringSystem.max"
      :minGoodMark="scoringSystem.minMark"
      @edited="doneEditing"
    ></app-scoring-system-edit>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppScoringSystemEdit from './AppScoringSystemEdit.vue'

export default {
  name: 'AppSubjectsItem',
  components: {
    AppScoringSystemEdit,
  },
  data() {
    return {
      inActions: false,
      isEditing: false,
    }
  },
  methods: {
    ...mapActions({
      loadCommissions: 'commissions/loadCommissions',
      loadSubjectTypes: 'subjectTypes/load',
      loadSubjects: 'subjects/load',
      loadScoringSystems: 'scoringSystems/load',
    }),
    doneEditing() {
      this.isEditing = false
      this.inActions = false

      this.loadScoringSystems()
    },
    async switchToEdit() {
      await Promise.all([
        this.loadSubjectTypes(),
        this.loadCommissions(),
      ])

      this.isEditing = true
    },
  },
  props: {
    scoringSystem: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped lang="less">
.subject {
  border-left: 7px solid;
  background: var(--color-bg-dark);
  border-radius: 5px;
  padding: 20px 10px;

  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .labels {
    display: grid;
    grid-template-columns: 4fr 3fr 3fr 4fr;
    margin-left: 10px;

    width: 70%;
  }

  &.high-coefficient {
    border-color: #375ee1;
  }

  &.low-coefficient {
    border-color: #23c9cf;
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
}
</style>
