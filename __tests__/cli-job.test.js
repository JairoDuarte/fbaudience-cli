const { system, filesystem } = require('gluegun')

jest.setTimeout(30000)

describe('Test command add emails', function() {
  const src = filesystem.path(__dirname, '..')

  const cli = async cmd => system.run('node ' + filesystem.path(src, 'bin', 'fbaudience') + ` ${cmd}`)

  test('should output helper', async () => {
    const output = await cli('j --help')

    expect(output).toContain('Example to add jobs')
  })

  test('should show list of job for an audience', async () => {
    await cli('aud audfrontend frontend --add')
    await cli('j audfrontend frontend --add')
    const output = await cli('j audfrontend --list')

    expect(output).toContain('Jobs for')
  })

  test('should add job to audience', async () => {
    await cli('aud audfrontend frontend --add')
    const output = await cli('j audfrontend frontend --add')

    expect(output).toContain('Jobs added with success')
  })

  test('should delete job to audience', async () => {
    const output = await cli('j audfrontend frontend --delete')

    expect(output).toContain('Jobs delete with success')
  })
})
