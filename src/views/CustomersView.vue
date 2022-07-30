<script setup lang="ts">
import { useCustomersStore } from '@/stores/customers';
import { storeToRefs } from 'pinia';
import type Customer from '@/interfaces/Customer';
import type { SubmissionHandler } from 'vee-validate';
import CustomerForm from '@/components/CustomerForm.vue';
import CustomersTable from '@/components/CustomersTable.vue';
import { computed } from 'vue';

const customersStore = useCustomersStore();

const { updateCustomer } = customersStore;
const { selectedCustomer } = storeToRefs(customersStore);

const handleSubmit: SubmissionHandler = (values, { resetForm }) => {
  const updatedCustomerDetails = {
    id: selectedCustomer.value?.id,
    ...values,
  } as Customer;
  updateCustomer(updatedCustomerDetails);
  selectedCustomer.value = null;
  resetForm();
};

const isOpen = computed(() => {
  return !!selectedCustomer.value;
});
</script>

<template>
  <div class="max-w-max mx-auto">
    <CustomersTable />
    <input v-model="isOpen" type="checkbox" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <CustomerForm :handle-submit="handleSubmit" />
        <div class="modal-action">
          <button @click="selectedCustomer = null" class="btn btn-ghost">
            Close
          </button>
          <button form="customer-form" class="btn" type="submit">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>
