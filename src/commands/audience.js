'use strict'

const facebookService = require('../services/facebook')
const databaseService = require('../services/database')

module.exports = {
  name: 'audience',
  alias: 'a',
  description: 'Add and show audiences',
  run: async toolbox => {
    const { print, parameters, api } = toolbox
    databaseService.init(api)

    const name = parameters.first
    const description = parameters.second
    const action = parameters.options

    if (action.add || action.a) {
      const apiService = api()
      if (!name || !description) {
        return print.error('name and description are required')
      }

      const { id } = await facebookService.addAudience({ name, description }, apiService)

      await databaseService.addAudience({ name, id })
      print.success('Audience added with success')
    }

    if (action.list || action.l) {
      const apiService = api()

      const audiences = await facebookService.getAudiences(apiService)

      audiences.forEach(audience => {
        print.success(`id: ${audience.id} name: ${audience.name}`)
      })
    }

    if (action.delete || action.d) {
      const response = await databaseService.deleteAudience({ audienceName: name })

      return response.status === 201 ? print.success('audience delete with success') : print.error(response)
    }

    if (action.h || action.help) {
      print.info('usage: fbaudience a [<args>] [--] <action>')
      print.info('\t args:')
      print.info('\t \t first \t \t \t name of audience (required)')
      print.info('\t \t second \t \t description of audience (required)')
      print.info('\t options:')
      print.info('\t \t -a, --add \t \t add an audience to facebook')
      print.info('\t \t -l, --list \t \t show  all audiences in facebook \n\n')
    }
  }
}
