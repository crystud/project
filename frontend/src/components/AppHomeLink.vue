<template>
<div @click="go" v-if="isAvailable" class="app-home-link">
  <div class="line" :class="[this.$router.currentRoute.name === this.link  ? '' : 'line-hide']">
    <div class="shadow"></div>
  </div>

  <div class="icon">
    <font-awesome-icon icon="columns" />
  </div>

  <div class="title">
    <slot></slot>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppHomeLink',
  methods: {
    go() {
      if (this.$router.currentRoute.name !== this.link) {
        this.$router.push({ name: this.link })
      }
    },
  },
  props: {
    link: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
    },
  },
  computed: {
    isAvailable() {
      return this.roles.includes(this.role)
    },
    ...mapGetters({
      roles: 'profile/roles',
    }),
  },
}
</script>

<style lang="less" scoped>
.app-home-link {
  cursor: pointer;
  height: 70px;
  display: flex;
  align-items: center;

  &:hover {
    .line {
      .shadow {
        width: 30px;
      }
    }
  }

  .line {
    position: relative;
    width: 6px;
    height: 100%;
    background: var(--color-accent-orange);

    .shadow {
      position: absolute;
      height: 100%;
      width: 20px;
      background: linear-gradient(90deg, var(--color-accent-orange) 0%, rgba(0,0,0,0) 100%);
    }
  }

  .line-hide {
    background: transparent;
    .shadow {
      background: transparent;
    }
  }

  .icon {
    margin-left: 40px;
    color: var(--color-accent-orange);
  }

  .title {
    margin-left: 22px;
    font-size: 16px;
    color: var(--color-font-main);
  }
}
</style>
