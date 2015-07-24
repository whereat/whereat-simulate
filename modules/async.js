const async = {};

// (Number) -> Promise[Unit]
async.wait = (secs) => {
  console.log(`Waiting ${secs} secs...`);
  return new Promise((resolve) => setTimeout(resolve, secs*1000));
};


// (Number, T) -> Promise[T]
async.waitAndPass = (secs, res) => {
  console.log(`Waiting ${secs} secs...`);
  return new Promise((resolve) => setTimeout(resolve.bind(this, res), secs*1000));
};

module.exports = async;
