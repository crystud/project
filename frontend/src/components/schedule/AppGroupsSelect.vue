<template>
  <div class="groups-select">
    <div class="specialty">
      <div class="label">Інженерія програмного забезпечення</div>

      <div class="groups">
        <div class="year" v-for="i in 4" v-bind:key="i">
          <div class="group">П-{{i}}1</div>
          <div class="group">П-{{i}}2</div>
        </div>
      </div>
    </div>

    <div class="specialty">
      <div class="label">Автоматизація</div>

      <div class="groups">
        <div class="year" v-for="i in 4" v-bind:key="i">
          <div class="group">А-{{i}}1</div>
        </div>
      </div>
    </div>

    <div class="specialty">
      <div class="label">Механіки</div>

      <div class="groups">
        <div class="year" v-for="i in 4" v-bind:key="i">
          <div class="group">М-{{i}}1</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppGroupsSelect',
}
</script>

<style lang="less" scoped>
.groups-select {
  .specialty {
    padding: 5px 0;
    border-bottom: 1px solid #2C3339;

    &:last-child {
      border: 0;
    }

    .label {
      color: var(--color-font-dark);
      display: block;
      margin-bottom: 5px;
    }

    .groups {
      display: flex;
      flex-wrap: wrap;

      .year {
        margin-right: 15px;

        .group {
          padding: 5px;
          border-radius: 5px;
          border: 1px solid #3d3d3d;
          margin-bottom: 10px;
          color: #fff;
          cursor: pointer;
          text-align: center;

          &.danger {
            border-color: #CF2323;
          }

          &.selected {
            border-color: #fff;
          }
        }
      }
    }
  }
}
</style>
