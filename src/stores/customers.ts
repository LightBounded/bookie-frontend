import { defineStore } from 'pinia'
import { ref } from 'vue'
import type Customer from '@/interfaces/Customer'
import axios from 'axios'

export const useCustomersStore = defineStore('customers', () => {
  const customers = ref<Customer[]>([])
  const selectedCustomer = ref<Customer | null>(null)

  const fetchCustomers = async () => {
    const res = await axios.get('http://localhost:4000/customers')
    customers.value = await res.data
  }

  const deleteCustomer = (customerId: string) => {
    customers.value = customers.value.filter(
      (customer) => customer.id !== customerId
    )
    axios.delete(`http://localhost:4000/customers/${customerId}`)
  }

  const addCustomer = async (customer: Omit<Customer, 'id'>) => {
    const res = await axios.post(`http://localhost:4000/customers`, customer)
    const id = (await res.data) as string
    customers.value.push({ id, ...customer })
  }

  const updateCustomer = ({
    id: customerId,
    ...updatedCustomerDetails
  }: Customer) => {
    customers.value = customers.value.map((customer) =>
      customer.id === customerId
        ? { id: customerId, ...updatedCustomerDetails }
        : customer
    )
    axios.put(`http://localhost:4000/customers/${customerId}`, {
      id: customerId,
      ...updatedCustomerDetails,
    })
  }

  return {
    customers,
    selectedCustomer,
    fetchCustomers,
    addCustomer,
    deleteCustomer,
    updateCustomer,
  }
})
