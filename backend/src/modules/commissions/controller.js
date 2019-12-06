import Commissions from '../../models/commissions'

export default class CommissionsController {
  static async create(commission) {
    const { name } = commission
    const errors = []

    const nameIsFree = await Commissions.findAll({
      attributes: ['id'],
      where: {
        name,
      },
    })

    if (nameIsFree.length) {
      errors.push({
        msg: 'Name is used',
        param: 'name',
        location: 'body',
      })

      return { errors }
    }

    const created = await Commissions.create({ name })

    if (!created.dataValue) {
      return { created: false }
    }

    return commission
  }

  static async edit({ id, name }) {
    const [update] = await Commissions.update({ name }, {
      where: { id },
    })

    if (!update) {
      return { informationWasUpdated: false }
    }

    return {
      informationWasUpdated: true,
      commision: {
        id,
        name,
      },
    }
  }
}
