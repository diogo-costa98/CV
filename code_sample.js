import { Redis } from 'ioredis';

const redis = new Redis();

const resolver = async (parent, args, context, info) => {
  const { id } = args;
  const key = `question:${id}`;

  // Try to get the question data from Redis cache
  let question = await redis.get(key);
  
  // If not found, fetch it from the database
  if (!question) {
    product = await Question.findById(id);

    // Store the result in Redis cache with an expiration time of 1 hour
    await redis.set(key, JSON.stringify(question), 'EX', 60 * 60);
  } else {
    question = JSON.parse(question);
  }

  return question;
};
