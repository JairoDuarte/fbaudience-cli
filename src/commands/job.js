'use strict'

const databaseService = require('../services/database')

module.exports = {
  name: 'job',
  alias: 'j',
  run: async toolbox => {
    const { print, parameters, api } = toolbox
    databaseService.init(api)

    const audienceName = parameters.first
    const jobs = parameters.array.slice(1)
    const action = parameters.options

    if (action.help) {
      print.info('Example to add jobs: \nfbaudience user {audienceID} {email} {email} {othersEmails}')
      return true
    }

    if (action.add) {
      if (!audienceName || jobs.length === 0) {
        return print.error('audience name  and  jobs are required')
      }

      await databaseService.addJob({ audienceName, jobs })
      print.success('Jobs added with success')
    }

    if (action.delete) {
      const audiences = await databaseService.deleteJob({ audienceName, jobs })
      print.success('Jobs delete with success')
    }

    if (action.list) {
      const jobs = await databaseService.getJobsByAudience({ audienceName })

      print.success(`Jobs for ${audienceName} audience:`)
      for (const job of jobs) {
        print.success(job)
      }
    }
  }
}
