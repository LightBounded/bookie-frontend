import { defineStore } from 'pinia';
import { ref } from 'vue';
import type Customer from '@/interfaces/Customer';
import axios from 'axios';
import type Loan from '@/interfaces/Loan';

export const useLoansStore = defineStore('loans', () => {
  const loans = ref<Loan[]>([]);
  const selectedLoan = ref<Loan | null>(null);

  const fetchLoans = async () => {
    const res = await axios.get('http://localhost:4000/loans');
    loans.value = await res.data;
  };

  const deleteLoan = (loanId: string) => {
    loans.value = loans.value.filter((loan) => {
      loan.id !== loanId;
    });
    console.log(loanId);

    axios.delete(`http://localhost:4000/loans/${loanId}`);
  };

  const addLoan = async (loan: Omit<Loan, 'id'>) => {
    const res = await axios.post(`http://localhost:4000/loans`, loan);
    const id = (await res.data) as string;
    loans.value.push({ id, ...loan });
  };

  const updateLoan = async ({ id, ...updatedLoanDetails }: Loan) => {
    console.log(updatedLoanDetails);
    loans.value = loans.value.map((loan) =>
      loan.id === id ? { id, ...updatedLoanDetails } : loan
    );

    axios.put(`http://localhost:4000/loans`, {
      id,
      ...updatedLoanDetails,
    });
  };

  return {
    loans,
    selectedLoan,
    fetchLoans,
    addLoan,
    deleteLoan,
    updateLoan,
  };
});
