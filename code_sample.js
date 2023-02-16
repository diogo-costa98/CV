import { Redis } from 'ioredis';

const redis = new Redis();

const resolver = async (parent, args, context, info) => {
  const { id } = args;
  const key = `product:${id}`;

  // Try to get the data from Redis cache
  let product = await redis.get(key);
  
  // If not found, fetch it from the database
  if (!product) {
    product = await Product.findById(id);

    // Store the result in Redis cache with an expiration time of 1 hour
    await redis.set(key, JSON.stringify(product), 'EX', 60 * 60);
  } else {
    product = JSON.parse(product);
  }

  return product;
};
