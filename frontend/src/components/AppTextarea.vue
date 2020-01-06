<template>
  <div class="textarea">
    <div class="placeholder">{{placeholder}}</div>

    <textarea
      :placeholder="placeholder"
      :value="value"
      @keyup="$emit('change', $event.target.value)"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'AppTextarea.vue',
  props: {
    value: {
      required: false,
      default: () => '',
    },
    placeholder: {
      required: false,
      default: () => '',
    },
  },
}
</script>

<style lang="less" scoped>
.textarea {
  margin-bottom: 20px;

  .placeholder {
    color: var(--color-font-dark);
    font-size: 1.1em;
    margin-bottom: 5px;
  }

  textarea {
    background: #101215;
    border: 0;
    border-radius: 5px;
    color: var(--color-font-white);

    width: 100%;
    min-height: 130px;
    resize: none;

    padding: 10px;
  }
}
</style>
