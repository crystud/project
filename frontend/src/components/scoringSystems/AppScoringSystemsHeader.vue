<template>
  <div class="subject">
    <div class="labels">
      <span>
        Назва
      </span>

      <span>
        Мін. оцінка
      </span>

      <span>
        Макс. оцінка
      </span>

      <span>
        Мін. прохідний бал
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
.subject {
  padding: 10px 10px;

  width: 100%;

  display: flex;
  justify-content: space-between;

  .labels {
    display: grid;
    grid-template-columns: 4fr 3fr 3fr 4fr;
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
