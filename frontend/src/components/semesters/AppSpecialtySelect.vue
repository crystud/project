<template>
  <div class="specialty-select">
    <div
      class="selector"
      :style="`
        top: ${offsetTop}px;
        height: ${height}px`"
      ref="selector"
    ></div>

    <div class="department-block" v-for="({ name, specialtys }, i) in departments" v-bind:key="i">
      <div class="title">{{name}}</div>

      <div class="specialtys">
        <div
          class="specialty"
          v-for="({ name: specialtyName, id }, index) in specialtys"
          v-bind:key="index"
          :data-id="id"
          :data-name="specialtyName"
          @click="setItem"
        >{{specialtyName}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppSpecialtySelect',
  data() {
    return {
      offsetTop: 0,
      height: 0,
    }
  },
  computed: {
    ...mapGetters({
      departments: 'departments/list',
    }),
  },
  methods: {
    ...mapActions({
      loadDepartmnets: 'departments/loadDepartments',
      nullSemester: 'semesters/setNoSemester',
    }),
    setItem({ target }) {
      const { dataset: { id: specialtyID, name } } = target

      if (!specialtyID) return

      this.nullSemester()

      this.offsetTop = target.offsetTop
      this.height = target.clientHeight


      this.$emit('onSet', {
        specialtyID,
        name,
      })
    },
  },
  created() {
    this.loadDepartmnets()
  },
}
</script>

<style lang="less" scoped>
.specialty-select {
  background: #15191C;
  position: relative;
  border-radius: 8px;
  user-select: none;

  .selector {
    width: 5px;
    height: 25px;
    background: #854040;
    border-radius: 6px;

    position: absolute;
    top: 0;
    left: 0;

    transition: all .3s;
  }

  .department-block {
    border-bottom: 1px solid #293137;

    .title {
      font-size: 1.1em;
      color: #55636E;
      padding: 10px;
      border-bottom: 1px solid #293137;
    }

    .specialty {
      padding: 10px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
