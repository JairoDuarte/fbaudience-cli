const { system, filesystem } = require('gluegun')

describe('Test command add emails', function() {
  const src = filesystem.path(__dirname, '..')

  const cli = async cmd => system.run('node ' + filesystem.path(src, 'bin', 'fbaudience') + ` ${cmd}`)

  test('should output helper', async () => {
    const output = await cli('u --help')

    expect(output).toContain('Example to add emails')
  })

  test('should add emails to audience', async () => {
    await cli('audience addEmailstest description --add')
    const output = await cli('u addEmailstest test@gmail.com unitedremote@gmail.com')

    expect(output).toContain('Emails added with success')
  })
})
