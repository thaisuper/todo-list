/// <reference path="../../interface.d.ts"/>

import TaskItem from "components/TaskItem";
import { FC } from "react";

const TaskList: FC<ITaskList> = ({ taskList, onDelete, handleCheck }) => {

  const hadleDelete = (id: string) => {
    if (onDelete) {
      onDelete(id);
    }
  }

  return (
    <div className="list">
      {taskList && taskList.length > 0 && taskList.map(todo => (
        <TaskItem
          key={todo.id}
          task={todo}
          onCheck={handleCheck}
          onDelete={hadleDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;