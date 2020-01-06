<template>
  <div class="subgroup">
    <div
      class="wrap"
      :class="!groupID ? 'hidden' : ''"
    >
      <div v-if="selectedSubgroup && subgroup.id">
        <div class="header">
          <span class="name item">{{subgroup.name || '-'}}</span>
          <span
            class="edit item"
            @click="showEditSubgroup = true"
          >
            <font-awesome-icon
              icon="edit"
            ></font-awesome-icon>
          </span>
        </div>

        <div class="students-list" v-if="subgroup.group">
          <app-list-item
            class="student"
            :class="checkUserInSubgroup(student.id) ? 'shadow' : ''"
            v-for="student in subgroup.group.students"
            v-bind:key="student.id"
            :borderColor="checkUserInSubgroup(student.id) ? '#23c9cf' : 'transparent'"
            @click="toggleSubgroupStudent({
              studentID: student.id,
            })"
          >
            <div class="image"></div>

            <div class="info">
              <div class="name">{{student.name}}</div>
              <div class="additional">{{student.address}}</div>
            </div>
          </app-list-item>
        </div>
      </div>

      <div class="subgroups-list">
        <app-list-item
          class="subgroup"
          v-for="subgroup in (groupID ? subgroups : [])"
          v-bind:key="subgroup.id"
          :borderColor="subgroup.id === selectedSubgroup ? '#23c9cf' : 'transparent'"
          @click="selectSubgroup(subgroup.id)"
        >
          <span class="name">{{subgroup.name}}</span>
        </app-list-item>

        <app-list-item
          class="subgroup"
          borderColor="#cf8d23"
          @click="groupID ? showCreateSubgroup = true : null"
        >
          <span class="create-label">Створити підгрупу</span>
        </app-list-item>
      </div>
    </div>

    <app-create-subgroup
      :groupID="groupID"
      :show="showCreateSubgroup"
      @cancel="showCreateSubgroup = false"
      @created="updateGroup"
    ></app-create-subgroup>

    <app-edit-subgroup
      :subgroupID="selectedSubgroup"
      :currentName="subgroup.name || ''"
      :show="showEditSubgroup"
      @saved="updateAll"
      @cancel="showEditSubgroup = false"
    ></app-edit-subgroup>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppListItem from './AppListItem.vue'
import AppCreateSubgroup from './AppCreateSubgroup.vue'
import AppEditSubgroup from './AppEditSubgroup.vue'

export default {
  name: 'AppSubgroup.vue',
  components: {
    AppCreateSubgroup,
    AppEditSubgroup,
    AppListItem,
  },
  data() {
    return {
      selectedSubgroup: 0,
      showCreateSubgroup: false,
      showEditSubgroup: false,
    }
  },
  computed: {
    ...mapGetters({
      subgroups: 'subgroups/list',
      subgroup: 'subgroups/subgroup',
    }),
  },
  props: {
    groupID: {
      type: Number,
      required: true,
    },
  },
  watch: {
    groupID() {
      const { groupID } = this

      this.loadAll({ groupID })
    },
  },
  methods: {
    ...mapActions({
      loadAll: 'subgroups/loadAll',
      loadSubgroup: 'subgroups/get',
      removeStudent: 'subgroups/removeStudent',
      insertStudent: 'subgroups/insertStudent',
    }),
    async toggleSubgroupStudent({ studentID }) {
      const isRemove = this.checkUserInSubgroup(studentID)
      const { selectedSubgroup: subgroupID } = this

      if (isRemove) {
        await this.removeStudent({ studentID, subgroupID })
      } else {
        await this.insertStudent({ studentID, subgroupID })
      }

      await this.loadSubgroup({ subgroupID })
    },
    updateAll() {
      const {
        groupID,
        selectedSubgroup: subgroupID,
      } = this

      Promise.all([
        this.loadAll({ groupID }),
        this.loadSubgroup({ subgroupID }),
      ]).then(() => {
        this.showEditSubgroup = false
      })
    },
    updateGroup() {
      const { groupID } = this

      this.loadAll({ groupID }).then(() => {
        this.showCreateSubgroup = false
      })
    },
    checkUserInSubgroup(studentID) {
      const { subgroup } = this

      if (!subgroup.students) return false

      let hasFound = false

      subgroup.students.forEach(({ studentID: subgroupStudentID }) => {
        if (subgroupStudentID === studentID) {
          hasFound = true
        }
      })

      return hasFound
    },
    selectSubgroup(subgroupID) {
      if (subgroupID === this.selectedSubgroup) return

      this.loadSubgroup({ subgroupID }).then(() => {
        this.selectedSubgroup = subgroupID
      })
    },
  },
}
</script>

<style lang="less" scoped>
.subgroup {
  .wrap {
    opacity: 1;
    transition: all .3s;
  }

  .hidden {
    opacity: .075;
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .item {
      height: 50px;
      color: #fff;
      background: var(--color-bg-dark);
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .name {
      margin-right: 10px;
      padding: 10px 15px;
      font-size: 1.4em;
    }

    .edit {
      width: 50px;
      cursor: pointer;
      font-size: 1.1em;
    }
  }

  .students-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;

    background: var(--color-bg-dark);
    padding: 15px;
    margin-bottom: 20px;
    color: #fff;

    &, .student {
      border-radius: 8px;
    }

    .student {
      align-items: center;
      display: flex;
      cursor: pointer;
      box-shadow: 0 0 0 transparent;
      transition: all .3s;

      &.shadow {
        box-shadow: 0px 0px 20px rgba(35, 201, 207, .1);
      }

      .image {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--color-bg-dark);
        flex-shrink: 0;
      }

      .info {
        margin-left: 15px;

        .name {
          font-size: 1.1em;
        }

        .additional {
          color: var(--color-font-dark);
        }
      }
    }
  }

  .subgroups-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 15px;

    .subgroup {
      background: var(--color-bg-dark);
      cursor: pointer;

      .create-label {
        color: var(--color-font-dark);
      }
    }
  }
}
</style>
