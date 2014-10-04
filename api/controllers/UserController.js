/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  // To trigger this action locally, visit: 'http://localhost:port/user/index'
  index: function(req,res) {    
    // This will render the view: /var/www/sails-test/views/user/index.ejs
    User.find().exec(function(err, users) {
      res.view({
        users: users
      });
    });
  },

  // To trigger this action locally, visit: 'http://localhost:port/user/show'
  show: function(req,res) {
    // This will render the view: /var/www/sails-test/views/user/show.ejs
    res.view();
  },

  // To trigger this action locally, visit: 'http://localhost:port/user/edit'
  edit: function(req,res) {    
    // This will render the view: /var/www/sails-test/views/user/edit.ejs
    res.view();
  },

  // To trigger this action locally, visit: 'http://localhost:port/user/delete'
  delete: function(req,res) {    
    // This will render the view: /var/www/sails-test/views/user/delete.ejs
    res.view();
  },

};
