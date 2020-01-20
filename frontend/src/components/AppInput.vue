<template>
<div class="app-input">
  <input
    :type="type"
    :placeholder="name"
    :value="value"
    @input="$emit('input', $event.target.value)"
  >

  <div class="icon">R</div>
</div>
</template>

<script>
export default {
  name: 'AppInput',
  props: {
    value: {},
    type: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="less" scoped>
.app-input {
  position: relative;
  font-size: 18px;
  font-weight: 300;

  input {
    width: 100%;
    padding-left: 50px;
    border-radius: 8px;
    border: none;
    height: 50px;
    background: var(--color-bg-light);
    color: var(--color-font-main);
    font-size: 18px;
    font-weight: 300;
    font-family: 'Lato', sans-serif;

    &::placeholder {
      color: var(--color-font-dark);
    }

    &:focus {
      border: 1px var(--color-accent-orange) solid;
    }
  }

  .icon {
    color: var(--color-font-dark);
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 50px;
    width: 50px;
  }
}
</style>
