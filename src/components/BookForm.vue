<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import { object, string, mixed } from 'yup'
import type { SubmissionHandler } from 'vee-validate'
import { useBooksStore } from '@/stores/books'
import { storeToRefs } from 'pinia'

defineProps<{
  handleSubmit: SubmissionHandler
}>()

const bookSchema = object({
  title: string().required('Title is required'),
  author: string().required('Author is required'),
  genre: string().required('Genre is required'),
  image: mixed().required('Image is required'),
})

const { selectedBook } = storeToRefs(useBooksStore())
</script>

<template>
  <Form id="book-form" @submit="handleSubmit" :validation-schema="bookSchema">
    <div class="form-control mb-1">
      <label for="title" class="label">
        <span class="label-text">Title</span>
      </label>
      <Field
        :model-value="selectedBook?.title"
        id="title"
        class="input input-bordered"
        name="title"
        placeholder="Title"
      />
      <label for="title">
        <ErrorMessage class="label-text-alt" name="title" />
      </label>
    </div>
    <div class="form-control mb-1">
      <label for="author" class="label">
        <span class="label-text">Author</span>
      </label>
      <Field
        :model-value="selectedBook?.author"
        id="author"
        class="input input-bordered"
        name="author"
        placeholder="Author"
      />
      <label for="author">
        <ErrorMessage class="label-text-alt" name="author" />
      </label>
    </div>
    <div class="form-control mb-1">
      <label for="genre" class="label">
        <span class="label-text">Genre</span>
      </label>
      <Field
        :model-value="selectedBook?.genre"
        id="genre"
        class="input input-bordered"
        name="genre"
        placeholder="Genre"
      />
      <label for="genre">
        <ErrorMessage class="label-text-alt" name="genre" />
      </label>
    </div>
    <div class="form-control mb-1">
      <label for="image" class="label">
        <span class="label-text">Image</span>
      </label>
      <Field
        id="image"
        type="file"
        class="input input-bordered"
        name="image"
        placeholder="genre"
      />
      <label for="image">
        <ErrorMessage class="label-text-alt" name="image" />
      </label>
    </div>
  </Form>
</template>
