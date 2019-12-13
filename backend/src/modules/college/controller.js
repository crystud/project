import Students from '../../models/students'
import Teachers from '../../models/teachers'
import Specialty from '../../models/specialty'
import Departments from '../../models/departments'
import Rooms from '../../models/rooms'
import Subjects from '../../models/subjects'
import Groups from '../../models/groups'
import Commissions from '../../models/commissions'

export default class CollegeController {
  static async getStats() {
    try {
      const [
        students,
        teachers,
        specialtys,
        departments,
        rooms,
        subjects,
        groups,
        commissions,
      ] = await Promise.all([
        Students.count(),
        Teachers.count(),
        Specialty.count(),
        Departments.count(),
        Rooms.count(),
        Subjects.count(),
        Groups.count(),
        Commissions.count(),
      ])

      return {
        students,
        teachers,
        specialtys,
        departments,
        rooms,
        subjects,
        groups,
        commissions,
      }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
