<script setup lang="ts">
import { useLoansStore } from '@/stores/loans';
import { storeToRefs } from 'pinia';
import type { SubmissionHandler } from 'vee-validate';
import type Loan from '@/interfaces/Loan';
import LoansTable from '@/components/LoansTable.vue';
import LoanForm from '@/components/LoanForm.vue';
import { computed } from 'vue';

const loansStore = useLoansStore();

const { updateLoan } = loansStore;
const { selectedLoan } = storeToRefs(loansStore);

const handleSubmit: SubmissionHandler = (values, { resetForm }) => {
  const updatedLoanDetails = {
    id: selectedLoan.value?.id,
    bookId: selectedLoan.value?.bookId,
    ...values,
  } as Loan;
  updateLoan(updatedLoanDetails);
  selectedLoan.value = null;
  resetForm();
};

const isOpen = computed(() => {
  return !!selectedLoan.value;
});
</script>

<template>
  <div class="max-w-max mx-auto">
    <LoansTable />
    <input v-model="isOpen" type="checkbox" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <LoanForm :handle-submit="handleSubmit" />
        <div class="modal-action">
          <button @click="selectedLoan = null" class="btn btn-ghost">
            Close
          </button>
          <button form="loan-form" class="btn" type="submit">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>
