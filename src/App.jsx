import './App.css'
import { Loader } from './components/loader'
import { Card } from './components/card'
import useFetchUsers from './hooks/use-fetch-users'
import { Header } from './components/header'

function App() {
  const [users, loading, error] = useFetchUsers()

  if (loading) return <Loader />
  if (error) return <div className="text-center text-red-500">{error}</div>
  if (users.length === 0) return <div className="text-center">No users found.</div>

  return (
    <div>
      <div className='flex flex-col'>
        <h1 className='text-4xl text-red-700'>Users list</h1>
        <div className='grid grid-cols-3 gap-4 mt-5'>
          {users.map((user) => (
            <Card key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
