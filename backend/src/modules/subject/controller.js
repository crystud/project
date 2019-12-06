import Subject from '../../models/subjects'

export default class SubjectController {
  static async createSubject({ name, commissionID, subjectTypeID: subjectType }) {
    const create = await Subject.create({
      name,
      commissionID,
      subjectType,
    })

    if (!create.dataValues) {
      return { created: false }
    }

    return {
      created: true,
      subject: create.dataValues,
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
