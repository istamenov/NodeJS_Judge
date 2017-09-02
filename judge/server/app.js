const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const db = require('monk')('mongodb://localhost:27017/judge');
const uid = require('uuid');
var app = require('express')();

app.use(bodyParser.json());

app.get('/api/problems/', function(req, res, next) {
  db.get('problems').find({}, '-_id').then(items =>{
    res.json(items);
  });
});

app.get('/api/problem/:id/', function(req, res, next) {
  db.get('problems').find({'id' : req.params.id}, '-_id').then(items =>{
    res.send(items);
  })
});

app.post('/api/problems/', function(req, res, next) {
  let problem = req.body;
  let uuid = uid.v4();
  db.get('problems').insert({'id' : uuid
  , 'description' : problem.description
  , 'title' : problem.title
  , 'tests' : problem.tests
  , 'author' : problem.author
  , 'solutions' : []});
  res.sendStatus(200);
});

app.post('/api/problem/:id/', function(req, res, next) {
  db.get('problems').find({'id' : req.params.id}, '-_id').then(items =>{
    if(items.length === 1)
    {
      compiler = spawn("g++", ["-x", "c++", "-"], { stdio: ['pipe', 'pipe', 'pipe']});
      compiler.stdin.write(req.body.code);
      compiler.stdin.end();
      let tests = items[0].tests;
      let results = [];
      for(test in tests)
      {
        let output = "";
        solution = spawn('./a.out', { stdio: ['pipe', 'pipe', 'pipe']});
        solution.stdin.write(tests[test].input);
        solution.stdin.end();
        solution.stdout.on('data', (data) => {
            output = output.concat(data);
        });
        solution.stderr.on('data', (data) => {
            solution.kill('SIGHUP');
        });
        if(output === tests[test].output){
          results.push('t');
        }else{
          results.push('f');
        }
      }
      let problem = items[0];
      let newSolutions = problem.solutions;
      newSolutions.push({'author' : req.body.author, 'results' : results});
      problem.solutions = newSolutions;
      db.get("problems").update({id : items[0].id}, problem).catch((e) => {
           console.log("rejected promise when updating");
          });
      res.sendStatus(200);
    }
  })
});

app.listen(3000);
