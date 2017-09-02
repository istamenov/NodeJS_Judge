const bodyParser = require('body-parser');
const cp = require('child_process');
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
  console.log(req.body);
  res.sendStatus(200);
  return;
  db.get('problems').find({'id' : req.params.id}, '-_id').then(items =>{
    if(items.length > 0)
    {
      compiler = cp.spawn('g++', ['-x'], { stdio: ['pipe', 'pipe', null]});
      compiler.stdin = req.body.code;
      let results = [];
      for(test in items.tests)
      {
        let output = "";
        solution = cp.spawn('a.out', ['-x'], { stdio: ['pipe', 'pipe', null]});
        solution.stdin = items.tests[test].input;
        solution.stdout.on('data', (data) => {
            output = output.concat(data);
        });
        ls.stderr.on('data', (data) => {
            results.push('f');
            kill('SIGHUP');
            continue
        });
        if(output === item.tests[test].output)
        {
          results.push('t');
        }
        else{
          results.push('f');
        }
      }
      res.sendStatus(200);
    }
  }
}););

app.listen(3000);
