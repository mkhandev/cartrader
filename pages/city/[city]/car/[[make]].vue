<script setup>
const route = useRoute();
const { data: cars, refresh } = await useFetchCars(route.params.city, {
  minPrice: route.query.minPrice,
  maxPrice: route.query.maxPrice,
  make: route.params.make,
});

watch(
  () => route.query,
  () => window.location.reload(true)
);
</script>

<template>
  <div>
    <CarCards v-if="cars.length" :cars="cars" />
    <h1 v-else class="text-red-500 text-[20px]">No cars found with filter. Please search by city name. Example: Toronto</h1>
  </div>
</template>

<style></style>
