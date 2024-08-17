import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { listingId } = event.context.params;

  // return prisma.car.delete({
  //   where: {
  //     id: parseInt(listingId),
  //   },
  // });

  try {
    const deletedCar = await prisma.car.delete({
      where: {
        id: parseInt(listingId),
      },
    });

    return {
      success: true,
      message: "Car deleted successfully",
      data: deletedCar,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete car. Error: " + error.message,
    };
  }
});
