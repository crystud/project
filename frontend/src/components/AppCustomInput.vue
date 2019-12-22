<template>
  <div class="input">
    <span class="label">{{placeholder}}</span>

    <input
      :type="type"
      :placeholder="placeholder"
      :class="isSuccess ? 'success-border' : 'fail-border'"
      :value="value"
      @input="$emit('change', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: 'AppCustomInput',
  props: {
    value: {
      type: String,
      required: false,
      default: () => '',
    },
    type: {
      type: String,
      required: false,
      default: () => 'text',
    },
    placeholder: {
      type: String,
      required: false,
      default: () => 'text',
    },
    isSuccess: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.input {
  .label {
    color: #ffffff;
    margin-bottom: 5px;
    display: block;
  }

  input {
    width: 100%;

    padding: 10px;
    background: #1d2226;
    color: #fff;
    border: 0;
    border-radius: 5px;

    border-bottom: 2px solid transparent;

    transition: all .3s;
  }

  .success-border {
    border-color: #00ff87;
  }

  .fail-border {
    border-color: #d43f3e;
  }
}
</style>
