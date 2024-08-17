<script setup>
const route = useRoute();
const errorMessage = ref("");
const successMessage = ref("");

const contactdata = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const disableButton = computed(() => {
  for (let key in contactdata) {
    if (!contactdata[key].trim()) {
      return true;
    }
  }
  return false;
});

const handleSubmit = async () => {
  try {
    const response = await $fetch(
      `/api/car/listings/${route.params.id}/message`,
      {
        method: "POST",
        body: contactdata,
      }
    );

    errorMessage.value = "";
    successMessage.value = "Message successfully sent";

    contactdata.name = "";
    contactdata.email = "";
    contactdata.phone = "";
    contactdata.message = "";
  } catch (error) {
    errorMessage.value = error.statusMessage;
    successMessage.value = "";
  }
};
</script>

<template>
  <div class="mt-10">
    <div class="flex w-[600px] justify-between">
      <input
        type="text"
        class="border p-1"
        v-model="contactdata.name"
        placeholder="Name"
      />
      <input
        type="text"
        class="border p-1"
        v-model="contactdata.email"
        placeholder="Email"
      />
      <input
        type="text"
        class="border p-1"
        v-model="contactdata.phone"
        placeholder="Phone"
      />
    </div>
    <div class="flex mt-4 w-[600px]">
      <textarea
        class="border p-1 w-full"
        v-model="contactdata.message"
        placeholder="Message"
      ></textarea>
    </div>
    <button
      :disabled="disableButton"
      @click="handleSubmit"
      class="bg-blue-400 text-white px-10 py-3 rounded mt-4"
    >
      Submit
    </button>
    <p v-if="errorMessage" class="mt-3 text-red-400">{{ errorMessage }}</p>
    <p v-if="successMessage" class="mt-3 text-green-500">
      {{ successMessage }}
    </p>
  </div>
</template>

<style></style>
