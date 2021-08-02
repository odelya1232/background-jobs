const Queue = require('bee-queue');
const jobsQueue = new Queue('jobs');

function pushJob(job) {
  return jobsQueue.createJob(job).save()
}

jobsQueue.process((job, done) => {
  console.log(`job ${job} is done`);
  done();
})
