// eslint-disable-next-line linebreak-style
/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'POST /api/auth/register': 'AuthController.register',
  'POST /api/auth/login': 'AuthController.login',

  'POST /api/chat/:roomId/join': {
    controller: 'ChatController',
    action: 'joinRoom',
    policy: 'isAuthenticated'
  },
  'POST /api/chat/:roomId/messages': {
    controller: 'ChatController',
    action: 'sendMessage',
    policy: 'isAuthenticated'
  },
  'GET /api/chat/:roomId/messages': {
    controller: 'ChatController',
    action: 'getMessages',
    policy: 'isAuthenticated'
  }


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
