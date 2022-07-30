<script>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="hero min-h-screen">
    <div class="text-center hero-content">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Book Store</h1>
        <p class="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
        <RouterLink to="/books" class="btn btn-primary"
          >Browse Books</RouterLink
        >
      </div>
    </div>
  </div>
</template>
