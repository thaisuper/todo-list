interface ITask {
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

interface IOptions {
  value: number,
  label: string,
}

interface PullDownProps {
  options: IOptions[],
  onChange: (value: number) => void,
  initValue: number
}

interface TaskItemProps {
  task: ITask,
  onCheck: (id: string, value: boolean) => void,
  onDelete?: (id: string) => void,
}

interface ITaskList {
  taskList: ITask[],
  onDelete?: (id: string) => void,
  handleCheck: (id: string, value: boolean) => void
}

interface TextInputProps {
  value?: string,
  placeholder?: string,
  onChange: (text: string) => void
}

interface IError {
  title?: string,
  dueDate?: string,
}