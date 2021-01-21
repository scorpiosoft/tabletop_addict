const { Boardgame } = require("../models/boardgame");
const util = require("../util/util");

// getAge - get the 'age' field
//   if an _id is passed in, get the age associated with that _id
//   if a (t)itle is passed in, get the age of one matching title
//   otherwise, get the age of one object
function getAge(req, res) {
  const data = req.body;
  let filter = {};
  console.log(`boardgameController:getAge:data(${JSON.stringify(data,null,2)})`);
  if (util.validate_exists(data._id))
  {
    filter._id = data._id;
  } else
  if (util.validate_exists(data.t))
  {
    filter.t = data.t;
  }
  Boardgame.findOne(filter, 'age _id')
      .then(data => {res.json(data);console.log(data)})
      .catch(err => res.status(422).json(err));
    // data = { age: { value: 13, votes: [{user: req.body.u, value: req.body.a}], avg: req.body.a } };
}
// setAge - set the 'age' field
//   requires the request body to be a complete 'age' document, also _id
function setAge(req, res) {
  let data = req.body;
  console.log(`boardgameController:setAge:data(${JSON.stringify(data,null,2)})`);
  if (util.validate_exists(data._id))
  {
    // check if this user already voted
    if (util.validate_exists(data.age.votes))
    {
      const votedIdx = data.age.votes.findIndex(e => e.user === data.u);
      if (votedIdx !== -1)
      {
        data.age.votes[votedIdx].value = data.a;
      } else {
        data.age.votes.push({user: data.u, value: req.body.a});
      }
      const len = data.age.votes.length;
      const tot = data.age.votes.reduce((accum, cur) => accum + cur.value, 0);
      data.age.avg = Math.round(tot/len);
    } else {
      // technically, should never get here
      console.log(`boardgameController:setAge no 'votes' property: (${JSON.stringify(data.age,null,2)})`)
      return {};
    }
    // const options = {
    //   upsert: true
    // }
    delete data.u;
    delete data.a;
    console.log(`boardgameController:setAge updateOne: (${JSON.stringify(data,null,2)})`)
    // Boardgame.updateOne({_id: data._id}, data, options)
    Boardgame.updateOne({_id: data._id}, data)
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err));
  } else {
    console.log('boardgameController:setAge - data._id does not exist');
    return {};
  }
}
module.exports = { getAge, setAge }