<template>
  <app-modal-window :show="isEditing" @close="setNoEditing">
    <div slot="header">Редагування елементу розкладу</div>
    <div slot="content">
      editing:

      <pre>
        {{editing}}
      </pre>
    </div>
  </app-modal-window>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppModalWindow from '../AppModalWindow.vue'

export default {
  name: 'AppScheduleEditing.vue',
  components: {
    AppModalWindow,
  },
  computed: {
    ...mapGetters({
      editing: 'schedule/editing',
      isEditing: 'schedule/isEditing',
    }),
  },
  methods: {
    ...mapActions({
      setNoEditing: 'schedule/setNoEditing',
    }),
  },
}
</script>

<style>

</style>
