'use strict'

const databaseService = require('../services/database')

module.exports = {
  name: 'job',
  alias: 'j',
  description: 'add  and show jobs for an audience',
  run: async toolbox => {
    const { print, parameters, api } = toolbox
    databaseService.init(api)

    const audienceName = parameters.first
    const jobs = parameters.array.slice(1)
    const action = parameters.options

    if (action.add || action.a) {
      if (!audienceName || jobs.length === 0) {
        return print.error('audience name  and  jobs are required')
      }

      await databaseService.addJob({ audienceName, jobs })
      print.success('Jobs added with success')
    }

    if (action.delete || action.d) {
      await databaseService.deleteJob({ audienceName, jobs })
      print.success('Jobs delete with success')
    }

    if (action.list || action.l) {
      const jobs = await databaseService.getJobsByAudience({ audienceName })

      print.success(`Jobs for ${audienceName} audience:`)
      for (const job of jobs) {
        print.success(job)
      }
    }

    if (action.h || action.help) {
      print.info('usage: fbaudience j [<args>] [--] <action>')
      print.info('\t args:')
      print.info('\t \t first \t \t \t name of audience (required)')
      print.info('\t \t others \t \t name of jobs (required)')
      print.info('\t options:')
      print.info('\t \t -a, --add \t \t add jobs to audience')
      print.info('\t \t -d, --delete \t \t delete jobs in audience')
      print.info('\t \t -l, --list \t \t show  all jobs by audience \n\n')
    }
  }
}
