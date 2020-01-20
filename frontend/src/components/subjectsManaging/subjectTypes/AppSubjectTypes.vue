<template>
  <div>
    <div class="list">
      <app-subject-type-create></app-subject-type-create>

      <app-subject-type-item
        v-for="(data, index) in subjectTypes"
        v-bind:key="index"
        :subjectType="data"
        @onOpenEdit="openEdit"
      ></app-subject-type-item>
    </div>

    <app-subject-type-edit
      :show="!!editingItemData.id"
      @close="closeEditing"
    ></app-subject-type-edit>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppSubjectTypeItem from './AppSubjectTypeItem.vue'
import AppSubjectTypeCreate from './AppSubjectTypeCreate.vue'
import AppSubjectTypeEdit from './AppSubjectTypeEdit.vue'

import store from '../../../store'

export default {
  name: 'AppSubjectTypes',
  components: {
    AppSubjectTypeItem,
    AppSubjectTypeEdit,
    AppSubjectTypeCreate,
  },
  computed: {
    ...mapGetters({
      subjectTypes: 'subjectTypes/list',
      editingItemData: 'subjectTypes/editingItem',
    }),
  },
  methods: {
    ...mapActions({
      load: 'subjectTypes/load',
    }),
    closeEditing() {
      store.commit('subjectTypes/setEditingItem', {}, { root: true })
    },
    openEdit(subjectTypeData) {
      store.commit('subjectTypes/setEditingItem', subjectTypeData, { root: true })
    },
  },
  created() {
    this.load()
  },
}
</script>

<style>

</style>
