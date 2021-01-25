const mongoose = require('mongoose');

const { Schema } = mongoose;

const itemSchema = new Schema({
  i: {
    alias: 'shelfItem',
    required: true,
    type: Schema.Types.ObjectId, ref: 'boardgame',
  },
  d: {
    alias: 'date',
    type: Date,
  },
  c: {
    alias: 'comments',
    type: [ { comment: String, date: Date } ],
  },
  p: {
    alias: 'plays',
    type: Schema.Types.ObjectId, ref: 'play',
  },
  o: {
    alias: 'owned',
    type: Boolean,
  },
  po: {
    alias: 'prevOwned',
    type: Boolean,
  },
  pre: {
    alias: 'preordered',
    type: Boolean,
  },
  w: {
    alias: 'wishPriority',
    type: Number,
  },
  wc: {
    alias: 'wishComment',
    type: String,
  },
  t: {
    alias: 'forTrade',
    type: Boolean,
  },
  cond: {
    alias: 'condition',
    type: String,
  },
  cost: {
    type: Number,
  },
  costCurrency: {
    type: String,
  },
  aquiredFrom: {
    type: String,
  },
  loc: {
    alias: 'location',
    type: String,
  },
});

const ShelfItem = mongoose.model('ShelfItem', itemSchema);

module.exports = { ShelfItem };
