<template>
  <div class="select">
    <span class="placeholder">{{placeholder}}</span>

    <select
      ref="select"
      class="select-input"
      @change="onChange"
      :class="selected ? 'success-border' : 'fail-border'"
    >
      <option :value="notSelectedValue" v-if="!defaultValue">Обрати...</option>

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
  methods: {
    onChange(ev) {
      const { value } = ev.target
      const { notSelectedValue } = this

      if (notSelectedValue && value === notSelectedValue.toString()) {
        this.value = 0
        this.selected = false

        this.$emit('change', 0)
      } else {
        this.value = value
        this.selected = true

        this.$emit('change', value)
      }
    },
  },
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
  data() {
    return {
      notSelectedValue: Math.random(),
      value: 0,
      selected: false,
    }
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

    margin-bottom: 5px;
  }

  .select-input {
    width: 100%;
    padding: 15px 10px;
    font-size: 1em;

    border-radius: 8px;
    background: var(--color-bg-light);
    border: 0;

    color: var(--color-font-main);

    border-bottom: 2px solid transparent;
    transition: all .3s;
  }

  .fail-border {
    border-color: #d43f3e;
  }

  .success-border {
    border-color: #00ff87;
  }
}
</style>
