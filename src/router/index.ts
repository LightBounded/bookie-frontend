import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CustomersView from '@/views/CustomersView.vue'
import BooksView from '@/views/BooksView.vue'
import LoansView from '@/views/LoansView.vue'
import CustomerFormView from '@/views/CustomerFormView.vue'
import BookFormView from '@/views/BookFormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/customers',
      name: 'customers',
      component: CustomersView,
    },
    {
      path: '/customer-form',
      name: 'customer-form',
      component: CustomerFormView,
    },
    {
      path: '/books',
      name: 'books',
      component: BooksView,
    },
    {
      path: '/book-form',
      name: 'book-form',
      component: BookFormView,
    },
    {
      path: '/loans',
      name: 'loans',
      component: LoansView,
    },
  ],
})

export default router
