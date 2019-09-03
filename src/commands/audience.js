'use strict';

const facebookService = require('../services/facebook');

module.exports = {
  name: 'audience',
  alias: 'aud',
  run: async toolbox => {
    const { print, parameters, api } = toolbox;

    const name = parameters.first;
    const description = parameters.second;
    const action = parameters.options;

    if (action.add) {
      if (!name || !description) {
        return print.error('name and description are required');
      }

      await facebookService.addAudience({ name, description }, api);
      print.success('Audience added with success');
    }

    if (action.list) {
      const audiences = await facebookService.getAudiences(api);

      audiences.forEach(audience => {
        print.success(`id: ${audience.id} name: ${audience.name}`);
      });
    }
  }
};
