
import { useState } from 'react'
import './App.css'
import { InputField } from './components/InputField';
import { DataTable } from './components/DataTable';

interface User {
  id:number;
  name :string;
  email :string
}
const data : User[] = [
  {
    id: 1, name :"Rahul" , email:"rahul22@gmail.com"
  },
  {
    id:2, name:"Rohan" ,email : "rohan765@gmail.com"
  }
]
const columns  = [
  { key: "id", title: "ID", dataIndex: "id" as keyof User, sortable: true },
  { key: "name", title: "Name", dataIndex: "name" as keyof User, sortable: true },
  { key: "email", title: "Email", dataIndex: "email" as keyof User }
]
function App() {
  const [value,setValue] = useState<string>("");
  return (
    <>
    <div className='p-5 space-y-10 '>
    <div className='space-y-2'>
      <h2 className='text-xl font-semibold'>Inputfield</h2>
      <InputField value={value} type="text" loading={false} variant="outlined" showPasswordToggle onChange={(e)=>setValue(e.target.value)} label='Enter Your Name' disabled={false} invalid={false} size='lg' placeholder='Enter your Name'/>
    </div>
    <div className='space-y-2' >
      <h2 className='text-xl font-semibold'>DataTable</h2>

      <DataTable data={data} columns={columns} loading={false} selectable={false} onRowSelect={(rows) => console.log("Selected Rows:" ,rows)} />
    </div>
    </div>
    </>
  )
}

export default App
