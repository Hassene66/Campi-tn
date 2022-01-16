const mongoose = require("mongoose");
const redis = require("redis");
const client = redis.createClient({ socket: { port: 6379 } });
(async () => {
  try {
    await client.connect();
    console.log("connected");
  } catch (err) {
    console.error(err);
  }
})();
const exec = mongoose.Query.prototype.exec;
mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");

  return this;
};
mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );
  // See if we have a value for 'key' in redis
  const cacheValue = await client.hGet(this.hashKey, key);
  // If we do, return that
  if (cacheValue) {
    console.log("cache hit");
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }
  // Otherwise, issue the query and store the result in redis
  const result = await exec.apply(this, arguments);
  await client.hSet(this.hashKey, key, JSON.stringify(result));

  return result;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};
