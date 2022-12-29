import { createClient } from "redis";

const client = createClient(process.env.REDIS_URL);

(async () => {
    await client.connect();
})();

client.on("error", function (err) {
  console.error("Redis error:", err);
});

client.on("end", function () {
  console.log("Redis connection closed");
});

client.on("reconnecting", function () {
  console.log("Redis connection lost, attempting to reconnect...");
});

client.on("connect", function () {
  console.log("Redis connection established");
});

export const setJwt = (key, value) => {
  return new Promise((resolve, reject) => {
    try {
      return client.set(key, value, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getJwt = (key) => {
  return new Promise((resolve, reject) => {
    try {
      client.get(key, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};
