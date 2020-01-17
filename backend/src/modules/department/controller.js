import Departments from '../../models/departments'
import Teachers from '../../models/teachers'
import Specialty from '../../models/specialty'
import Groups from '../../models/groups'
import Students from '../../models/students'

export default class DepartmentsController {
  static async create(department) {
    const { name, leaderID } = department

    const errors = []

    const nameIsFree = await Departments.findAll({
      attributes: ['id'],
      where: {
        name,
      },
    })

    if (nameIsFree.length) {
      errors.push({
        msg: 'This department exists',
        param: 'name',
        location: 'body',
      })

      return { errors }
    }

    const leader = await Teachers.findAll({
      attributes: ['id'],
      where: {
        id: leaderID,
      },
    })

    if (!leader.length) {
      errors.push({
        msg: 'The teacher doesn`t exist',
        param: 'leaderID',
        location: 'body',
      })

      return { errors }
    }

    const created = await Departments.create(department)

    return {
      created: !!created,
      department: created,
    }
  }

  static async edit(department) {
    const {
      id,
      name,
      description,
      leaderID,
    } = department

    const [updated] = await Departments.update({
      name,
      description,
      leaderID,
    }, {
      where: { id },
    })

    return {
      updated: !!updated,
      department,
    }
  }

  static getGroupName(data) {
    const {
      number,
      entry,
      symbol,
      graduation,
    } = data

    const graduationTime = new Date(graduation)
    const entryTime = new Date(entry)
    const currentTime = new Date()

    if (currentTime > graduationTime) {
      const stringEntryTime = `${entryTime.getUTCDate()}/${entryTime.getUTCMonth()}/${entryTime.getFullYear()}`
      const stringGraduationTime = `${graduationTime.getUTCDate()}/${graduationTime.getUTCMonth()}/${graduationTime.getFullYear()}`

      const lastGroupStudyYear = graduationTime.getFullYear() - entryTime.getFullYear()

      return `[${stringEntryTime} - ${stringGraduationTime}] ${symbol}-${lastGroupStudyYear}${number}`
    }

    entryTime.setDate(graduationTime.getDate())
    entryTime.setMonth(graduationTime.getMonth())

    const groupYears = Math.ceil(((currentTime - entryTime) / 1000) / 60 / 60 / 24 / 365)

    return `${symbol}-${groupYears}${number}`
  }

  static async get({ departmentID: id }) {
    try {
      const departmentData = await Departments.findOne({
        where: { id },
        include: [
          {
            model: Teachers,
            as: 'leader',
          },
          {
            model: Specialty,
            as: 'specialtys',
            include: {
              model: Groups,
              as: 'groups',
              include: {
                model: Students,
                as: 'students',
                attributes: ['id'],
              },
            },
          },
        ],
      })

      const department = departmentData.toJSON()

      department.specialtys.forEach(({ symbol }, index) => {
        department.specialtys[index].groups.forEach((groupData, groupIndex) => {
          const { entry, graduation, number } = groupData

          department.specialtys[index].groups[groupIndex].name = this.getGroupName({
            entry,
            graduation,
            number,
            symbol,
          })
        })
      })

      return { department }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async getAll() {
    try {
      const departments = await Departments.findAll({
        order: [['name']],
        include: [
          {
            model: Teachers,
            as: 'leader',
          },
          {
            model: Specialty,
            as: 'specialtys',
            attributes: ['id', 'name'],
          },
        ],
      })

      return { departments }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
