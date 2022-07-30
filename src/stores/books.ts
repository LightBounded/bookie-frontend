import { defineStore } from 'pinia'
import { ref } from 'vue'
import type Book from '@/interfaces/Book'
import axios from 'axios'

export const useBooksStore = defineStore('books', () => {
  const books = ref<Book[]>([])
  const selectedBook = ref<Book | null>(null)

  const fetchBooks = async () => {
    const res = await axios.get('http://localhost:4000/books')
    books.value = await res.data
  }

  const addBook = async (book: Omit<Book, 'id'>) => {
    const formData = new FormData()
    Object.keys(book).forEach((key) =>
      formData.append(key, book[key] as string)
    )
    const res = await axios.post('http://localhost:4000/books', formData)
    const { image, id } = (await res.data) as { image: string; id: string }
    books.value.push({
      image,
      id,
      title: book.title,
      author: book.author,
      genre: book.genre,
    } as Book)
  }

  const deleteBook = ({ id, ...book }: Book) => {
    books.value = books.value.filter((book) => book.id !== id)
    axios.delete(`http://localhost:4000/books/${id}`, {
      data: { image: book.image },
    })
  }

  const updateBook = async ({ id, ...updatedBookDetails }: Book) => {
    const formData = new FormData()

    const updatedBook: Book & { oldImage: string } = {
      id,
      ...updatedBookDetails,
      oldImage: selectedBook.value?.image as string,
    }

    Object.keys(updatedBook).forEach((key) => {
      formData.append(key, updatedBook[key] as string)
    })

    const res = await axios.put(`http://localhost:4000/books`, formData)
    const { image } = (await res.data) as { image: string }

    books.value = books.value.map((book) =>
      book.id === id
        ? {
            image,
            id,
            title: updatedBookDetails.title,
            genre: updatedBookDetails.genre,
            author: updatedBookDetails.author,
          }
        : book
    )
  }

  return {
    books,
    selectedBook,
    fetchBooks,
    addBook,
    deleteBook,
    updateBook,
  }
})
