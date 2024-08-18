<script setup>
definePageMeta({
  layout: "custom",
});

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const login = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://cartrader-bay.vercel.app",
      },
    });

    if (error) {
      throw createError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.statusMessage,
      });
    }

    router.push("/");
  } catch (error) {
    console.error("Error logging in with Google:", error.message);
  }
};
</script>

<template>
  <div class="mt-10">
    <h1 class="text-5xl font-bold mb-7">Log in</h1>
    <button @click="login" class="bg-red-400 p-3 rounded text-white font-bold">
      Login with Google
    </button>
  </div>
</template>

<style></style>
