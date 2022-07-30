<script setup lang="ts">
import { useCustomersStore } from '@/stores/customers'
import { storeToRefs } from 'pinia'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { object, string } from 'yup'
import type { SubmissionHandler } from 'vee-validate'

defineProps<{
  handleSubmit: SubmissionHandler
}>()

const customerSchema = object({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  phoneNumber: string().required('Phone number is required'),
  email: string().email('Email must be valid').required('Email is required'),
})

const { selectedCustomer } = storeToRefs(useCustomersStore())
</script>

<template>
  <Form
    id="customer-form"
    @submit="handleSubmit"
    :validation-schema="customerSchema"
  >
    <div class="form-control mb-1">
      <label for="first-name" class="label">
        <span class="label-text">First Name</span>
      </label>
      <Field
        :model-value="selectedCustomer?.firstName"
        id="first-name"
        class="input input-bordered"
        name="firstName"
        placeholder="First Name"
      />
      <label for="first-name">
        <ErrorMessage class="label-text-alt" name="firstName" />
      </label>
    </div>
    <div class="form-control mb-1">
      <label for="last-name" class="label">
        <span class="label-text">Last Name</span>
      </label>
      <Field
        :model-value="selectedCustomer?.lastName"
        id="last-name"
        class="input input-bordered"
        name="lastName"
        placeholder="Last Name"
      />
      <label for="last-name">
        <ErrorMessage class="label-text-alt" name="lastName" />
      </label>
    </div>
    <div class="form-control mb-1">
      <label for="last-name" class="label">
        <span class="label-text">Phone Number</span>
      </label>
      <Field
        :model-value="selectedCustomer?.phoneNumber"
        id="phone-number"
        class="input input-bordered"
        name="phoneNumber"
        placeholder="Phone Number"
      />
      <label for="phone-number">
        <ErrorMessage class="label-text-alt" name="phoneNumber" />
      </label>
    </div>
    <div class="form-control mb-1">
      <label for="last-name" class="label">
        <span class="label-text">Email</span>
      </label>
      <Field
        :model-value="selectedCustomer?.email"
        id="email"
        class="input input-bordered"
        name="email"
        placeholder="Email"
      />
      <label for="email">
        <ErrorMessage class="label-text-alt" name="email" />
      </label>
    </div>
  </Form>
</template>
