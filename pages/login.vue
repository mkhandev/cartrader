<script setup>
definePageMeta({
  layout: "custom",
});

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/'
  // Make sure to include `https://` when not localhost.
  url = url.startsWith('http') ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.endsWith('/') ? url : `${url}/`
  return url
}


const login = async () => {
  const { error } = supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://cartrader-bay.vercel.app",
    },
  });

  if (error) console.log(error);
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
