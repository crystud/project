<template>
  <div class="classes-info">
    <div class="list-label">
      Успішність студентів %
    </div>

    <app-chart
      :height="300"
    ></app-chart>

    <div class="sections">
      <div class="schedule">
        <div class="list-label">Розклад занять на тиждень</div>

        <div class="week">
          <div class="day">
            <div class="list-label title">Понеділок</div>

            <div class="class" v-for="i in 4" v-bind:key="i">
              <span class="order">1</span>

              <div class="info">
                <span class="name">Name</span>

                <div>
                  <span class="icon-block">
                    <font-awesome-icon
                      icon="users"
                      class="icon"
                    ></font-awesome-icon>

                    <span class="text">П-42</span>
                  </span>

                  <span class="icon-block">
                    <font-awesome-icon
                      icon="map-marker"
                      class="icon"
                    ></font-awesome-icon>

                    <span class="text">128</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="day">
            <div class="list-label title">Вівторок</div>

            <div class="class" v-for="i in 4" v-bind:key="i">
              <span class="order">1</span>

              <div class="options-list">
                <div class="option">
                  <div class="list-label options-label">Чисельник</div>

                  <div class="info no-padding">
                    <span class="name">Name</span>

                    <div>
                      <span class="icon-block">
                        <font-awesome-icon
                          icon="users"
                          class="icon"
                        ></font-awesome-icon>

                        <span class="text">П-42</span>
                      </span>

                      <span class="icon-block">
                        <font-awesome-icon
                          icon="map-marker"
                          class="icon"
                        ></font-awesome-icon>

                        <span class="text">128</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div class="option">
                  <div class="list-label options-label">Знаменник</div>

                  <div class="info no-padding">
                    <span class="name">Name</span>

                    <div>
                      <span class="icon-block">
                        <font-awesome-icon
                          icon="users"
                          class="icon"
                        ></font-awesome-icon>

                        <span class="text">П-42</span>
                      </span>

                      <span class="icon-block">
                        <font-awesome-icon
                          icon="map-marker"
                          class="icon"
                        ></font-awesome-icon>

                        <span class="text">128</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="subjects">
        <div class="list-label">Предмети вчителя</div>

        <div class="list">
          <app-teacher-subject
            v-for="i in 15"
            v-bind:key="i"
            name="some subject name"
            :coefficient="Math.random()"
          ></app-teacher-subject>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppTeacherSubject from '@/components/teacher/AppTeacherSubject.vue'
import AppChart from '@/components/AppChart.vue'

export default {
  name: 'AppTeacherClassesInfo',
  components: {
    AppTeacherSubject,
    AppChart,
  },
}
</script>

<style lang="less" scoped>
.classes-info {
  .list-label {
    color: #576c80;
    padding: 10px;
    font-size: 1.25em;
  }

  .sections {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;

    margin-top: 10px;

    .schedule {
      padding: 0 10px;

      .week {
        .day {
          .title {
            text-align: center;
            font-size: 1.25em;
            color: #475868;
          }

          .no-padding {
            padding: 0 0 5px;
            margin: 0;
          }

          .options-label {
            padding: 5px 0 0;
            padding-left: 20px;
          }

          .option, .options-list {
            width: 100%;
            margin-right: 15px;
          }

          .class {
            width: 100%;
            background: #1b2024;
            margin-bottom: 10px;
            color: #fff;
            border-radius: 5px;

            display: flex;
            align-items: top;

            .info {
              margin-left: 20px;
              font-size: 1.1em;

              width: 100%;

              display: flex;
              justify-content: space-between;
              align-items: center;

              .icon-block {
                margin-right: 20px;

                .icon {
                  color: #2d373f;
                  margin-right: 5px;
                }

                .text {
                  color: #6f7274;
                }
              }
            }

            .order {
              display: flex;
              align-items: center;
              font-size: 1.2em;
              padding: 10px 15px;
              width: 40px;

              background: #07cc70;
              border-radius: 5px;
            }
          }
        }
      }
    }

    .subjects {
      padding: 0 10px;
    }
  }
}
</style>
