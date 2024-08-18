<script setup>
import { ref, defineEmits, defineExpose } from "vue";

const isVisible = ref(false);
const emit = defineEmits(["confirm"]);

const open = () => {
  isVisible.value = true;
};

const close = () => {
  isVisible.value = false;
};

const confirm = () => {
  emit("confirm");
  close();
};

defineExpose({ open, close });
</script>

<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <h3>Confirm</h3>
      <p>Are you sure you want to delete this item?</p>
      <button @click="confirm">Yes</button>
      <button @click="close">No</button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

button {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
