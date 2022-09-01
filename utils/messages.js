

function commandMessage(job,commandID,jobStatus) {
  return {
    job,
    commandID,
    jobStatus
  };
}



module.exports = commandMessage;

