/// <reference path="../../interface.d.ts"/>

import TaskForm from "components/TaskForm";
import { saveTask } from "helper/todoHelper";
import { FC, useState } from "react";

const TaskItem: FC<TaskItemProps> = ({ task, onCheck, onDelete }) => {

  const [showDetail, setShowDetail] = useState(false);

  const handleCheck = (evt: any) => {
    onCheck(task.id, evt.target.checked);
  }

  const handleUpdate = (task: ITask) => {
    saveTask(task);
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete(task.id);
    }
  }

  return (
    <div className="item">
      <div className="header">
        <div className="wrap-check">
          <input type="checkbox" onChange={handleCheck} />
          <span>{task.taskName}</span>
        </div>
        <div className="wrap-btn">
          <button type="button" className="btn-blue mr-10" onClick={() => setShowDetail(!showDetail)}>Detail</button>
          <button type="button" className="btn-red" onClick={handleDelete}>Remove</button>
        </div>
      </div>
      <div style={{ display: showDetail ? "block" : "none" }} className="wrap-from">
        <TaskForm onSubmit={handleUpdate} task={task} />
      </div>
    </div>
  );
};

export default TaskItem;