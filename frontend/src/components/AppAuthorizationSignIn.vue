<template>
<div class="app-authorization-sign-in">
  <span class="title">Вхід</span>

  <app-input
      name="E-mail"
      class="email"
      v-model="email"
  ></app-input>

  <app-input
      name="Password"
      type="password"
      v-model="password"
  ></app-input>


  <div class="remember">Забули пароль ?</div>

  <app-button class="signIn" @click="signIn">Ввійти</app-button>

  <div class="signUp">
    <span class="msg">Немає аккаунта ?</span>
    <span @click="signUp" class="create">Створіть</span>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'

import AppInput from './AppInput.vue'
import AppButton from './AppButton.vue'

export default {
  name: 'AppAuthorizationSignIn',
  components: {
    AppButton,
    AppInput,
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    ...mapActions({
      appSignIn: 'authorization/signIn',
    }),
    signIn() {
      this.appSignIn({
        email: this.email,
        password: this.password,
      })
        .then(() => {
          this.$router.push({ name: 'home' })
        })
        .catch(() => {})
    },
    signUp() {
      this.$router.push({ name: 'signUp' })
    },
  },
}
</script>

<style lang="less" scoped>
.app-authorization-sign-in {
  .title {
    font-size: 40px;
    font-weight: 700;
    color: var(--color-font-dark);
  }

  .app-input {
    margin: 25px 0;
  }

  .email {
    margin-top: 42px;
  }

  .remember {
    text-align: right;
    margin-right: 25px;
    font-size: 18px;
    color: var(--color-accent-orange);
  }

  .signIn {
    margin-top: 42px;
    background: var(--color-accent-orange);
    color: var(--color-font-main);
  }

  .signUp {
    margin-top: 25px;
    font-size: 16px;

    .msg {
      color: var(--color-font-dark);
    }

    .create {
      margin-left: 6px;
      color: var(--color-accent-orange);
      cursor: pointer;
    }
  }
}
</style>
