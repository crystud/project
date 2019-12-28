import { Model, DataTypes } from 'sequelize'
import Teachers from './teachers'
import Groups from './groups'
import Subgroups from './subgroups'
import Subjects from './subjects'
import sequelize from '../database'
import SubgroupsStudents from './subgroups_students'

class Classes extends Model {}
Classes.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teacherID: {
    type: DataTypes.INTEGER,
    references: {
      model: Teachers,
      key: 'id',
    },
  },
  subgroups: DataTypes.BOOLEAN,
  groupID: {
    type: DataTypes.INTEGER,
    references: {
      model: Groups,
      key: 'id',
    },
  },
  subgroupID: {
    type: DataTypes.INTEGER,
    references: {
      model: Subgroups,
      key: 'id',
    },
  },
  subjectID: {
    type: DataTypes.INTEGER,
    references: {
      model: Subjects,
      key: 'id',
    },
  },
},
{
  sequelize,
  modelName: 'classes',
})

Groups.hasMany(Classes, {
  foreignKey: 'groupID',
  as: 'classes',
})

Classes.hasOne(Groups, {
  foreignKey: 'id',
})

Classes.belongsTo(Subgroups, {
  foreignKey: 'subgroupID',
})

Subgroups.hasOne(Classes, {
  foreignKey: 'subgroupID',
  as: 'class',
})

Classes.belongsTo(Teachers, {
  foreignKey: 'teacherID',
  as: 'teacher',
})

Classes.belongsTo(Subjects, {
  foreignKey: 'subjectID',
})

Subjects.belongsTo(Classes, {
  foreignKey: 'id',
  targetKey: 'subjectID',
  as: 'class',
})

Teachers.belongsTo(Classes, {
  foreignKey: 'id',
  as: 'class',
})

SubgroupsStudents.belongsTo(Subgroups, {
  id: 'subgroupID',
  as: 'subgroup',
})

export default Classes
