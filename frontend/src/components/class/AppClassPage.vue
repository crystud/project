<template>
  <div class="class">
    <div class="header">
      <app-card>
        Журнал
      </app-card>

      <div class="sections-menu">
        <div
          class="section"
          :class="currentSection === index ? 'selected' : ''"
          v-for="(section, index) in sections"
          v-bind:key="index"
          @click="currentSection = index"
        >{{section}}</div>
      </div>
    </div>

    <app-register-section v-show="currentSection === 0"></app-register-section>
    <app-topics-section v-show="currentSection === 1"></app-topics-section>
  </div>
</template>

<script>
import AppCard from '../AppCard.vue'
import AppRegisterSection from './AppRegisterSection.vue'
import AppTopicsSection from './AppTopicsSection.vue'

export default {
  name: 'AppClassPage',
  components: {
    AppCard,
    AppRegisterSection,
    AppTopicsSection,
  },
  data() {
    return {
      currentSection: 1,
      sections: ['Оцінки', 'Теми'],
    }
  },
}
</script>

<style lang="less" scoped>
.class {
  .header {
    display: flex;
    justify-content: space-between;
  }

  .header {
    .app-card {
      display: inline-block;
    }

    .app-card, .section {
      padding: 13px 20px;
      color: #fff;
    }

    .sections-menu {
      display: flex;

      .section {
        background: #2C3339;
        border-radius: 8px;
        margin-left: 13px;
        min-width: 150px;
        cursor: pointer;
        transition: all .3s;

        &.selected {
          background: #3B42A2;
        }
      }
    }
  }
}
</style>
