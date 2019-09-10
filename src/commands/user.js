'use strict'

const facebookService = require('../services/facebook')

module.exports = {
  name: 'user',
  alias: 'u',
  run: async toolbox => {
    const { print, parameters, api, validateEmail } = toolbox

    const emailsList = parameters.array.slice(1)
    const audienceName = parameters.first
    const action = parameters.options

    if (action.help) {
      print.info('Example to add emails: \nfbaudience user {audienceID} {email} {email} {othersEmails}')
      return true
    }

    let invalidEmails = []

    let validEmails = emailsList.filter(email => {
      if (validateEmail(email)) {
        return true
      }
      invalidEmails.push(email)
      return false
    })

    if (invalidEmails.length > 0) {
      print.error('Invalids Emails:')
      invalidEmails.forEach(email => print.error(email))
    }

    if (validEmails.length > 0) {
      await facebookService.addUsers(validEmails, audienceName, api())

      print.success('Emails added with success')
    }
  }
}
