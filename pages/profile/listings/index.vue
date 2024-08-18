<script setup>
definePageMeta({
  layout: "custom",
});

//const { listings } = useCars();

const user = useSupabaseUser();
const { data: listings, refresh } = await useFetch(
  `/api/car/listings/user/${user.value.id}`
);

// const handleDelete = async (id) => {
//   await $fetch(`/api/car/listings/${id}`, {
//     method: "DELETE",
//   });

//   refresh();
// };

const confirmDialog = ref(null);
const listingIdToDelete = ref(null);

const handleDeleteClick = (id) => {
  listingIdToDelete.value = id;
  confirmDialog.value.open();
};

const handleDeleteConfirm = async () => {
  await $fetch(`/api/car/listings/${listingIdToDelete.value}`, {
    method: "DELETE",
  });

  refresh();
  listingIdToDelete.value = null; // Reset the value after deletion
}
</script>

<template>
  <div>
    <CustomModal ref="confirmDialog" @confirm="handleDeleteConfirm" />
    <div class="flex justify-between mt-24 items-center">
      <h1 class="text-3xl">My Listings</h1>
      <NuxtLink
        to="/profile/listings/create"
        class="w-9 h-9 bg-blue-400 flex justify-center items-center rounded-full text-white font-bold cursor-pointer"
        >+</NuxtLink
      >
    </div>

    <div class="shadow rounded p-3 mt-5">
      <CarListingCard
        v-for="listing in listings"
        :key="listing.id"
        :listing="listing"
        @delete-click="handleDeleteClick"
      />
    </div>
  </div>
</template>

<style></style>
