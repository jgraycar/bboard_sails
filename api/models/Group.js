/*jslint node:true */
"use strict";

/**
* Group.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    title: {
      type: 'STRING',
      defaultsTo: "My Group"
    },

    owner: {
      model: 'board'
    },

    images: {
      type: 'array',
      defaultsTo: []
    }

  }
};

