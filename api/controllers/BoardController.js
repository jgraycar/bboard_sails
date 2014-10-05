/*jslint node:true */
"use strict";

/**
 * BoardController
 *
 * @description :: Server-side logic for managing boards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var forms = require('forms');
var fields = forms.fields;
var sh = require('shorthash');

module.exports = {
  new: function (req, res) {
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

  create: function (req, res, next) {
    var file = req.params['image'];
    var date = new Date();
    var hash = sh.unique(date.toString());
    var boardParams = {url: hash};
    Board.create(boardParams, function boardCreated(err, board) {
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }

        return res.redirect('/board/new');
      }
      res.redirect('/board/show/' + board.url);
      req.session.flash = {};
    })
  },

  edit: function(req, res, next) {
    Board.findOne(req.param('id'), function foundBoard(err, board) {
      if (err) return next(err);
      if (!board) return next('Board doesn\'t exit yo');
      var reg_form = forms.create({
        url: fields.string({required: true}),
        title: fields.string({required: true})
      });
      res.view({
        form: reg_form,
        board: board
      });
    });
  },

  update: function(req, res, next) {
    Board.update(req.param('id'), req.params.all(), function boardUpdated(err) {
      if (err) {
        return res.redirect('/board/edit/' + req.param('id'));
      }
      res.redirect('/board/show/' + req.param('id'));
    });
  },

  show: function(req, res, next) {
    var url = req.param('id');
    Board.findOne({ url: url }, function foundBoard(err, board) {
      if (err) return next(err);
      if (!board) return next();
      res.view({
        board: board
      });
    });
  },

  index: function(req, res, next) {
    Board.find(function foundBoards(err, boards) {
      if (err) return next(err);
      res.view({
        boards: boards
      });
    });
  },

  destroy: function(req, res, next) {
    Board.findOne(req.param('id'), function foundBoard(err, board) {
      if (err) return next(err);
      if (!board) return next('Board doesn\'t exist yo');
      Board.destroy(req.param('id'), function boardDestroyed(err) {
        if (err) return next(err);
      });
      res.redirect('/board');
    });
  },

  subscribe: function(req, res) {
    console.log("omg");
    Board.find(function foundBoards(err, boards) {
      if (err) return next(err);

      Board.subscribe(req.socket);
      Board.subscribe(req.socket, boards);

      res.send(200);
    });
  }
};
