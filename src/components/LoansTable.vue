<script setup lang="ts">
import { useLoansStore } from '@/stores/loans';
import { useBooksStore } from '@/stores/books';
import { useCustomersStore } from '@/stores/customers';
import { storeToRefs } from 'pinia';

const loansStore = useLoansStore();

const { deleteLoan } = loansStore;
const { loans, selectedLoan } = storeToRefs(loansStore);

const { customers } = storeToRefs(useCustomersStore());
const { books } = storeToRefs(useBooksStore());
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table">
      <tr>
        <th></th>
        <th>Book</th>
        <th>Customer</th>
        <th>Rent Date</th>
        <th>Return Date</th>
        <th>Actions</th>
      </tr>
      <tr
        v-for="(loan, i) in loans"
        :key="loan.id"
        :set="
          (customer = customers.filter(
            (customer) => customer.id === loan.customerId
          )[0])
        "
      >
        <td>{{ i }}</td>
        <td>{{ books.filter((book) => book.id === loan.bookId)[0].title }}</td>
        <td>{{ customer.firstName }} {{ customer.lastName }}</td>
        <td>{{ loan.rentDate }}</td>
        <td>{{ loan.returnDate }}</td>
        <td class="flex gap-1">
          <button class="btn btn-error" @click="deleteLoan(loan.id)">
            Delete
          </button>
          <button class="btn btn-warning" @click="selectedLoan = loan">
            Edit
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>
