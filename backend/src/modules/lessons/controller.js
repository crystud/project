import Lessons from '../../models/lessons'
import Classes from '../../models/classes'
import Teachers from '../../models/teachers'
import Marks from '../../models/marks'
import Students from '../../models/students'
import Groups from '../../models/groups'
import Subgroups from '../../models/subgroups'
import SubgroupsStudents from '../../models/subgroups_students'
import Subjects from '../../models/subjects'
import ScoringSystems from '../../models/scoring_systems'
import SubjectTypes from '../../models/subject_types'

export default class lessonsController {
  static async checkTeacherPriviligies({ user: { userID: id, roles }, classID }) {
    const errors = []

    try {
      if (roles.includes('admin')) {
        return { hasAccess: true }
      }

      if (roles.includes('teacher')) {
        errors.push({
          msg: 'You are not a teacher',
          location: 'authorization',
          param: 'roles',
        })

        return { errors }
      }

      const teacher = await Teachers.findOne({
        attributes: ['id'],
        where: { id },
      })

      if (!teacher) {
        errors.push({
          msg: 'You are not a teacher',
          location: 'authorization',
          param: 'userID',
        })

        return { errors }
      }

      const { id: teacherID } = teacher

      const teachersClass = await Classes.findOne({
        attributes: ['id'],
        where: {
          teacherID,
          id: classID,
        },
      })

      return { hasAccess: !!teachersClass }
    } catch (e) {
      console.error(e)

      return { hasAccess: false }
    }
  }

  static async create({ data, user }) {
    const errors = []

    const { classID, date } = data

    const { hasAccess } = await this.checkTeacherPriviligies({ user, classID })

    if (!hasAccess) {
      errors.push({
        msg: 'Access denied',
        location: 'authorization',
        param: 'roles',
      })

      return { errors }
    }

    const isTaken = await Lessons.findOne({
      where: { classID, date },
      attributes: ['id'],
    })

    if (isTaken) {
      errors.push({
        msg: 'Such lesson already exist',
        param: ['classID', 'date'],
        location: 'body',
      })

      return { errors }
    }

    const created = await Lessons.create(data)

    return {
      created: !!created,
      lesson: created,
    }
  }

  static async setTopic({ data: { lessonId: id, topic }, user }) {
    const errors = []

    try {
      const lessonData = await Lessons.findOne({
        attributes: ['classID'],
        where: { id },
      })

      if (!lessonData) {
        errors.push({
          msg: 'Such lesson does not exist',
          location: 'body',
          param: 'lessonId',
        })

        return { errors }
      }

      const { classID } = lessonData

      const { hasAccess } = await this.checkTeacherPriviligies({ user, classID })

      if (!hasAccess) {
        errors.push({
          msg: 'Access denied',
          location: 'authorization',
          param: 'roles',
        })

        return { errors }
      }

      const [updated] = await Lessons.update({ topic }, {
        where: { id },
      })

      return {
        updated: !!updated,
      }
    } catch (e) {
      console.error(e)

      return { updated: false }
    }
  }

  static async setHomeWork({ data, user }) {
    const errors = []

    try {
      const { lessonId: id, homeWork } = data

      const lessonData = await Lessons.findOne({
        attributes: ['classID'],
        where: { id },
      })

      if (!lessonData) {
        errors.push({
          msg: 'Such lesson does not exist',
          location: 'body',
          param: 'lessonId',
        })

        return { errors }
      }

      const { classID } = lessonData

      const { hasAccess } = await this.checkTeacherPriviligies({ user, classID })

      if (!hasAccess) {
        errors.push({
          msg: 'Access denied',
          location: 'authorization',
          param: 'roles',
        })

        return { errors }
      }

      const [updated] = await Lessons.update({
        home_work: homeWork,
      }, {
        where: { id },
      })

      return {
        updated: !!updated,
      }
    } catch (e) {
      console.error(e)

      return { updated: false }
    }
  }

  static async getAll({ classID }) {
    try {
      const lessons = await Lessons.findAll({
        order: [['date']],
        where: { classID },
      })

      const classData = await Classes.findOne({
        where: {
          id: classID,
        },
        include: [
          {
            model: Subjects,
            as: 'subject',
            include: {
              model: SubjectTypes,
              as: 'subjectTypeData',
              include: {
                model: ScoringSystems,
                as: 'scoring_system',
              },
            },
          },
          {
            model: Teachers,
            as: 'teacher',
          },
          {
            model: Groups,
            as: 'group',
          },
          {
            model: Subgroups,
            as: 'subgroup',
          },
        ],
      })

      if (!classData) {
        return {
          errors: [{
            msg: 'Such class does not exist',
            param: 'classID',
            location: 'body',
          }],
        }
      }

      const { subgroupID, subgroups, groupID } = classData

      let students = []

      if (subgroupID && subgroups) {
        students = await SubgroupsStudents.findAll({
          where: { subgroupID },
          include: {
            model: Students,
            as: 'student',
            include: {
              model: Marks,
              as: 'marks',
            },
          },
        })
      } else {
        students = await Students.findAll({
          where: {
            groupID,
          },
          include: {
            model: Marks,
            as: 'marks',
            include: {
              model: Lessons,
              as: 'lesson',
              attributes: ['date', 'id'],
            },
          },
        })
      }

      return {
        lessons,
        classData,
        students,
      }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async deleteLesson({ lessonID: id }) {
    const errors = []

    try {
      const lesson = await Lessons.findOne({
        where: { id },
      })

      if (!lesson) {
        errors.push({
          msg: 'Such lesson does not exist',
          location: 'body',
          param: 'lessonID',
        })

        return { errors }
      }

      const hasMarks = await Marks.findOne({
        where: { lessonID: id },
      })

      if (hasMarks) {
        errors.push({
          msg: 'Impossible to delete lesson, that has marks',
          location: 'body',
          param: 'lessonID',
        })

        return { errors }
      }

      const currentDate = new Date()
      const lessonDate = new Date(lesson.date)

      if (lessonDate && currentDate > lessonDate) {
        errors.push({
          msg: 'There is no option to delete passed lesson',
          location: 'body',
          param: 'lessonID',
        })

        return { errors }
      }

      const deleting = await Lessons.destroy({
        where: { id },
      })

      return {
        isDone: !!deleting,
      }
    } catch (e) {
      console.error(e)

      return { isDone: false }
    }
  }

  static async edit(data) {
    const {
      homeWork,
      topic,
      lessonID: id,
      user,
    } = data

    const errors = []

    try {
      const lesson = await Lessons.findOne({
        where: { id },
      })

      if (!lesson) {
        errors.push({
          msg: 'Such lesson does not exist',
          location: 'body',
          param: 'lessonID',
        })

        return { errors }
      }

      const { classID } = lesson

      const { hasAccess, errors: errorsList } = await this.checkTeacherPriviligies({
        user,
        classID,
      })

      if (errorsList) {
        return { errors: errorsList }
      }

      if (!hasAccess) {
        errors.push({
          msg: 'Permission denied on editing this lesson',
          location: 'body',
          param: 'lessonID',
        })

        return { errors }
      }

      const [edited] = await Lessons.update({
        home_work: homeWork,
        topic,
      }, {
        where: { id },
      })

      return {
        edited: !!edited,
      }
    } catch (e) {
      console.error(e)

      return { isDone: false }
    }
  }
}
