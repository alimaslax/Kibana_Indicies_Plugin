export default function (server) {

  server.route({
    path: '/api/es-status-sao/example',
    method: 'GET',
    handler(req, reply) {
      reply({ time: (new Date()).toISOString() });
    }
  });

}
