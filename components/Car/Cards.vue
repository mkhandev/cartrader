<script setup>
const { cars } = useCars();

const favorite = useLocalStorage("favorite", {});

const handelFavorite = (id) => {
  if (id in favorite.value) {
    delete favorite.value[id];
  } else {
    favorite.value = {
      ...favorite.value,
      [id]: true,
    };
  }
};

handelFavorite(1);
</script>

<template>
  <div class="w-full">
    <ClientOnly>
    <CarCard
      v-for="car in cars"
      :key="car.id"
      :car="car"
      @favor="handelFavorite"
      :favored="car.id in favorite"
    />
  </ClientOnly>
  </div>
</template>

<style></style>
