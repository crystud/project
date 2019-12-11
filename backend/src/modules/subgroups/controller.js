import Subgroups from '../../models/subgroups'
import Groups from '../../models/groups'
import Students from '../../models/students'
import SubgroupsStudents from '../../models/subgroups_students'

export default class SubgroupsController {
  static async create({ groupID }) {
    const errors = []

    try {
      const exists = await Groups.findOne({
        where: { id: groupID },
      })

      if (!exists) {
        errors.push({
          msg: 'Such group does not exist',
          param: 'groupID',
          location: 'body',
        })

        return { errors }
      }

      const create = await Subgroups.create({ groupID })

      return {
        created: !!create,
        subgroup: create || null,
      }
    } catch (e) {
      console.error(e)

      return { created: false }
    }
  }

  static async addStudent({ studentID, subgroupID }) {
    const errors = []

    try {
      const studentExists = await Students.findOne({
        where: {
          id: studentID,
        },
      })

      if (!studentExists) {
        errors.push({
          msg: 'Such student does not exist',
          location: 'body',
          param: 'studentID',
        })

        return { errors }
      }

      const subgroupExists = await Subgroups.findOne({
        where: { id: subgroupID },
      })

      if (!subgroupExists) {
        errors.push({
          msg: 'Such subgroup does not exist',
          location: 'body',
          param: 'studentID',
        })

        return { errors }
      }

      const insertData = { studentID, subgroupID }

      const recordExists = await SubgroupsStudents.findOne({
        where: insertData,
      })

      if (recordExists) {
        errors.push({
          msg: 'Student is already in subgroup',
          location: 'body',
          param: 'studentID',
        })

        return { errors }
      }

      const create = await SubgroupsStudents.create(insertData)

      return {
        added: !!create,
        subgroupStudent: create || null,
      }
    } catch (e) {
      console.error(e)

      return { added: false }
    }
  }

  static async removeStudent({ studentID, subgroupID }) {
    try {
      const deleteSubgroupStudent = await SubgroupsStudents.destroy({
        where: {
          studentID,
          subgroupID,
        },
      })

      return {
        deleted: !!deleteSubgroupStudent,
      }
    } catch (e) {
      console.error(e)

      return { deleted: false }
    }
  }

  static async get({ subgroupID: id }) {
    const errors = []

    try {
      const subgroup = await Subgroups.findOne({
        where: { id },
        include: {
          model: SubgroupsStudents,
          as: 'students',
          include: {
            model: Students,
            as: 'studentData',
          },
        },
      })

      if (!subgroup) {
        errors.push({
          msg: 'Such subgroup does not exist',
          param: 'subgroupID',
          location: 'body',
        })

        return { errors }
      }

      return {
        fetched: !!subgroup,
        subgroup,
      }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
