import { Op } from 'sequelize'

import Subject from '../../models/subjects'
import Commissions from '../../models/commissions'
import SubjectTypes from '../../models/subject_types'
import ScoringSystems from '../../models/scoring_systems'
import Hours from '../../models/hours'
import Groups from '../../models/groups'
import Semesters from '../../models/semesters'
import Classes from '../../models/classes'
import Subgroups from '../../models/subgroups'

export default class SubjectController {
  static async createSubject(data) {
    const errors = []

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
      const exists = await Subject.findOne({
        where: subjectData,
      })

      if (exists) {
        errors.push({
          msg: 'Such subject already exists',
          param: 'name',
          location: 'body',
        })

        return { errors }
      }

      const create = await Subject.create(subjectData)

      return {
        created: !!create,
        subject: create || null,
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

    return {
      edited: !!edit,
      subject: newData,
    }
  }

  static async get({ subjectID: id }) {
    const errors = []

    try {
      const subject = await Subject.findOne({
        where: { id },
        include: [
          {
            as: 'commission',
            model: Commissions,
          },
          {
            as: 'subjectTypeData',
            model: SubjectTypes,
            include: {
              as: 'scoring_system',
              model: ScoringSystems,
            },
          },
        ],
      })

      if (!subject) {
        errors.push({
          msg: 'Such subject does not exist',
          param: 'subjectID',
          location: 'body',
        })

        return { errors }
      }

      return { subject }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async getAll() {
    try {
      const subjects = await Subject.findAll({
        order: [['id', 'DESC']],
        include: [
          {
            model: Commissions,
            as: 'commission',
            required: true,
          },
          {
            model: SubjectTypes,
            as: 'subjectTypeData',
            include: {
              model: ScoringSystems,
              as: 'scoring_system',
            },
            required: true,
          },
        ],
      })

      return { subjects }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async getSubjectsOnGroup({ groupID }) {
    try {
      const subgroupsList = await Subgroups.findAll({
        where: { groupID },
      })

      const mapped = subgroupsList.map((subgroup) => subgroup.id)

      const groupClasses = await Subject.findAll({
        include: [
          {
            model: Classes,
            as: 'class',
            where: {
              [Op.or]: {
                groupID,
                subgroupID: {
                  [Op.or]: mapped,
                },
              },
            },
            required: true,
          },
        ],
      })

      return {
        subjects: [
          ...groupClasses,
        ],
      }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async getGroupAvailableSubjects({ groupID }) {
    try {
      const groupData = await Groups.findOne({
        where: { id: groupID },
      })

      if (!groupData) {
        return {
          errors: [{
            msg: 'Such group does not exist',
            location: 'body',
            param: 'groupID',
          }],
        }
      }

      const subjects = await Semesters.findAll({
        where: {
          specialtyID: groupData.specialtyID,
        },
        include: [
          {
            model: Hours,
            as: 'hours',
            required: true,
            include: {
              model: Subject,
              as: 'subject',
              required: true,
            },
          },
        ],
      })

      return { subjects }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
