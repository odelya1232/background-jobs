
const Queue = require('bee-queue');
const jobsQueue = new Queue('jobs');

function pushJob(job) {
  console.log(`pushing ${job.name}`)
  return jobsQueue.createJob(job).save()
}

jobsQueue.process((job, done) => {
  setTimeout(() => {
    console.log(`job ${job.data.name} is done`);
    done()
  }, 10000);
})


require('../server/server')
require('dotenv').config();
const express = require('express');
// const { pushJob } = require('../server/server');

const app = express();
app.use(express.json());
//app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send("jobs queue")
});

app.post('/jobs', (req, res) => {
  let job = req.body.job
  pushJob(job)
  .then(() => res.json({"done": true, "message": `Your job ${job.data.name} is done` }))
  .catch( () => res.json({ "done": false, "message": `There was an error while executing your job`}))
  
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`jobs queue is open on ${PORT}`);
});

