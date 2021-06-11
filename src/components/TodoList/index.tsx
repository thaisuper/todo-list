import { FC, useEffect, useState } from "react";
import TaskForm, { ITask } from "components/TaskForm";
import { getTodoList, saveTask, saveTasks } from "utils";
import TaskList from "components/TaskList";

const TodoList: FC = () => {
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState(getTodoList());
  const [checks, setChecks] = useState<string[]>([]);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const loadTasks = () => {
    setTasks(getTodoList());
  }

  const handleAdd = (data: ITask) => {
    // setValue1(saveTask(data));
    saveTask(data);
    loadTasks();
  }

  const onBulkDone = () => {
    alert("Temporarily ignore the Done method");
  }

  const onBulkRemove = () => {
    saveTasks(tasks.filter(todo => !checks.includes(todo.id)));
    loadTasks();
  }

  const hadleDelete = (id: string) => {
    saveTasks(tasks.filter(todo => id !== todo.id));
    loadTasks();
  }

  const matchSearch = (task: ITask) => {
    if (search.length === 0) {
      return true;
    }
    return task.taskName.includes(search.trim());
  }

  const handleSearch = (evt: any) => {
    setSearch(evt.target.value);
  }

  return (
    <div className="container">
      <div className="wrap left">
        <p className="title">New Task</p>
        <TaskForm onSubmit={handleAdd} />
      </div>
      <div className="wrap right">
        <p className="title">To Do List</p>
        <input className="text-input mb-10" placeholder="Search ..." onChange={handleSearch} />
        <TaskList taskList={tasks.filter(t => matchSearch(t))} onTaskChecks={(ids => setChecks(ids))} onDelete={hadleDelete} />
        {checks.length > 0 &&
          <div className="bulk">
            <span>Bulk Action:</span>
            <div className="wrap-btn">
              <button type="button" className="btn-blue mr-10" onClick={onBulkDone}>Done</button>
              <button type="button" className="btn-red" onClick={onBulkRemove}>Remove</button>
            </div>
          </div>}
      </div>
    </div>
  )
}

export default TodoList;