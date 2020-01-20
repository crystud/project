<template>
  <div
    class="context-window"
    ref="markWindow"
    :style="`
      left: ${contextWindow.position.x}px;
      top: ${contextWindow.position.y}px;
    `"
    v-show="contextWindow.show"
  >
    <div class="triangle">
      <svg
        height="43.3"
        width="50"
      >
        <polygon points="0,0 50,0 25.0,43.3"></polygon>
      </svg>
    </div>

    <app-mark-set
      :showName="true"
      :data="contextWindow"
    ></app-mark-set>
  </div>
</template>

<script>
import AppMarkSet from './AppMarkSet.vue'

export default {
  name: 'AppContextWindow.vue',
  components: {
    AppMarkSet,
  },
  props: {
    contextWindow: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.context-window {
  position: fixed;
  top: 50%;
  left: 50%;

  background: #1E2329;
  padding: 20px;
  border-radius: 8px;
  color: var(--color-font-dark);

  transition: all .3s;


  .triangle {
    transform: scale(.4) rotate(180deg);
    position: absolute;
    top: -33px;
    right: 30px;

    fill: #1E2329;
  }
}
</style>
