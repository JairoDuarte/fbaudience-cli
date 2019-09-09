'use strict'

const api = toolbox => {
  return toolbox.http.create({
    baseURL: 'https://graph.facebook.com/',
    headers: { Accept: 'application/json' }
  })
}

module.exports = async toolbox => {
  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  toolbox.api = api(toolbox)
  toolbox.validateEmail = email => re.test(String(email).toLowerCase())
}
