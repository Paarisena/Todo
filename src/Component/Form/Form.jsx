import { useState } from "react";
import "./Form.css";
import PropTypes from "prop-types";

const TodoForm = ({ onAddTodo }) => {
  const [todoName, setTodoName] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  const handleNameChange = (e) => setTodoName(e.target.value);
  const handleDescriptionChange = (e) => setTodoDescription(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
   
    onAddTodo({
      name: todoName,
      description: todoDescription,
      status: false,
    });
    setTodoName("");
    setTodoDescription("");
  };

  return (
    <>
      <h1 className="title">My Todo</h1>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todoName}
          className="todo-input"
          required
          placeholder="Todo Name"
          onChange={handleNameChange}
        />
        <input
          type="text"
          value={todoDescription}
          className="todo-input"
          required
          placeholder="Todo Description"
          onChange={handleDescriptionChange}
        />
        <button type="submit" className="btn btn-submit">
          Add Todo
        </button>
      </form>
    </>
  );
};

TodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default TodoForm;