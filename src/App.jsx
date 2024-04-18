import { useState } from "react";
import "./App.css";
import TodoForm from "./Component/Form/Form";
import TodoCard from "./Component/Card/Card";

const initialData = [
  
];

function App() {
  const [filtervalue, setFilterValue] = useState("all");
  const [data, setData] = useState(initialData);

  const handleFilter = (e) => {
    setFilterValue(e.target.value);
  };

  const handleAddTodo = (newTodo) => {
    const newId = Math.max(...data.map((item) => item.id)) + 1;
    const newData = [...data, { id: newId, ...newTodo }];
    setData(newData);
  };

  const onUpdateStatus = (id, newStatus) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setData(updatedData);
  };

  const handleDeleteTodo = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  return (
    <>
      {console.log(data)}
      <TodoForm onAddTodo={handleAddTodo} />
      <div className="todo-header">
        <h2 className="todo-title-text">Todo</h2>
        <form className="todo-filter">
          <label htmlFor="todo-filter" className="todo-lbl" id="todo-filter">
            Status Filter:
          </label>
          <select
            name="filter"
            id="todo-filter"
            className="todo-select"
            onChange={handleFilter}
          >
            <option value="all" className="todo-filter-option">
              All
            </option>
            <option value="completed" className="todo-filter-option">
              Completed
            </option>
            <option value="not-completed" className="todo-filter-option">
              Not-Completed
            </option>
          </select>
        </form>
      </div>
      <div className="todo-container">
        {filtervalue === "all" &&
          data.map((item) => (
            <TodoCard
              key={item.id}
              {...item}
              onUpdateStatus={onUpdateStatus}
              onDeleteTodo={handleDeleteTodo}
            />
          ))}
        {filtervalue === "completed" &&
          data
            .filter((item) => item.status === true)
            .map((item) => (
              <TodoCard
                key={item.id}
                {...item}
                onUpdateStatus={onUpdateStatus}
                onDeleteTodo={handleDeleteTodo}
              />
            ))}
        {filtervalue === "not-completed" &&
          data
            .filter((item) => item.status === false)
            .map((item) => (
              <TodoCard
                key={item.id}
                {...item}
                onUpdateStatus={onUpdateStatus}
                onDeleteTodo={handleDeleteTodo}
              />
            ))}
      </div>
    </>
  );
}

export default App;