const { Env } = require('../config')

const DB_URL = process.env.DB_URL || Env.DB_URL

module.exports.init = api => {
  this.api = api(DB_URL)
}

module.exports.addJob = async ({ audienceName, jobs }) => {
  try {
    let response = await this.api.get(`/audiences/${audienceName}`)
    const audience = response.data.result

    const newJobs = audience.jobs.concat(jobs)

    response = await this.api.put(`/audiences/${audienceName}/jobs`, newJobs)
    return response
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
}

module.exports.deleteJob = async ({ audienceName, jobs }) => {
  try {
    let response = await this.api.get(`/audiences/${audienceName}/jobs`)

    const newJobs = response.data.result.filter(job => {
      if (jobs.includes(job)) return false
      return true
    })

    response = await this.api.put(`/audiences/${audienceName}/jobs`, newJobs)
    return response
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
}

module.exports.addAudience = async ({ name, id }) => {
  try {
    const response = await this.api.post(`/audiences/${name}`, { id, jobs: [name] })

    return response
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
}

module.exports.getJobsByAudience = async ({ audienceName }) => {
  try {
    let response = await this.api.get(`/audiences/${audienceName}/jobs`)

    let audienceJobs = response.data.result || []

    return audienceJobs
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
}
