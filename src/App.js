import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [todo, settodo] = useState([]);
  const [editindex, seteditindex] = useState(null);
  const edittedtext = useRef(null);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todo"));
    if (storedTodos) {
      settodo(storedTodos);
    }
  }, []);

  const saveTodo = (todos) => {
    localStorage.setItem("todo", JSON.stringify(todos));
  };

  const newinput = useRef(null);

  const handledel = (index) => {
    const newtodo = todo.filter((_, i) => i !== index);
    settodo(newtodo);
    saveTodo(newtodo);
  };

  const handleadd = () => {
    if (newinput.current.value !== "") {
      const newtodo = [...todo, newinput.current.value];
      settodo(newtodo);
      saveTodo(newtodo);
      newinput.current.value = "";
    }
  };

  const handleedit = () => {
    const updatedTodos = [...todo];
    updatedTodos.splice(editindex, 1, edittedtext.current.value);
    settodo(updatedTodos);
    seteditindex(null);
    saveTodo(updatedTodos);
  };

  return (
    <>
      <input ref={newinput} type="text" />
      <button onClick={handleadd}>Submit</button>
      {todo.map((e, index) => (
        <div key={index}>
          {editindex !== index ? (
            <div>
              {e} <button onClick={() => handledel(index)}>delete</button>
              <button onClick={() => seteditindex(index)}>edit</button>
            </div>
          ) : (
            <div>
              <input ref={edittedtext} type="text" placeholder={todo[editindex]} />
              <button onClick={handleedit}>save</button>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default App;
