import Subject from '../../models/subjects'

export default class SubjectController {
  static async createSubject(data) {
    const {
      name,
      commissionID,
      subjectTypeID: subjectType,
    } = data

    const subjectData = {
      name,
      commissionID,
      subjectType,
    }

    try {
      const exists = await Subject.findAll({
        where: subjectData,
      })

      if (exists.length) {
        return {
          created: false,
          msg: 'Such subject already exists',
          param: 'name',
          location: 'body',
        }
      }

      const create = await Subject.create(subjectData)

      if (!create.dataValues) {
        return { created: false }
      }

      return {
        created: true,
        subject: create.dataValues,
      }
    } catch (e) {
      return { created: false }
    }
  }

  static async editSubject(data) {
    const {
      subjectID: id,
      name,
      commissionID,
      subjectTypeID: subjectType,
    } = data

    const newData = {
      name,
      commissionID,
      subjectType,
    }

    const [edit] = await Subject.update(newData, {
      where: { id },
    })

    if (!edit) {
      return { edited: false }
    }

    return {
      edited: true,
      subject: newData,
    }
  }
}
