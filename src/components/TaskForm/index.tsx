import { FC, useState } from "react";
import PullDown from "components/PullDown";
import { PRIORITYS, PRIORITY_VALUES } from "const";
import moment from "moment";
import { validateTask } from "utils";

export interface ITask {
  id: string,
  taskName: string,
  description: string,
  dueDate: string,
  priority: number,
}

interface TaskFormProps {
  onSubmit: (data: ITask) => void,
  task?: ITask,
}

interface IError {
  title?: string,
  dueDate?: string,
}

const TaskForm: FC<TaskFormProps> = ({ onSubmit, task }) => {
  const [taskName, setTaskName] = useState(task?.taskName ?? "");
  const [dueDate, setDueDate] = useState<string>(task ? task.dueDate : moment().format("yyyy-MM-DD"));
  const [description, setDescription] = useState(task?.description ?? "");
  const [priority, setPriority] = useState(task?.priority ?? PRIORITY_VALUES.LOW);
  const [errors, setErrors] = useState<IError | null>(null);
  const ERR_KEY_TITLE = "title";
  const ERR_KEY_DATE = "dueDate";


  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    const data: ITask = {
      id: task?.id ?? moment().format(),
      taskName,
      dueDate,
      description,
      priority,
    }
    const errs = validateTask(data);
    if (!errs) {
      onSubmit(data);
    }
    setErrors(errs);
  }

  const handlePriorityChange = (value: number) => {
    setPriority(value);
  }

  const handleDateChange = (evt: any) => {
    setDueDate(evt.target.value);
  }

  const handleTaskName = (evt: any) => {
    setTaskName(evt.target.value);
  }

  const handleDescription = (evt: any) => {
    setDescription(evt.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input className="text-input" placeholder="Add new task ..." value={taskName} onChange={handleTaskName} />
      {errors && errors[ERR_KEY_TITLE] && <span className="error">{errors[ERR_KEY_TITLE]}</span>}
      <span className="text-bold d-block mt-10">Description</span>
      <textarea className="text-input mt-4" value={description} onChange={handleDescription} />
      <div className="wrap-label">
        <span className="text-bold d-block mt-10">Due date</span>
        <span className="text-bold d-block mt-10">Priority</span>
      </div>
      <div className="wrap-input">
        <input type="date" className="date-input" onChange={handleDateChange} value={dueDate} />
        <PullDown options={PRIORITYS} onChange={handlePriorityChange} initValue={priority} />
      </div>
      <div className="wrap-error">
        {errors && errors[ERR_KEY_DATE] && <span className="error">{errors[ERR_KEY_DATE]}</span>}
      </div>
      <button type="submit" className="btn-green mt-40">{task ? "Update" : "Add"}</button>
    </form>
  );
};

export default TaskForm;