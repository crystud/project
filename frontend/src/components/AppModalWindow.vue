<template>
  <div class="modal" :class="show ? 'show' : ''">
    <div class="body">
      <div class="header">
        <div class="slot">
          <slot name="header"></slot>
        </div>

        <div class="close" @click="$emit('close')">
          <font-awesome-icon
            icon="times"
            class="icon"
          ></font-awesome-icon>
        </div>
      </div>

      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppModalWindow',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style scoped lang="less">
.modal {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  opacity: 0;
  visibility: hidden;

  background: rgba(0, 0, 0, 0.7);

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all .5s;

  .body {
    min-width: 450px;
    border-radius: 5px;

    background: var(--color-bg-dark);
    color: #fff;

    transform: scale(0.9);
    transition: all .3s .2s;

    .header {
      padding: 20px;
      background: #0e1013;
      border-radius: 5px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      .close {
        width: 50px;
        height: 50px;

        display: flex;
        justify-content: center;
        align-items: center;

        background: rgba(0, 0, 0, 0);
        border-radius: 50%;

        font-size: 1.3em;
        cursor: pointer;

        transition: all .3s;

        &:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      }
    }

    .content {
      padding: 20px;
    }
  }

  &.show {
    opacity: 1;
    visibility: visible;

    .body {
      transform: scale(1);
    }
  }
}
</style>
