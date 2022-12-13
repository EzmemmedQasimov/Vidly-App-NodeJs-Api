const mongoose = require("mongoose");
const { createClient } = require("redis");
const winston = require("winston");
const exec = mongoose.Query.prototype.exec;
const client = createClient();
client.on("connect", function () {
  winston.info("Connected to Redis!");
});
client.connect();
mongoose.Query.prototype.cache = function () {
  this.useCache = true;
  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign(
      {},
      {
        collection: this.model.collection.name,
      }
    )
  );
  const cacheValue = await client.get(key);
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }

  const result = await exec.apply(this, arguments);
  await client.set(key, JSON.stringify(result));

  return result;
};

module.exports = {
  clearCache() {
    client.flushAll();
  },
};
