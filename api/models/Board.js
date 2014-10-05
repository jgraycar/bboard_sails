/*jslint node:true */
"use strict";

/**
* Board.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {
    url: {
      type: 'STRING',
      required: true,
      unique: true
    },

    groups: {
      collection: 'group',
      via: 'owner'
    }

  }
};

