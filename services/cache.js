const mongoose = require("mongoose");
const { createClient } = require("redis");
const exec = mongoose.Query.prototype.exec;
const client = createClient();
// const redis = require('redis');
// const client = redis.createClient();

mongoose.Query.prototype.cache = function () {
  this.useCache = true;
  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({},  {
      collection: this.model.collection.name,
    })
  );
  await client.connect();
  console.log(key);
  const cacheValue = await client.get(key);
//   console.log(cacheValue);
  if (cacheValue) {
    console.log('cached');
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }

  const result = await exec.apply(this, arguments);
  client.set(key, JSON.stringify(result));
  await client.disconnect();
  console.log('mongo');
  return result;

};

module.exports = {
  clearCache() {
    client.flushAll();
  },
};
