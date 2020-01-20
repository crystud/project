<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
@import (css) url('https://fonts.googleapis.com/css?family=Exo+2:200,400,500,700|Lato:300,400,700,900&display=swap&subset=cyrillic-ext');

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
  --color-accent-blue: #0E8DEA;
  --color-accent-red: #FF1E1E;
  --color-accent-green: #1fe361;

  --color-font-main: #ffffff;
  --color-font-dark: #656D78;
  --color-font-gray: #55636E;
}

#app {
  height: 100%;
  width: 100%;
  font-family: 'Lato', 'Exo 2', sans-serif;

  a {
    color: var(--color-font-main);
    text-decoration: none;
  }
}
</style>
