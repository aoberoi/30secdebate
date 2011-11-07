/*
 * GET home page.
 */

var debates = {};

var ot = require('opentok');
var opentok = new ot.OpenTokSDK('7237102','f16e9cf7f3b5113ddad42abdcd63858224b8711e');

exports.index = function(req, res) {
  res.render('index', { pageName: 'Home' });
};

exports.handleForm = function(req, res){
  var topic = req.body.topic;
  var stance = req.body.stance;
  opentok.createSession('localhost',{},function(session){
    var debate = {
      topic: topic, 
      user1: {
        stance: stance
      },
      open: true,
      sessionId: session.sessionId
    }
    // save debate object in collection somewhere
    debates[debate.sessionId] = debate;
    res.redirect('/debate/' + debate.sessionId);
  });
};

exports.debateRoom = function (req, res) {
  var debate = debates[req.params.sessionId];
  console.log(debate);
  res.render('debateRoom', {pageName: 'Debate Room', debate: debate });
};