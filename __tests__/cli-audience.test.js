const { system, filesystem } = require('gluegun');

describe('Test command add audience', function() {
  const src = filesystem.path(__dirname, '..');

  const cli = async cmd => system.run('node ' + filesystem.path(src, 'bin', 'fbaudience') + ` ${cmd}`);

  test('outputs name and description are required', async () => {
    const output = await cli(' audience audiencetest --add');

    expect(output).toContain('name and description are required');
  });

  test('should add audience', async () => {
    const output = await cli(' audience audiencetest audiencetest --add');

    expect(output).toContain('Audience added with success');
  });

  test('should list all audience', async () => {
    const output = await cli(' audience   --list');

    expect(output).toContain(' name');
  });
});
