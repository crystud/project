<template>
  <div class="subjects-managing">
    <div class="section">
      <div class="header">Комісії</div>

      <div class="content">
        <app-commissions></app-commissions>
      </div>
    </div>

    <div class="section">
      <div class="header">Предмети</div>

      <div class="content">
        <app-subjects></app-subjects>
      </div>
    </div>

    <div class="section">
      <div class="header">Системи оцінювання</div>

      <div class="content">
        <app-scoring-systems></app-scoring-systems>
      </div>
    </div>

    <div class="section">
      <div class="header">Типи предметів</div>

      <div class="content">
        <app-subject-types></app-subject-types>
      </div>
    </div>
  </div>
</template>

<script>
import AppCommissions from '../commissions/AppCommissionsPage.vue'
import AppSubjects from '../subjects/AppSubjectsPage.vue'
import AppScoringSystems from '../scoringSystems/AppScoringSystems.vue'
import AppSubjectTypes from './subjectTypes/AppSubjectTypes.vue'

export default {
  name: 'SubjectsManagingPage',
  components: {
    AppCommissions,
    AppSubjects,
    AppScoringSystems,
    AppSubjectTypes,
  },
}
</script>

<style lang="less" scoped>
.subjects-managing {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 46vh 46vh;
  grid-gap: 25px;

  .section {
    background: #2C3339;
    border-radius: 5px;

    .header {
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 1.35em;
      color: #55636E;
      background: #15191C;
      border-radius: 5px;
    }

    .content {
      padding: 20px;
      overflow: auto;
      max-height: calc(100% - 60px);
    }
  }
}
</style>
