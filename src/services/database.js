const Env = require('../../env.json')
const DB_URL = process.env.DB_URL || Env.DB_URL

module.exports.init = api => {
  this.api = api(DB_URL)
}

module.exports.addJob = async ({ audience, jobs }) => {
  try {
    let audiences = await this.getAudiences(this.api)

    let audienceJobs = audiences[audience] || []

    audiences[audience] = audienceJobs.concat(jobs)

    const response = await this.api.post('/', { audiences })
    return response
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
}

module.exports.deleteJob = async ({ audience, jobs }) => {
  try {
    let audiences = await this.getAudiences()

    let audienceJobs = audiences[audience]

    audiences[audience] = audienceJobs.filter(job => {
      if (jobs.includes(job)) return false
      return true
    })

    const response = await this.api.post('/', { audiences })
    return response
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
}

module.exports.addAudience = async ({ audience }) => {
  try {
    let audiences = await this.getAudiences()

    audiences[audience] = [audience]

    const response = await this.api.post('/', { audiences })

    return response
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
}

module.exports.getJobsByAudience = async ({ audience }) => {
  try {
    let audiences = await this.getAudiences()

    let audienceJobs = audiences[audience] || []

    return audienceJobs
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
}

module.exports.getAudiences = async () => {
  const response = await this.api.get()
  return response.data['result'] ? response.data['result']['audiences'] : {}
}
