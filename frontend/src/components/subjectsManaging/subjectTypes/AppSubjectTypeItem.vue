<template>
  <div
    class="subject-type"
    @click="$emit('onOpenEdit', subjectType)"
    >
    <div
      class="data"
      :class="editingSubjectTypeID && editingSubjectTypeID.id === subjectType.id ? 'hidden' : ''"
    >
      <div class="label">
        <span class="title">Назва</span>
        <span class="value">{{subjectType.name}}</span>
      </div>

      <div class="label">
        <span class="title">Коефіцієнт</span>
        <span class="value">{{subjectType.coefficient}}</span>
      </div>

      <div class="label">
        <span class="title">Система оцінювання</span>
        <span class="value">{{subjectType.scoring_system.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppSubjectTypeItem',
  computed: {
    ...mapGetters({
      editingSubjectTypeID: 'subjectTypes/editingItem',
    }),
  },
  props: {
    subjectType: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.subject-type {
  display: block;
  width: 100%;
  border-left: 7px solid #23C9CF;
  border-radius: 5px;
  background: #15191C;
  margin-bottom: 10px;
  cursor: pointer;

  .data {
    display: grid;
    grid-template-columns: 2fr 2fr 3fr;
    padding: 10px 0;

    opacity: 1;
    visibility: visible;

    transition: all .3s;

    &.hidden {
      opacity: 0;
      visibility: hidden;
    }

    .label {
      display: flex;
      flex-direction: column;
      margin-left: 15px;

      .title {
        color: #55636E;
        margin-bottom: 3px;
      }

      .value {
        color: #fff;
      }
    }
  }
}
</style>
