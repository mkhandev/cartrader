import Joi from "joi";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const schema = Joi.object({
  make: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.number()
    .min(1986)
    .max(new Date().getFullYear() + 1),
  miles: Joi.number().required().min(0),
  city: Joi.string().min(2).required(),
  numberOfSeats: Joi.number().max(100).min(1).required(),
  features: Joi.array().items(Joi.string()).required(),
  description: Joi.string().min(3).required(),
  image: Joi.string().required(),
  listerId: Joi.string().required(),
  price: Joi.number().required(),
  name: Joi.string().required(),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { error, value } = schema.validate(body);

  if (error) {
    throw createError({
      statusCode: 412,
      statusMessage: error.message,
    });
  }

  const {
    image,
    name,
    numberOfSeats,
    miles,
    price,
    features,
    description,
    listerId,
    city,
    make,
    model,
  } = body;

  const car = await prisma.car.create({
    data: {
      image,
      name,
      numberOfSeats: parseInt(numberOfSeats),
      miles: parseInt(miles),
      price: parseInt(price),
      features,
      description,
      listerId,
      city: city.toLowerCase(),
      make,
      model,
    },
  });

  return car;
});
