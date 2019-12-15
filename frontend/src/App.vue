<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
@import (css) url('https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap');

html,
body {
  height: 100vh;
}

*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

:root {
  --color-bg-main: #1E2329;
  --color-bg-dark: #15191C;
  --color-bg-light: #2C3339;

  --color-accent-orange: #FC7136;

  --color-font-main: #ffffff;
  --color-font-dark: #656D78;
}

#app {
  height: 100%;
  width: 100%;
  font-family: 'Lato', sans-serif;

  a {
    color: var(--color-font-main);
    text-decoration: none;
  }
}
</style>
