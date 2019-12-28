<template>
<div
  @click="go"
  v-if="isAvailable"
  class="app-home-link"
  :class="role === 'admin' ? 'admin-link' : 'user-link'">
  <div class="line" :class="[this.$router.currentRoute.name === this.link  ? '' : 'line-hide']">
    <div class="shadow"></div>
  </div>

  <div class="icon">
    <font-awesome-icon icon="hashtag" />
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

  &.user-link {
    .line {
      .shadow {
        background: linear-gradient(90deg, var(--color-accent-orange) 0%, rgba(0,0,0,0) 100%);
      }
    }
  }

  &.admin-link {
    .icon {
      color: var(--color-accent-blue);
    }

    .line {
      .shadow {
        background: linear-gradient(90deg, var(--color-accent-blue) 0%, rgba(0,0,0,0) 100%);
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

      transition: all .15s;
    }
  }

  .line-hide {
    background: transparent;

    .shadow {
      background: transparent !important;
    }
  }

  .icon {
    margin-left: 40px;
    color: var(--color-accent-orange);
  }

  .admin-link {
    color: var(--color-accent-blue);
  }

  .title {
    margin-left: 22px;
    font-size: 16px;
    color: var(--color-font-main);
  }
}
</style>
