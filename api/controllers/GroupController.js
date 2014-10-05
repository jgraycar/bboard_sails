/*jslint node:true */
"use strict";

/**
 * GroupController
 *
 * @description :: Server-side logic for managing groups
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
    Group.create(req.params.all(), function groupCreated(err, group) {
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }

        return res.redirect('/group/new');
      }

      Board.publishCreate(group.owner.url, {
        id: group.id
      });

      res.redirect('/group/show/' + group.id);
      req.session.flash = {};
    })
  },

  edit: function(req, res, next) {
    Group.findOne(req.param('id'), function foundGroup(err, group) {
      if (err) return next(err);
      if (!group) return next('Group doesn\'t exit yo');
      var reg_form = forms.create({
        url: fields.string({required: true}),
        title: fields.string({required: true})
      });
      res.view({
        form: reg_form,
        group: group
      });
    });
  },

  update: function(req, res, next) {
    Group.update(req.param('id'), req.params.all(), function groupUpdated(err) {
      if (err) {
        return res.redirect('/group/edit/' + req.param('id'));
      }

      Board.publishUpdate(group.owner.url, {
        id: group.id
      });

      res.redirect('/group/show/' + req.param('id'));
    });
  },

  show: function(req, res, next) {
    Group.findOne(req.param('id'), function foundGroup(err, group) {
      if (err) return next(err);
      if (!group) return next();
      res.view({
        group: group
      });
    });
  },

  index: function(req, res, next) {
    Group.find(function foundGroups(err, groups) {
      if (err) return next(err);
      res.view({
        groups: groups
      });
    });
  },

  destroy: function(req, res, next) {
    Group.findOne(req.param('id'), function foundGroup(err, group) {
      if (err) return next(err);
      if (!group) return next('Group doesn\'t exist yo');
      Group.destroy(req.param('id'), function groupDestroyed(err) {
        if (err) return next(err);
      });

      Board.publishDestroy(group.owner.url, {
        id: group.id
      });

      res.redirect('/group');
    });
  }
};

