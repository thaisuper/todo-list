import { ITask } from "components/TaskForm";
import TaskItem from "components/TaskItem";
import { FC, useEffect, useState } from "react";

interface ITaskList {
  taskList: ITask[],
  onTaskChecks: (ids: string[]) => void,
  onUpdated?: () => void,
  onDelete?: (id: string) => void,
}

const TaskList: FC<ITaskList> = ({ taskList, onTaskChecks, onUpdated, onDelete }) => {

  const [checks, setChecks] = useState<string[]>([]);

  useEffect(() => {
    onTaskChecks(checks);
  }, [checks, onTaskChecks]);

  const handleCheck = (id: string, value: boolean) => {
    // const ido = checks.indexOf(id);
    // remove if value = false and id in checks
    if (!value) {
      setChecks(checks.filter(c => c !== id));
    } else {
      setChecks([...checks, id]);
    }
  }

  // TODO: tmp
  const handleUpdated = () => {
    if (onUpdated) {
      onUpdated();
    }
  }

  const hadleDelete = (id: string) => {
    if (onDelete) {
      onDelete(id);
    }
  }

  return (
    <div className="list">
      {taskList && taskList.length > 0 && taskList.map(todo => (
        <TaskItem
          task={todo}
          onCheck={handleCheck}
          onUpdated={handleUpdated}
          onDelete={hadleDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;