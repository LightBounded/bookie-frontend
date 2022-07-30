<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useCustomersStore } from '@/stores/customers';
import { useBooksStore } from '@/stores/books';
import { useLoansStore } from '@/stores/loans';
import { ref } from 'vue';

const router = useRouter();

router.afterEach(() => {
  isOpen.value = false;
});

const { fetchCustomers } = useCustomersStore();
const { fetchBooks } = useBooksStore();
const { fetchLoans } = useLoansStore();

const isOpen = ref(false);

onMounted(async () => {
  fetchCustomers();
  fetchBooks();
  fetchLoans();
  window.addEventListener('resize', resizeHandler);
});

const resizeHandler = () => {
  if (window.innerWidth > 768) isOpen.value = false;
};
</script>

<template>
  <div class="mb-4 shadow-md">
    <div class="md:container mx-auto navbar">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl">Book Store</a>
      </div>
      <button
        @click="isOpen = !isOpen"
        class="btn btn-square btn-ghost md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-5 h-5 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
      <div class="hidden md:flex">
        <ul class="menu menu-horizontal p-0">
          <li><RouterLink to="/">Home</RouterLink></li>
          <li tabindex="0">
            <a>
              Books
              <svg
                class="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                />
              </svg>
            </a>
            <ul class="p-2 z-10 bg-neutral">
              <li><RouterLink to="/books">Browse</RouterLink></li>
              <li><RouterLink to="/book-form">Add</RouterLink></li>
            </ul>
          </li>
          <li tabindex="0">
            <a>
              Customers
              <svg
                class="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                />
              </svg>
            </a>
            <ul class="p-2 bg-neutral z-10">
              <li><RouterLink to="/customers">Manage</RouterLink></li>
              <li><RouterLink to="/customer-form">Register</RouterLink></li>
            </ul>
          </li>
          <li><RouterLink to="/loans">Loans</RouterLink></li>
        </ul>
      </div>
    </div>
    <ul class="menu" :class="{ hidden: !isOpen }">
      <li>
        <RouterLink class="px-[24px]" to="/">Home</RouterLink>
      </li>
      <li>
        <RouterLink class="px-[24px]" to="/books">Browse Books</RouterLink>
      </li>
      <li>
        <RouterLink class="px-[24px]" to="/book-form">Add a Book</RouterLink>
      </li>
      <li>
        <RouterLink class="px-[24px]" to="/customers"
          >Manage Customers</RouterLink
        >
      </li>
      <li>
        <RouterLink class="px-[24px]" to="/customer-form"
          >Register a Customer</RouterLink
        >
      </li>
      <li>
        <RouterLink class="px-[24px]" to="/loans">Loans</RouterLink>
      </li>
    </ul>
  </div>

  <RouterView class="container mx-auto px-4" />
</template>

<style>
@import url(@/assets/main.css);
</style>
