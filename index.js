import { resolve } from 'path';
import getDetail from './server/routes/getDetail';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'es-status-sao',
    uiExports: {

      app: {
        title: 'Indices (sao)',
        description: 'Elasticsearch Status plugin in a sao template.',
        main: 'plugins/es-status-sao/app',
	icon: 'plugins/es-status-sao/icon.svg'
      },


      translations: [
        resolve(__dirname, './translations/es.json')
      ],


    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },


    init(server, options) {
      // Add server routes and initialize the plugin here
      getDetail(server);
    }


  });
};
