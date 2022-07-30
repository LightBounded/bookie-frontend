<script setup lang="ts">
import CustomerForm from '@/components/CustomerForm.vue'
import type { SubmissionHandler } from 'vee-validate'
import { useCustomersStore } from '@/stores/customers'
import type Customer from '@/interfaces/Customer'

const { addCustomer } = useCustomersStore()

const handleSubmit: SubmissionHandler = (values, { resetForm }) => {
  addCustomer(values as unknown as Customer)
  resetForm()
}
</script>

<template>
  <div>
    <div class="max-w-sm mx-auto">
      <CustomerForm :handleSubmit="handleSubmit" />
      <button form="customer-form" class="btn" type="submit">Submit</button>
    </div>
  </div>
</template>
