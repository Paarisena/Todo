import { useState } from "react";
import PropTypes from "prop-types";
import "./Card.css";

const TodoCard = ({
  id,
  name,
  description,
  status = false,
  onUpdateStatus,
  onDeleteTodo,
}) => {
  const [editedStatus, setEditedStatus] = useState(status);
  const [isEditing, setIsEditing] = useState(false);
  const [prevStatus, setPrevStatus] = useState(status);

  const handleEdit = () => {
    setIsEditing(true);
    setPrevStatus(editedStatus); 
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedStatus(prevStatus);
  };

  const handleSave = () => {
    setIsEditing(false);
    onUpdateStatus(id, editedStatus);
  };

  const handleDelete = () => {
    onDeleteTodo(id);
  };

  const handleStatusChange = (e) => {
    setEditedStatus(e.target.value === "true");
  };

  return (
    <div className="todo-card">
      <p className="todo-name">
        <span>Name: </span> {name}
      </p>
      <p className="todo-desc">
        <span>Description: </span>
        {description}
      </p>
      <div className="todo-status">
        <label htmlFor={`todo-filter-${id}`} className="todo-lbl">
          Status:
        </label>
        <select
          id={`todo-filter-${id}`}
          className="todo-select-card"
          value={editedStatus}
          onChange={handleStatusChange}
          disabled={!isEditing} 
        >
          <option value={true}>Completed</option>
          <option value={false}>Not Completed</option>
        </select>
      </div>
      {isEditing ? (
        <div className="btn-container">
          <button className="btn btn-save" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="btn-container">
          <button className="btn btn-edit" onClick={handleEdit}>
            Edit
          </button>
          <button className="btn btn-delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

TodoCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.bool,
  onUpdateStatus: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
};

export default TodoCard;