const facebookService = require('../services/facebook');

module.exports = {
  name: 'audience',
  run: async toolbox => {
    const { print, parameters, api } = toolbox;

    const name = parameters.first;
    const description = parameters.second;
    const action = parameters.options;
    console.log(name, description);

    if (!name || !description) {
      return print.error('name and description are required');
    }

    if (action.add) {
      const response = await facebookService.addAudience({ name, description }, api);

      if (response.data.error) {
        const {
          data: {
            error: { message, type }
          }
        } = response;
        print.error(`Error: ${message}  ${type}`);
      } else print.success('Audience added with success');
    }
  }
};
