import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';

function App() {
  const [todo,settodo]=useState([])
  const [editindex,seteditindex]=useState(null)
  const edittedtext=useRef(null)
  const newinput=useRef(null)
  const handledel=(index)=>{
    const newtodo=todo.filter((e,i)=>i!==index)
    settodo(newtodo)
  }
  const handleadd=()=>{
    if(newinput.current.value!=""){settodo([...todo,newinput.current.value])
      newinput.current.value=""
    }
  }
  const handleedit=()=>{
    todo.splice(editindex,1,edittedtext.current.value)
    seteditindex(null)

  }
  return (
   <>
   <input ref={newinput} type="text" /><button onClick={()=>handleadd()}>Submit</button>
  {todo.map((e,index)=><>{editindex!=index?<div>{e}<button onClick={()=>handledel(index)}>delete</button><button onClick={()=>seteditindex(index)}>edit</button></div>:<div><input ref={edittedtext} type="text" placeholder={todo[editindex]}/><button onClick={()=>handleedit()}>save</button></div>}</>)}
   </>
  );
}

export default App;
