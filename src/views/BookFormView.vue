<script setup lang="ts">
import BookForm from '@/components/BookForm.vue'
import type { SubmissionHandler } from 'vee-validate'
import { useBooksStore } from '@/stores/books'
import type Book from '@/interfaces/Book'

const { addBook } = useBooksStore()

const handleSubmit: SubmissionHandler = (values, { resetForm }) => {
  const { image, ...book } = values as unknown as Book
  addBook({ image: image[0] as File, ...book })
  resetForm()
}
</script>

<template>
  <div>
    <div class="max-w-sm mx-auto">
      <BookForm :handle-submit="handleSubmit" />
      <button form="book-form" class="btn justify-start" type="submit">
        Submit
      </button>
    </div>
  </div>
</template>
