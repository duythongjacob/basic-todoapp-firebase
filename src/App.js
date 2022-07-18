import React, {useState,useEffect} from 'react'
import {  collection,addDoc,doc,onSnapshot, serverTimestamp, deleteDoc, setDoc, query, where, getDocs, orderBy, updateDoc} from 'firebase/firestore';


import './app.css'
import Todo from './Todo';
import db from './firebase'

import { Input,FormControl,InputLabel } from '@mui/material';
import { Button } from '@mui/material';
import { async } from '@firebase/util';


function App() {
  const [todos, setTodos] = useState([])
  const [input , setInput] = useState('')
  console.log(todos);
  console.log(" 🎸", input )
  //when the app loads, we need to listen to the database and feth new  todo as they get added/remove
  const  fetchData = () => {
    const collectionRef = collection(db, "todos")
    const queryOrder = orderBy("timestamp","desc")
    const q = query(collectionRef, queryOrder)
   const unsub = onSnapshot( q, (snapshot) => {
     setTodos(snapshot.docs.map((doc)=> ({...doc.data(), id: doc.id})))
 
    })
    return unsub
  
 
 
  }
 useEffect( ()=> { 
   fetchData()

 }, []); 
 

  const handleAdd = async() =>{
    try {

      // setDoc(docRef,payload) --> set
      // addDoc(collectionRef,playload)
      const collectionRef = collection(db, "todos")
      const playload = {todo: input, timestamp: serverTimestamp()}
      const docRef = await addDoc(collectionRef, playload)
      
      console.log("Document written with ID: ", docRef.id);
   
    } catch (e) {
      console.error("Error adding document: ", e);
    }
      

    
  }

  const addTodo = (event) => {
    event.preventDefault()
    // this will fire off when e click the button 
    console.log("👾", "im wroking!!!" )

    console.log(todos);
   
    handleAdd()

    setInput('')
  }
 const handleEdit = async (id) => {
        const value = prompt("Enter your todo Edit ?")
        console.log(id);
        const docRef = doc(db, 'todos',id)
        const payload = {todo: value, timestamp:serverTimestamp()}
        updateDoc(docRef,payload)
 }
 const handleDelete = async (id) => {
      const docRef = doc(db, 'todos',id)
      await deleteDoc(docRef)
 }
const handleQueryDelete = async () => {
      const sameValue = prompt("Enter your same value !")
      console.log(typeof value);
      const collectionRef = collection(db, "todos")
      const q = query(collectionRef, where("todo", "==", sameValue))
      console.log(q);
      const snapshot = await getDocs(q)
      const results = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
    console.log(results);
      results.forEach(async (result, index) => {
        if(index >= 1) {
          const docRef = doc(db, "todos", result.id)
          await deleteDoc(docRef)

        }
      })

}
  return (
    <div className="App">
      <form>
          <FormControl>
            <h3>ToDo test with firebase firestore 🔥 </h3>
            <Input value={input} onChange={ event => setInput(event.target.value)} />
            <Button disabled={!input} variant="contained" onClick={addTodo}> Add Todo</Button>
          </FormControl>
      </form>
      <button onClick={handleQueryDelete}> Query Detete </button>
        <ul>
            {todos.map((todo) => (

              <div  className='container' key={todo.id}>
                <Todo  text={todo.todo}/>
                <button onClick={ ()=> handleEdit(todo.id)} >edit</button>
                <button onClick={ ()=> handleDelete(todo.id)} >Delete</button>

              </div>


            )

            
            )}

        </ul>
    </div>
  )
}

export default App