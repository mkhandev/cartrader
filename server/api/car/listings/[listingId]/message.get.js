import { PrismaClient } from "@prisma/client";
import Joi from "joi";

const prisma = new PrismaClient();

export default defineCachedEventHandler(async (event) => {
  const { listingId } = event.context.params;

  const message = await prisma.message.findMany({
    where: {
      listingId: parseInt(listingId),
    },
  });

  if (message.length === 0) {
    throw createError({
      statusCode: 412,
      statusMessage: `Message with id of ${listingId} does not exist.`,
    });
  }

  return message;
});
