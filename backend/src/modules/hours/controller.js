import Hours from '../../models/hours'
import Classes from '../../models/classes'
import Subjects from '../../models/subjects'
import Schedule from '../../models/schedule'

export default class HoursController {
  static async create({ hours, semesterID, subjectID }) {
    const errors = []

    try {
      const exists = await Hours.findAll({
        where: {
          subjectID,
          semesterID,
        },
      })

      if (exists.length) {
        errors.push({
          location: 'body',
          param: ['subjectID', 'semesterID'],
          msg: 'Hours with such semester and subject already exists',
        })

        return { errors }
      }

      const create = await Hours.create({
        hours,
        semesterID,
        subjectID,
      })

      return {
        created: !!create,
        hours: create || null,
      }
    } catch (e) {
      return { created: false }
    }
  }

  static async edit(data) {
    const {
      hoursID: id,
      hours,
      semesterID,
      subjectID,
    } = data

    const newData = {
      hours,
      semesterID,
      subjectID,
    }

    try {
      const [edit] = await Hours.update(newData, {
        where: { id },
      })

      return {
        edited: !!edit,
        hours: newData || null,
      }
    } catch (e) {
      return { edited: false }
    }
  }

  static async get({ semesterID, subjectID }) {
    try {
      const hours = await Hours.findOne({
        where: { semesterID, subjectID },
      })

      return { hours }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async calculate({ groupID, semesterID }) {
    try {
      const classes = await Classes.findAll({
        where: {
          groupID,
          subgroups: 0,
        },
        include: [
          {
            model: Subjects,
            as: 'subject',
            include: {
              model: Hours,
              as: 'hours',
              where: {
                semesterID,
              },
            },
          },
          {
            model: Schedule,
            as: 'schedule',
          },
        ],
      })

      const results = []

      classes.forEach(({ subject }) => {
        if (!subject) {
          results.push({
            problems: true,
          })
        }
      })

      return { classes }
    } catch (e) {
      console.error(e)

      return { calculated: false }
    }
  }
}
