'use strict';

const foo = toolbox => () => {
  toolbox.print.info('called foo extension');
};

const api = toolbox => () => {
  return toolbox.http.create({
    baseURL: 'https://api.github.com',
    headers: { Accept: 'application/vnd.github.v3+json' }
  });
};

module.exports = toolbox => {
  toolbox.foo = foo(toolbox);
  toolbox.api = api(toolbox);
};
