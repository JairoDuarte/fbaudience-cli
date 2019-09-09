'use strict'

const api = (toolbox, baseURL = 'https://graph.facebook.com/') => {
  return toolbox.http.create({
    baseURL,
    headers: { Accept: 'application/json' }
  })
}

module.exports = async toolbox => {
  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  toolbox.api = baseURL => api(toolbox, baseURL)
  toolbox.validateEmail = email => re.test(String(email).toLowerCase())
}
