import Classes from '../../models/classes'
import Teachers from '../../models/teachers'
import Subgroups from '../../models/subgroups'
import Groups from '../../models/groups'
import Subjects from '../../models/subjects'
import Students from '../../models/students'
import Lessons from '../../models/lessons'
import Marks from '../../models/marks'
import SubjectTypes from '../../models/subject_types'
import ScoringSystems from '../../models/scoring_systems'

export default class ClassesController {
  static async checkTeacherPriviligies({ lessonID, user }) {
    try {
      const {
        userID,
        roles,
      } = user

      if (roles.includes('admin')) {
        return { hasAccess: true }
      }

      const lesson = await Lessons.findOne({
        include: [
          {
            model: Classes,
            as: 'class',
          },
        ],
        where: {
          id: lessonID,
        },
      })

      if (!lesson) {
        return { hasAccess: false }
      }

      const { teacherID } = lesson.dataValues.class.dataValues

      return {
        hasAccess: teacherID === userID,
      }
    } catch (e) {
      console.error(e)

      return { hasAccess: false }
    }
  }

  static async setMark(data) {
    const errors = []

    try {
      const {
        mark,
        studentID,
        lessonID,
        isMiss,
        user,
      } = data

      const { hasAccess } = await this.checkTeacherPriviligies({
        lessonID,
        user,
      })

      if (!hasAccess) {
        errors.push({
          msg: 'You do not have permission to set marks to this lesson',
          param: 'userID',
          location: 'roles',
        })

        return { errors }
      }

      const setAlready = await Marks.findOne({
        where: {
          studentID,
          lessonID,
          type: isMiss ? 'miss' : 'mark',
        },
      })

      if (setAlready) {
        errors.push({
          msg: 'Such mark already exists',
          location: 'body',
          param: 'lessonID',
        })

        return { errors }
      }

      const studentExists = await Students.findOne({
        where: {
          id: studentID,
        },
      })

      if (!studentExists) {
        errors.push({
          msg: 'Such student does not exists',
          param: 'studentID',
          location: 'body',
        })

        return { errors }
      }

      const lessonExists = await Lessons.findOne({
        attributes: ['date'],
        where: {
          id: lessonID,
        },
      })

      if (!lessonExists) {
        errors.push({
          msg: 'Such lesson does not exists',
          param: 'lessonID',
          location: 'body',
        })

        return { errors }
      }

      const lessonDate = new Date(lessonExists.date)
      const currentDate = new Date()

      if (currentDate < lessonDate) {
        errors.push({
          msg: 'You cannot set mark to a future lessons',
          location: 'body',
          param: 'lessonID',
        })

        return { errors }
      }

      const lesson = await Lessons.findOne({
        where: { id: lessonID },
        attributes: [],
        include: {
          model: Classes,
          as: 'class',
          attributes: ['subjectID'],
          include: {
            model: Subjects,
            as: 'subject',
            attributes: ['subjectType'],
            include: {
              model: SubjectTypes,
              as: 'subjectTypeData',
              attributes: ['scoringSystemID'],
              include: {
                model: ScoringSystems,
                as: 'scoring_system',
              },
            },
          },
        },
      })

      const {
        subject: {
          subjectTypeData: {
            scoring_system: {
              min,
              max,
            },
          },
        },
      } = lesson.class

      if (mark < min || mark > max) {
        errors.push({
          msg: `Minimum mark is ${min}. Maximum is ${max}`,
          location: 'body',
          param: 'mark',
        })

        return { errors }
      }

      const set = await Marks.create({
        studentID,
        lessonID,
        type: isMiss ? 'miss' : 'mark',
        mark: isMiss ? false : mark,
      })

      if (!set) {
        return { set: false }
      }

      return {
        set: true,
        mark: set.dataValues,
      }
    } catch (e) {
      console.error(e)

      return { set: false }
    }
  }

  static async teacherExists({ teacherID: id = 0 }) {
    const exists = await Teachers.findOne({
      where: { id },
    })

    return exists !== null
  }

  static async subgroupExists({ subgroupID: id = 0 }) {
    const exists = await Subgroups.findOne({
      where: { id },
    })

    return exists !== null
  }

  static async groupExists({ groupID: id = 0 }) {
    const exists = await Groups.findOne({
      where: { id },
    })

    return exists !== null
  }

  static async subjectExists({ subjectID: id = 0 }) {
    const exists = await Subjects.findOne({
      where: { id },
    })

    return exists !== null
  }

  static async validateClassData(classData) {
    const errors = []

    const {
      teacherID,
      subgroups,
      groupID = null,
      subgroupID = null,
      subjectID,
    } = classData

    if (subgroups && !subgroupID) {
      errors.push({
        msg: 'Class is subgroups, but subgroupID was not passed',
        location: 'body',
        param: 'subgroupID',
      })

      return { errors }
    }

    if (!subgroups && !groupID) {
      errors.push({
        msg: 'Class is not subgroups, but groupID was not passed',
        location: 'body',
        param: 'groupID',
      })

      return { errors }
    }

    if (subgroups) {
      const subgroupExists = subgroupID ? await this.subgroupExists({ subgroupID }) : null

      if (!subgroupExists) {
        errors.push({
          msg: 'Such subgroup does not exist',
          param: 'subgroupID',
          location: 'body',
        })

        return { errors }
      }
    }

    if (!subgroups) {
      const groupExists = groupID ? await this.groupExists({ groupID }) : null

      if (!groupExists) {
        errors.push({
          msg: 'Such group does not exist',
          param: 'groupID',
          location: 'body',
        })

        return { errors }
      }
    }

    const subjectExists = subjectID ? await this.subjectExists({ subjectID }) : null

    if (!subjectExists) {
      errors.push({
        msg: 'Such subject does not exist',
        param: 'subjectID',
        location: 'body',
      })

      return { errors }
    }

    const teacherExists = teacherID ? await this.teacherExists({ teacherID }) : teacherID

    if (!teacherExists) {
      errors.push({
        msg: 'Such teacher does not exist',
        param: 'teacherID',
        location: 'body',
      })

      return { errors }
    }

    return { errors }
  }

