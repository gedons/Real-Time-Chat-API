/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // eslint-disable-next-line linebreak-style
  // '*': true,


  AuthController: {
    '*': true, // Allow all actions in AuthController
  },
  ChatController: {
    '*': 'isAuthenticated', // Protect all actions in ChatController
  },
  // Add additional controllers and their policies as needed
  UserController: {
    '*': 'isAuthenticated',
  }
};
