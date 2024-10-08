import { PrismaClient } from "@prisma/client";
import Joi from "joi";

const prisma = new PrismaClient();

const schema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  name: Joi.string().required(),
  message: Joi.string().min(20).required(),
});

export default defineEventHandler(async (event) => {
  const { listingId } = event.context.params;
  const body = await readBody(event);
  console.log({ body });

  const { error, value } = schema.validate(body, { abortEarly: false });

  if (error) {
    throw createError({
      statusCode: 412,
      statusMessage: error.message,
    });
  }

  const message = prisma.message.create({
    data:{
        name:body.name,
        message: body.message,
        email: body.email,
        phone: body.phone,
        listingId: parseInt(listingId),
    }
  })

  return message;
});
