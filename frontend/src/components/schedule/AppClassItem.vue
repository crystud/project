<template>
  <div class="class">
    <div v-if="classData.simpleClass" class="info w-100">
      <app-simple-class-item :data="classData"></app-simple-class-item>
    </div>

    <div v-if="classData.numDenominatorClass" class="w-100">
      <div class="numerator info">
        <span class="num-denom-title">Чисельник</span>

        <div class="num-denom-content">
          <app-simple-class-item
            v-if="classData.num"
            :data="classData.num"
          ></app-simple-class-item>

          <div v-if="!classData.num">Немає пари в чисельнику</div>
        </div>
      </div>

      <div class="denumerator info">
        <span class="num-denom-title">Знаменник</span>

        <div class="num-denom-content">
          <app-simple-class-item
            v-if="classData.denom"
            :data="classData.denom"
          ></app-simple-class-item>

          <div v-if="!classData.denom">Немає пари в знаменнику</div>
        </div>
      </div>
    </div>

    <div v-if="classData.simpleSubgroupsClass" class="info w-100">
      <app-simple-class-item
        :data="classData"
      ></app-simple-class-item>
    </div>
  </div>
</template>

<script>
import AppSimpleClassItem from './AppSimpleClassItem.vue'

export default {
  name: 'AppClassItem',
  components: {
    AppSimpleClassItem,
  },
  props: {
    classData: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.class {
  margin-bottom: 10px;
  color: #fff;

  .num-denom-title {
    color: var(--color-font-dark);
  }

  .num-denom-content {
    padding-left: 5px;
    width: 100%;
  }

  .numerator {
    border-bottom: 1px solid var(--color-font-dark);
  }

  .info {
    padding: 10px;
  }

  .w-100 {
    width: 100%;
  }
}
</style>
