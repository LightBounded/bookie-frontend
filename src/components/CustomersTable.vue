<script setup lang="ts">
import { useCustomersStore } from '@/stores/customers';
import { storeToRefs } from 'pinia';

const customersStore = useCustomersStore();

const { deleteCustomer } = customersStore;
const { customers, selectedCustomer } = storeToRefs(customersStore);
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table">
      <tr>
        <th></th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Phone Number</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
      <tr v-for="(customer, i) in customers" :key="customer.id">
        <td>{{ i }}</td>
        <td>{{ customer.firstName }}</td>
        <td>{{ customer.lastName }}</td>
        <td>{{ customer.phoneNumber }}</td>
        <td>{{ customer.email }}</td>
        <td class="flex gap-1">
          <button class="btn btn-error" @click="deleteCustomer(customer.id)">
            Delete
          </button>
          <button class="btn btn-warning" @click="selectedCustomer = customer">
            Edit
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>
