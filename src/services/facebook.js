'use strict'

const { createHash } = require('crypto')

const Env = require('../../env.json')

const ACCESS_TOKEN = process.env.ACCESS_TOKEN || Env.ACCESS_TOKEN
const id = process.env.AD_ACCOUNT_ID || Env.AD_ACCOUNT_ID

const urlAudience = `v4.0/act_${id}/customaudiences`

const toHash = emails =>
  emails.map(email => {
    const hash = createHash('sha256')
    return [hash.update(email).digest('hex')]
  })

async function getAudiences(api) {
  const url = `${urlAudience}?access_token=${ACCESS_TOKEN}&fields=id,name`

  try {
    const response = await api.get(url)

    if (response.data.error) {
      console.error(response.data.error)

      process.exit(0)
    }

    return response.data.data
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
}

function getAudienceId(name, audiences = []) {
  for (let audience of audiences) {
    if (name.trim().toLocaleLowerCase() === audience.name.trim().toLocaleLowerCase()) {
      return audience.id
    }
  }
  return null
}

module.exports.addAudience = async (audience = {}, api) => {
  const body = {
    ...audience,
    subtype: 'CUSTOM',
    customer_file_source: 'USER_PROVIDED_ONLY',
    access_token: ACCESS_TOKEN
  }

  try {
    const response = await api.post(urlAudience, body)

    if (response.data.error) {
      console.error(response.data.error)

      process.exit(0)
    }

    return response.data.data
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
}

module.exports.addUsers = async (emails = [], audienceName, api) => {
  const hashEmails = toHash(emails)

  const audiences = await getAudiences(api)
  const audienceId = getAudienceId(audienceName, audiences)

  const urlUser = `v4.0/${audienceId}/users`

  const body = {
    payload: {
      schema: ['EMAIL_SHA256'],
      data: hashEmails
    },
    access_token: ACCESS_TOKEN
  }

  try {
    const response = await api.post(urlUser, body)

    if (response.data.error) {
      console.error(response.data.error)

      process.exit(0)
    }

    return response.data.data
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
}

module.exports.getAudiences = getAudiences
