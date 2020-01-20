import Specialty from '../../models/specialty'
import Departments from '../../models/departments'
import Groups from '../../models/groups'

export default class SpecialtysController {
  static async createSpecialty(data) {
    const errors = []

    try {
      const exists = await Specialty.findAll({
        where: data,
      })

      if (exists.length) {
        errors.push({
          msg: 'Specialty with such data already exist',
          location: 'body',
          param: 'name',
        })

        return { errors }
      }

      const create = await Specialty.create(data)

      return {
        created: !!create,
        specialty: create || null,
      }
    } catch (e) {
      console.error(e)

      return { created: false }
    }
  }

  static async editSpecialty(data) {
    const {
      name,
      departmentID,
      symbol,
      specialtyID: id,
    } = data

    try {
      const [update] = await Specialty.update({
        name,
        departmentID,
        symbol,
      }, {
        where: { id },
      })

      return {
        updated: !!update,
        specialty: update ? data : null,
      }
    } catch (e) {
      return { updated: false }
    }
  }

  static async get({ specialtyID: id }) {
    const errors = []

    try {
      const specialty = await Specialty.findOne({
        where: { id },
        include: {
          model: Departments,
          as: 'department',
        },
      })

      if (!specialty) {
        errors.push({
          msg: 'Such specialty does not exist',
          param: 'specialtyID',
          location: 'body',
        })

        return { errors }
      }

      return { specialty }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async list({ departmentID }) {
    try {
      const specialtys = await Specialty.findAll({
        order: [['name']],
        where: { departmentID },
      })

      return { specialtys }
    } catch (e) {
      console.error(e)

      return { fetched: false }
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

  static async getAll() {
    try {
      const resultsRaw = await Specialty.findAll({
        order: [['name']],
        include: {
          model: Groups,
          as: 'groups',
        },
      })

      const specialtys = []

      resultsRaw.forEach((item) => {
        const { groups, symbol } = item

        const newGroups = []

        groups.forEach((groupRaw) => {
          const {
            id,
            entry,
            graduation,
            number,
          } = groupRaw.toJSON()

          const name = this.getGroupName({
            entry,
            graduation,
            number,
            symbol,
          })

          newGroups.push({
            id,
            entry,
            graduation,
            number,
            name,
          })
        })

        specialtys.push({
          ...item.toJSON(),
          groups: newGroups,
        })
      })

      return { specialtys }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
