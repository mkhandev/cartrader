import cars from "@/data/cars.json";
export default defineEventHandler((event) => {
  const { id } = event.context.params;

  const car = cars.find((c) => {
    return c.id === parseInt(id);
  });

  if (!car) {
    throw createError({
      statusCode: 404,
      statusMessage: `Car with id of ${id} does not exist.`,
    });
  }

  return car;
});
