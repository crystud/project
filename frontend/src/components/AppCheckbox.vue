<template>
  <div
    class="checkbox"
    :class="checked ? 'checked' : ''"
    @click="toggleChecked"
  >
    <font-awesome-icon
      icon="check"
      class="icon"
    ></font-awesome-icon>
  </div>
</template>

<script>
export default {
  name: 'AppCheckbox',
  props: {
    checked: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      isChecked: this.checked,
    }
  },
  methods: {
    toggleChecked() {
      this.isChecked = !this.isChecked

      this.$emit('change', this.isChecked)
    },
  },
}
</script>

<style lang="less" scoped>
.checkbox {
  width: 25px;
  height: 25px;

  display: flex;
  border-radius: 4px;
  border: 1px solid #3d3d3d;
  cursor: pointer;
  user-select: none;

  &.checked {
    border-color: #fff;

    .icon {
      opacity: 1;
      visibility: visible;
    }
  }

  .icon {
    margin: auto;
    opacity: 0;
    visibility: hidden
  }

  &, .icon {
    transition: all .15s;
  }
}
</style>
