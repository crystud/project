<template>
  <div class="department add-department">
    <div class="button-content">
      <font-awesome-icon class="icon" icon="plus"></font-awesome-icon>
      <div class="label">Створити нове відділення</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Add-department',
}
</script>

<style lang="less" scoped>
.add-department {
  background: #1E2329;
  color: #55636E;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  .button-content {
    text-align: center;
    font-weight: 300;

    .icon {
      font-size: 1.5em;
    }

    .label {
      margin-top: 10px;
    }
  }
}

.add-department:hover {
  background: rgb(25, 29, 34);
}
</style>
