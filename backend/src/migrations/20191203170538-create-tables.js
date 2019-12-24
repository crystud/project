module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.createTable('classes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      teacherID: Sequelize.INTEGER,
      subgroups: Sequelize.BOOLEAN,
      groupID: Sequelize.INTEGER,
      subgroupID: Sequelize.INTEGER,
      subjectID: Sequelize.INTEGER,
    }, { transaction: t }),

    queryInterface.createTable('commissions', {
      id: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: Sequelize.TEXT,
    }, { transaction: t }),

    queryInterface.createTable('departments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: Sequelize.TEXT,
      description: Sequelize.TEXT,
      leaderID: Sequelize.INTEGER,
    }, { transaction: t }),

    queryInterface.createTable('groups', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      entry: Sequelize.DATE,
      graduation: Sequelize.DATE,
      specialtyID: Sequelize.INTEGER,
    }, { transaction: t }),

    queryInterface.createTable('hours', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      subjectID: Sequelize.INTEGER,
      semesterID: Sequelize.INTEGER,
      hours: Sequelize.INTEGER,
    }, { transaction: t }),

    queryInterface.createTable('lessons', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      classID: Sequelize.INTEGER,
      date: Sequelize.DATE,
      topic: Sequelize.TEXT,
      home_work: Sequelize.TEXT,
    }, { transaction: t }),

    queryInterface.createTable('marks', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      studentID: Sequelize.INTEGER,
      lessonID: Sequelize.INTEGER,
      mark: Sequelize.SMALLINT,
      type: Sequelize.ENUM('mark', 'miss'),
    }, { transaction: t }),

    queryInterface.createTable('rooms', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: Sequelize.TEXT,
      floor: Sequelize.SMALLINT,
    }, { transaction: t }),

    queryInterface.createTable('schedule', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      day: Sequelize.SMALLINT,
      classID: Sequelize.INTEGER,
      timetableID: Sequelize.SMALLINT,
      roomID: Sequelize.INTEGER,
      type: Sequelize.ENUM('numerator', 'denominator'),
    }, { transaction: t }),

    queryInterface.createTable('semesters', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      number: Sequelize.SMALLINT,
      specialtyID: Sequelize.SMALLINT,
      weeks: Sequelize.INTEGER,
    }, { transaction: t }),

    queryInterface.createTable('shortened_days', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: Sequelize.DATE,
      reason: Sequelize.TEXT,
    }, { transaction: t }),

    queryInterface.createTable('specialty', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      departmentID: Sequelize.INTEGER,
      name: Sequelize.TEXT,
    }, { transaction: t }),

    queryInterface.createTable('students', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: Sequelize.TEXT,
      groupID: Sequelize.INTEGER,
      address: Sequelize.TEXT,
      userID: Sequelize.INTEGER,
    }, { transaction: t }),

    queryInterface.createTable('subgroups', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      groupID: Sequelize.INTEGER,
      name: Sequelize.TEXT,
    }, { transaction: t }),

    queryInterface.createTable('subgroups_students', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      subgroupID: Sequelize.INTEGER,
      studentID: Sequelize.INTEGER,
    }, { transaction: t }),

    queryInterface.createTable('subject_types', {
      id: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: Sequelize.TEXT,
      coefficient: Sequelize.FLOAT,
      scoringSystemID: Sequelize.SMALLINT,
    }, { transaction: t }),

    queryInterface.createTable('subjects', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: Sequelize.TEXT,
      commissionID: Sequelize.SMALLINT,
      subjectType: Sequelize.SMALLINT,
    }, { transaction: t }),

    queryInterface.createTable('teachers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: Sequelize.TEXT,
      commissionID: Sequelize.SMALLINT,
      userID: Sequelize.INTEGER,
    }, { transaction: t }),

    queryInterface.createTable('timetable', {
      id: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
      },
      order: Sequelize.SMALLINT,
      start: Sequelize.TIME,
      finish: Sequelize.TIME,
      type: Sequelize.ENUM('fulltime', 'pertime'),
    }, { transaction: t }),

    queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: Sequelize.TEXT,
      address: Sequelize.TEXT,
      email: Sequelize.TEXT,
      password: Sequelize.TEXT,
    }, { transaction: t }),
  ])),

  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.dropTable('classes', { transaction: t }),
    queryInterface.dropTable('commissions', { transaction: t }),
    queryInterface.dropTable('departments', { transaction: t }),
    queryInterface.dropTable('groups', { transaction: t }),
    queryInterface.dropTable('hours', { transaction: t }),
    queryInterface.dropTable('lessons', { transaction: t }),
    queryInterface.dropTable('marks', { transaction: t }),
    queryInterface.dropTable('rooms', { transaction: t }),
    queryInterface.dropTable('schedule', { transaction: t }),
    queryInterface.dropTable('semesters', { transaction: t }),
    queryInterface.dropTable('shortened_days', { transaction: t }),
    queryInterface.dropTable('specialty', { transaction: t }),
    queryInterface.dropTable('students', { transaction: t }),
    queryInterface.dropTable('subgroups', { transaction: t }),
    queryInterface.dropTable('subgroups_students', { transaction: t }),
    queryInterface.dropTable('subject_types', { transaction: t }),
    queryInterface.dropTable('subjects', { transaction: t }),
    queryInterface.dropTable('teachers', { transaction: t }),
    queryInterface.dropTable('timetable', { transaction: t }),
    queryInterface.dropTable('users', { transaction: t }),
  ])),
}
