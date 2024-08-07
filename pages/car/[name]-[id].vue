<script setup>
const route = useRoute();
const { toTitleCase } = useUtilities();

const { cars } = useCars();

const car = computed(() => {
  return cars.find((car) => {
    return car.id === parseInt(route.params.id);
  })
})

if(!car.value){  
  throw createError({
    statusCode:404,
    message: `Car with ID ${route.params.id} does not exist.`
  })
}


useHead({
  title: toTitleCase(route.params.name),
});

definePageMeta({
  layout: "custom",
});
</script>

<template>
  <div>
    <CarDetailHero :car="car" />
    <CarDetailAttributes :features="car.features" />
    <CarDetailDescription :description="car.description" />
    <CarDetailContact />
  </div>
</template>

<style></style>
