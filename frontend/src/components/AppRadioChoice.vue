<template>
  <div class="radio-choice">
    <div
      class="selector"
      ref="selector"
    ></div>

    <div class="list">
      <div
        class="choice"
        :class="!reSelected && defaultValue === value ? 'def' : ''"
        v-for="({ label, value }, i) in options"
        v-bind:key="i"
        :data-value="value"
        @click="setValue"
        ref="item"
      >{{label}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppRadioChoice.vue',
  props: {
    options: {
      type: Array,
      required: true,
    },
    defaultValue: {
      required: false,
    },
  },
  data() {
    return {
      reSelected: false,
    }
  },
  methods: {
    setValue({
      target: {
        offsetLeft,
        offsetTop,
        clientWidth,
        clientHeight,
        dataset,
      },
    }) {
      this.$refs.selector.style.left = `${offsetLeft}px`
      this.$refs.selector.style.top = `${offsetTop}px`
      this.$refs.selector.style.width = `${clientWidth}px`
      this.$refs.selector.style.height = `${clientHeight}px`

      this.reSelected = true

      this.$emit('change', dataset.value)
    },
  },
}
</script>

<style lang="less" scoped>
.radio-choice {
  position: relative;
  margin: 10px 0;
  background: #0F1214;

  .selector {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 105;

    width: 0px;
    height: 100%;

    border-radius: 7px;
    background: #3242D5;

    transition: all .135s;
  }

  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    border-radius: 7px;
    position: relative;
    z-index: 110;

    .choice {
      padding: 15px 10px;
      cursor: pointer;
      text-align: center;
      border-radius: 7px;

      transition: all .3s;

      &.def {
        background: #3242D5;
      }
    }
  }
}
</style>
