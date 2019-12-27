<template>
  <div class="input">
    <span class="label">{{placeholder}}</span>

    <input
      :type="type"
      :placeholder="placeholder"
      :class="isSuccess ? 'success-border' : 'fail-border'"
      :value="currentValue"
      @input="updateField"
    >
  </div>
</template>

<script>
export default {
  name: 'AppCustomInput',
  data() {
    return {
      currentValue: this.value || '',
    }
  },
  methods: {
    updateField(event) {
      const { value } = event.target

      this.currentValue = value
      this.$emit('change', value)
    },
  },
  props: {
    value: {
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
  .placeholder {
    width: 100%;
    display: flex;
    justify-content: left;

    margin-bottom: 5px;
  }

  input {
    width: 100%;

    padding: 10px;
    background: #1d2226;
    color: #fff;
    border: 0;
    border-radius: 5px;
    font-size: 1em;

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
