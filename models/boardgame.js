const mongoose = require('mongoose');

const { Schema } = mongoose;

const boardgameVersion = new Schema({
  t: {
    alias: 'title',
    type: String,
    required: true,
    index: true
  },
  d: {
    alias: 'description',
    type: String
  },
  y: {
    alias: 'yearPublished',
    type: Number
  },
  a: {
    alias: 'artists',
    type: Schema.Types.ObjectId, ref: 'person'
  },
  p: {
    alias: 'publishers',
    type: Schema.Types.ObjectId, ref: 'publisher'
  },
  l: {
    alias: 'languages',
    type: [String]
  },
  s: {
    alias: 'boxSize',
    type: String
  },
  w: {
    alias: 'boxWeight',
    type: String
  }
});

const boardgameSchema = new Schema({
  t: {
    alias: 'title',
    type: String,
    required: true,
    index: true
  },
  st: {
    alias: 'subtitle',
    type: String,
    sparse: true
  },
  desc: {
    alias: 'description',
    type: String,
  },
  i: {
    alias: 'image',
    type: String,
  },
  v: {
    alias: 'versions',
    type: [boargameVersion]
  }
  y: {
    alias: 'yearPublished',
    type: Number,
    required: true
  },
  d: {
    alias: 'designers',
    type: Schema.Types.ObjectId, ref: 'person'
  },
  a: {
    alias: 'artists',
    type: Schema.Types.ObjectId, ref: 'person'
  },
  minP: {
    alias: 'minPlayers',
    type: Number,
  },
  maxP: {
    alias: 'maxPlayers',
    type: Number,
  },
  minTime: {
    type: Number,
  },
  maxTime: {
    type: Number,
  },
  playerTime: {
    alias: 'perPlayerTime',
    type: Number,
  },
  age: {
    alias: 'recommendedAge',
    type: Number,
  },
  p: {
    alias: 'publishers',
    type: Schema.Types.ObjectId, ref: 'publisher'
  },
  awards: {
    type: Schema.Types.ObjectId, ref: 'award'
  },
  m: {
    alias: 'mechanics',
    type: Schema.Types.ObjectId, ref: 'mechanic'
  },
  g: {
    alias: 'genres',
    type: Schema.Types.ObjectId, ref: 'genre'
  },
  rb: {
    alias: 'rulebookComprehension',
    type: Number,
  },
  rc: {
    alias: 'rulesComplexity',
    type: Number,
  },
  gd: {
    alias: 'gameplayDepth',
    type: Number,
  },
  r: {
    alias: 'rating',
    type: Number,
  },
});

const BoardgameVersion = mongoose.model('BoardgameVersion', boardgameVersion);
const Boardgame = mongoose.model('Boardgame', boardgameSchema);

module.exports = Boardgame;
