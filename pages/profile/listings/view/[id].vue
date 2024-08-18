<script setup>
definePageMeta({
  layout: "custom",
  //middleware:["auth"]
});

const route = useRoute();

const { data: messages } = useFetch(
  `/api/car/listings/${route.params.id}/message`
);
</script>

<template>
  <div class="rounded shadow mt-20" v-if="messages">
    <CarMessageCard
      v-for="message in messages"
      :key="message.id"
      :message="message"
    />
  </div>
  <div v-else class="rounded shadow mt-20">
    <p class="text-blue-500 text-[20px] p-[30px]">No messages found for this id {{ route.params.id }}</p>
  </div>
</template>

<style></style>
