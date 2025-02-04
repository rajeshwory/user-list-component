import React from "react"
import { Loader } from '@/components/loader'
import { Card } from '@/components/card'
import useFetchUsers from '@/hooks/use-fetch-users'
import { useMemo, useState } from 'react'
import { PaginationComponent } from '@/components/pagination-footer'

function UserList() {
    const [users, loading, error] = useFetchUsers()
    const [searchInput, setSearchInput] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
  
    const filteredUsers = useMemo (() => {
      return users.filter(
      (user) =>
      user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.toLowerCase())
    )}, [searchInput, users])
    const perPage = 4
  
  
    const totalPages = Math.ceil(filteredUsers.length / perPage)
    const indexOfLastUser = currentPage * perPage
    const indexOfFirstUser = indexOfLastUser - perPage
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  
    const handlePageChange = (currentPage) => {
      setCurrentPage(currentPage)
    }
  
    if (loading) return <Loader />
    if (error) return <div className="text-center text-red-500">{error}</div>
    if (users.length === 0) return <div className="text-center">No users found.</div>
  
    return (
      <div>
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between'>
          <h1 className='text-4xl text-purple-500'>Users list</h1>
          <input className='min-w-96 border-2 rounded-lg border-gray-300 bg-slate-50 hover:border-purple-500 hover:bg-white p-2' 
          type='text' 
          placeholder='Search...'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          />
          </div>
          
          <div className='grid grid-cols-3 md:grid-cols-2 gap-4 md:gap-2 mt-5'>
            {currentUsers.map((user) => (
              <Card key={user.id} user={user} />
            ))}
          </div>
        </div>
        <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
      </div>
    )
  }
  
  export default UserList