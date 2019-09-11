'use strict'

const facebookService = require('../services/facebook')
const databaseService = require('../services/database')

module.exports = {
  name: 'audience',
  alias: 'aud',
  run: async toolbox => {
    const { print, parameters, api } = toolbox
    databaseService.init(api)

    const name = parameters.first
    const description = parameters.second
    const action = parameters.options

    if (action.add) {
      const apiService = api()
      if (!name || !description) {
        return print.error('name and description are required')
      }

      const { id } = await facebookService.addAudience({ name, description }, apiService)

      await databaseService.addAudience({ name, id })
      print.success('Audience added with success')
    }

    if (action.list) {
      const apiService = api()

      const audiences = await facebookService.getAudiences(apiService)

      audiences.forEach(audience => {
        print.success(`id: ${audience.id} name: ${audience.name}`)
      })
    }
  }
}
