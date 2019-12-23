<template>
  <div class="commission">
    <div class="labels">
      <span class="name">
        Назва комісії
      </span>

      <span>
        К-сть вчителів
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSubjectsHeader',
}
</script>

<style scoped lang="less">
.commission {
  padding: 10px 10px;

  width: 100%;

  display: flex;
  justify-content: space-between;

  .labels {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-left: 10px;

    width: 70%;
    color: #77797b;
  }

  .actions {
    margin-right: 10px;
    cursor: pointer;
    font-size: 1.1em;

    .icon {
      margin-left: 15px;
    }

    .edit {
      color: #55636d;
    }
  }
}
</style>