  static async create(classData) {
    const {
      teacherID,
      subgroups,
      groupID = null,
      subgroupID = null,
      subjectID,
    } = classData

    const insertData = {
      teacherID,
      subgroups,
      groupID,
      subgroupID,
      subjectID,
    }

    try {
      const { errors } = await this.validateClassData(classData)

      if (errors.length) {
        return { errors }
      }

      const classExists = await Classes.findOne({ where: insertData })

      if (classExists) {
        errors.push({
          msg: 'Such class already exists',
          param: 'groupID',
          location: 'body',
        })

        return { errors }
      }

      const create = await Classes.create(insertData)

      if (!create) {
        return { created: false }
      }

      return {
        created: true,
        class: insertData,
      }
    } catch (e) {
      console.error(e)

      return { created: false }
    }
  }

  static async edit(editClassData) {
    const {
      classID: id,
      teacherID,
      subgroups,
      groupID,
      subgroupID,
      subjectID,
    } = editClassData

    const newClassData = {
      teacherID,
      subgroups,
      groupID,
      subgroupID,
      subjectID,
    }

    try {
      const { errors } = await this.validateClassData(editClassData)

      if (errors.length) {
        return { errors }
      }

      const classExists = await Classes.findOne({ where: { id } })

      if (!classExists) {
        errors.push({
          msg: 'Such class does not exist',
          param: 'classID',
          location: 'body',
        })

        return { errors }
      }

      const teacherExists = await this.teacherExists({ teacherID })

      if (!teacherExists) {
        errors.push({
          msg: 'Such teacher does not exist',
          param: 'teacherID',
          location: 'body',
        })

        return { errors }
      }

      const [edit] = await Classes.update(newClassData, {
        where: { id },
      })

      return {
        edited: !!edit,
        class: newClassData,
      }
    } catch (e) {
      console.error(e)

      return { edited: false }
    }
  }

  static async get({ classID: id }) {
    const errors = []

    try {
      const classData = await Classes.findOne({
        where: { id },
        include: [
          {
            model: Groups,
            as: 'group',
          },
          {
            model: Subgroups,
            as: 'subgroup',
          },
          {
            model: Teachers,
            as: 'teacher',
          },
          {
            model: Subjects,
            as: 'subject',
          },
        ],
      })

      if (!classData) {
        errors.push({
          msg: 'Such class does not exist',
          param: 'classID',
          location: 'body',
        })

        return { errors }
      }

      return {
        fetched: true,
        class: classData,
      }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async getStudentInfo({ studentID, classID }) {
    try {
      const student = await Students.findOne({
        where: { id: studentID },
      })

      if (!student) {
        return {
          errors: [{
            msg: 'Such student does not exist',
            location: 'body',
            param: 'studentID',
          }],
        }
      }

      const classData = await Classes.findOne({
        where: { id: classID },
        include: {
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
      })

      const marks = await Marks.findAll({
        where: { studentID },
        include: [{
          model: Lessons,
          as: 'lesson',
          where: { classID },
        }],
        order: [
          [{
            model: Lessons,
            as: 'lesson',
          }, 'date', 'asc'],
        ],
      })

      return { marks, student, classData }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async getGroupRegisters({ groupID }) {
    const errors = []

    try {
      const groupExists = await Groups.findOne({
        where: { id: groupID },
      })

      if (!groupExists) {
        errors.push({
          msg: 'Such group does not exists',
          location: 'body',
          param: 'groupID',
        })

        return { errors }
      }

      const classes = await Classes.findAll({
        include: [
          {
            model: Subjects,
            as: 'subject',
          },
        ],
        where: { groupID },
      })

      return {
        fetched: true,
        classes,
      }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async getClassMarks({ classID }) {
    const errors = []

    try {
      const classMarks = await Classes.findOne({
        where: { id: classID },
        include: [
          {
            model: Subjects,
            as: 'subject',
          },
          {
            model: Teachers,
            as: 'teacher',
          },
          {
            model: Groups,
            as: 'group',
            include: {
              model: Students,
              as: 'students',
              include: {
                model: Marks,
                as: 'marks',
              },
            },
          },
        ],
      })

      if (!classMarks) {
        errors.push({
          msg: 'Such class does not exists',
          param: 'classID',
          location: 'body',
        })

        return { errors }
      }

      return {
        fetched: true,
        classMarks,
      }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async getStatistics({ classID }) {
    try {
      const marks = await Marks.findAll({
        attributes: ['mark', 'studentID'],
        include: {
          model: Lessons,
          as: 'lesson',
          attributes: ['date'],
          where: {
            classID,
          },
        },
      })

      return { marks }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
