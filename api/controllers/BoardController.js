/**
 * BoardController
 *
 * @description :: Server-side logic for managing boards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var forms = require('forms');
var fields = forms.fields;

module.exports = {
  new: function(req, res) {
    res.locals.flash = _.clone(req.session.flash);
    var reg_form = forms.create({
      url: fields.string({required: true}),
      title: fields.string({required: true})
    });
    res.view({
      form: reg_form
    });
    req.session.flash = {};
  },

  create: function(req, res, next) {
    Board.create(req.params.all(), function boardCreated(err, board) {
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }

        return res.redirect('/board/new');
      }
      //res.json(board);
      res.redirect('/board/show' + board.id);
      req.session.flash = {};
    })
  },

  show: function(req, res, next) {
    Board.findOne(req.param('id'), function foundBoard(err, board) {
      if (err) return next(err);
      if (!board) return next();
      res.view({
        board: board
      });
    });
  }
};
