<script setup lang="ts">
import { useLoansStore } from '@/stores/loans';
import { useBooksStore } from '@/stores/books';
import { useCustomersStore } from '@/stores/customers';
import { storeToRefs } from 'pinia';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { object, string } from 'yup';
import type { SubmissionHandler } from 'vee-validate';

defineProps<{
  handleSubmit: SubmissionHandler;
}>();

const loanSchema = object({
  customerId: string().required('Customer is required'),
  rentDate: string().required('Rent date is required'),
  returnDate: string().required('Return date is required'),
});

const { selectedLoan } = storeToRefs(useLoansStore());
const { selectedBook, books } = storeToRefs(useBooksStore());
const { customers } = storeToRefs(useCustomersStore());
</script>

<template>
  <Form id="loan-form" @submit="handleSubmit" :validation-schema="loanSchema">
    <div class="form-control mb-1">
      <label for="book" class="label">
        <span class="label-text">Book</span>
      </label>
      <input
        id="book"
        type="text"
        disabled
        class="input input-bordered"
        :value="
          selectedBook?.title ||
          books.filter((book) => book.id === selectedLoan?.bookId)[0]?.title
        "
      />
    </div>
    <div class="form-control mb-1">
      <label for="rent-date" class="label">
        <span class="label-text">Rent Date</span>
      </label>
      <Field
        id="rent-date"
        type="date"
        class="input input-bordered"
        name="rentDate"
        :model-value="selectedLoan?.rentDate"
      />
      <label for="rent-date">
        <ErrorMessage class="label-text-alt" name="rentDate" />
      </label>
    </div>
    <div class="form-control mb-1">
      <label for="rent-date" class="label">
        <span class="label-text">Rent Date</span>
      </label>
      <Field
        id="return-date"
        type="date"
        class="input input-bordered"
        name="returnDate"
        :model-value="selectedLoan?.returnDate"
      />
      <label for="return-date">
        <ErrorMessage class="label-text-alt" name="returnDate" />
      </label>
    </div>
    <div class="form-control mb-1">
      <label for="customer" class="label">
        <span class="label-text">Customer</span>
      </label>
      <Field
        as="select"
        id="customer"
        class="select select-bordered"
        name="customerId"
        :model-value="selectedLoan?.customerId"
      >
        <option
          v-for="customer in customers"
          :key="customer.id"
          :value="customer.id"
        >
          {{ customer.firstName }} {{ customer.lastName }}
        </option>
      </Field>
      <label for="customer">
        <ErrorMessage class="label-text-alt" name="customerId" />
      </label>
    </div>
  </Form>
</template>
