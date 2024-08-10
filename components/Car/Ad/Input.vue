<script setup>
const props = defineProps({
  title: String,
  name: String,
  placeholder: String,
});

const state = ref("");
const emits = defineEmits(["changeInput"]);

const onChange = () => {
  emits("changeInput", state.value, props.name);
};
</script>

<template>
  <div class="flex flex-col w-[48%] mt-2">
    <label for="" class="text-cyan-500 mb-1 text-sm">{{ title }}</label>
    <input
      type="text"
      :name="name"
      :placeholder="placeholder"
      v-model="state"
      class="p-2 border w-100 rounded"
      @input="onChange"
    />
  </div>
</template>

<style></style>
