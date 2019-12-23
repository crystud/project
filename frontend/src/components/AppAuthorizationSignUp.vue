<template>
<div class="app-authorization-sign-up">
  <span class="title">Реєстрація</span>

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

  <app-input
      name="Повне прізвище ім'я по батькові"
      v-model="name"
  ></app-input>

  <app-input
      name="Адреса"
      v-model="address"
      type="text"
  ></app-input>

  <app-button class="signUp" @click="signUp">Зареєструватись</app-button>

  <div class="signIn">
    <span class="msg">Ой, а в мне все ж є аккаунт!</span>
    <span @click="signIn" class="create">Ввійти</span>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'

import AppInput from './AppInput.vue'
import AppButton from './AppButton.vue'

export default {
  name: 'AppAuthorizationSignUp',
  components: {
    AppButton,
    AppInput,
  },
  data() {
    return {
      email: '',
      password: '',
      address: '',
      name: '',
    }
  },
  methods: {
    ...mapActions({
      appSignUp: 'authorization/signUp',
    }),
    signUp() {
      this.appSignUp({
        email: this.email,
        password: this.password,
        address: this.address,
        name: this.name,
      })
        .then(() => {
          this.$router.push({ name: 'Home' })
        })
        .catch(() => {})
    },
    signIn() {
      this.$router.push({ path: 'authorization' })
    },
  },
}
</script>

<style lang="less" scoped>
.app-authorization-sign-up {
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

  .signUp {
    margin-top: 42px;
    background: var(--color-accent-orange);
    color: var(--color-font-main);
  }

  .signIn {
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
