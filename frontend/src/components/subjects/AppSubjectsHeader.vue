<template>
  <div class="subject">
    <div class="labels">
      <span class="name">
        Назва предмету
      </span>

      <span class="commission-name">
        Комісія
      </span>

      <span class="coefficient">
        Коефіцієнт
      </span>

      <span class="subject-type-name">
        Тип предмету
      </span>

      <span class="scoring-system-name">
        Система оцінювання
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
    grid-template-columns: 1.5fr 1.3fr 0.7fr 1fr 1.3fr;
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
