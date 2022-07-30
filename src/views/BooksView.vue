<script setup lang="ts">
import { useBooksStore } from '@/stores/books';
import { useLoansStore } from '@/stores/loans';
import { storeToRefs } from 'pinia';
import BookForm from '@/components/BookForm.vue';
import LoanForm from '@/components/LoanForm.vue';
import type { SubmissionHandler } from 'vee-validate';
import type Book from '@/interfaces/Customer';
import type Loan from '@/interfaces/Loan';
import { computed, ref } from 'vue';

const booksStore = useBooksStore();
const { deleteBook, updateBook } = booksStore;
const { books, selectedBook } = storeToRefs(booksStore);

const { addLoan } = useLoansStore();

const handleBookModalSubmit: SubmissionHandler = (values, { resetForm }) => {
  const { image, ...book } = values as unknown as Book;
  updateBook({
    id: selectedBook.value?.id,
    image: image[0] as File,
    ...book,
  } as Book);
  selectedBook.value = null;
  mode.value = null;
  resetForm();
};

const handleLoanModalSubmit: SubmissionHandler = (values, { resetForm }) => {
  addLoan({ ...values, bookId: selectedBook.value?.id });
  selectedBook.value = null;
  mode.value = null;
  resetForm();
};

const mode = ref(null);

const bookModalIsOpen = computed(() => {
  return !!selectedBook.value && mode.value == 'edit';
});

const loanModalIsOpen = computed(() => {
  return !!selectedBook.value && mode.value == 'loan';
});
</script>

<template>
  <div class="max-w-max mx-auto">
    <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div
        class="h-max card bg-neutral shadow-xl"
        v-for="book in books"
        :key="book.id"
      >
        <img :src="'http://localhost:4000/' + book.image" alt="book" />
        <div class="card-body">
          <h2 class="card-title">{{ book.title }}</h2>
          <small>{{ book.author }}</small>
          <small>{{ book.genre }}</small>
          <div class="justify-end card-actions">
            <button
              class="btn btn-warning"
              @click="
                selectedBook = book;
                mode = 'edit';
              "
            >
              Edit
            </button>
            <button
              @click="
                deleteBook(book);
                mode = null;
              "
              class="btn btn-error"
            >
              Delete
            </button>
            <button
              class="btn btn-info"
              @click="
                selectedBook = book;
                mode = 'loan';
              "
            >
              Rent
            </button>
          </div>
        </div>
      </div>
    </div>
    <input v-model="bookModalIsOpen" type="checkbox" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <BookForm :handle-submit="handleBookModalSubmit" />
        <div class="modal-action">
          <button
            @click="
              selectedBook = null;
              mode = null;
            "
            class="btn btn-ghost"
          >
            Close
          </button>
          <button form="book-form" class="btn" type="submit">Save</button>
        </div>
      </div>
    </div>
    <input v-model="loanModalIsOpen" type="checkbox" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <LoanForm :handle-submit="handleLoanModalSubmit" />
        <div class="modal-action">
          <button
            @click="
              selectedBook = null;
              mode = null;
            "
            class="btn btn-ghost"
          >
            Close
          </button>
          <button form="loan-form" class="btn" type="submit">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>
