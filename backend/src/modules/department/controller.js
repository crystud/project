import Departments from '../../models/departments'
import Teachers from '../../models/teachers'

export default class DepartmentsController {
  static async create(department) {
    const {name, leaderID} = department

    const errors = []
    
    const nameIsFree = await Departments.findAll({
      attributes: ['id'],
      where:{
        name
      }
    })
    console.log(nameIsFree)
    if (nameIsFree.length){
      errors.push({
        msg: 'This department exists',
        param: 'name',
        location: 'body',
      })

      return { errors }
    }

    const leader = await Teachers.findAll({
      attributes: ['id'],
      where:{
        id: leaderID
      }
    })
    
    if (leader.length){
      errors.push({
        msg: 'The teacher doesn`t exist',
        param: 'leaderID',
        location: 'body',
      })

      return {errors}
    }

    const created = await Departments.create(department)

    if (!created){
      return { created: false }
    }
    
    return {
      created: true,
      department
    }
  }

  static async edit(department) {
    const {id, name, description, leaderID} = department
    
    const updated = await Departments.update({ name, description, leaderID }, {
      where: {
        id 
      },
    })

    if (!updated){
      return { updated: false }
    }
    
    return {
      updated: true,
      department
    }
  }
}