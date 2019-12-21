<template>
  <div class="select">
    <span class="placeholder">{{placeholder}}</span>

    <select ref="select" class="select-input" @change="$emit('change', $event.target.value)">
      <option v-if="!defaultValue">Обрати...</option>

      <option
        v-for="(item, index) in options"
        v-bind:key="index"
        :selected="defaultValue && option(item).value === option(defaultValue).value"
        :value="option(item).value"
      >{{option(item).label}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'AppSelect',
  props: {
    option: {
      type: Function,
      required: true,
    },
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
    placeholder: {
      type: String,
      required: false,
      default: () => '',
    },
    defaultValue: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  update() {
    this.$emit('change', this.$refs.select.value)
  },
}
</script>

<style lang="less" scoped>
.select {
  width: 100%;
  margin: 10px 0;

  .placeholder {
    display: flex;
    justify-content: left;

    margin-bottom: 10px;
  }

  .select-input {
    width: 100%;
    padding: 15px 10px;
    font-size: 1em;

    border-radius: 8px;
    background: var(--color-bg-light);
    border: 0;

    color: var(--color-font-main);
  }
}
</style>
