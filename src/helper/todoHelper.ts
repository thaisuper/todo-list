/// <reference path="../interface.d.ts"/>

import { LOCAL_KEY } from "const";
import moment from "moment";
import { useEffect, useState } from "react";

export const saveTask = (task: ITask) => {
  let todoList = getTodoList();
  if (!task.id || todoList.filter(e => e.id === task.id).length === 0) {
    todoList.push(task);
  } else {
    todoList = todoList.map(t => t.id === task.id ? task : t);
  }
  localStorage.setItem(LOCAL_KEY, JSON.stringify(todoList));
}

export const saveTasks = (tasks: ITask[]) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(tasks));
}

export const useStateWithLocalStorage = (localStorageKey: string) => {
  const [value, setValue] = useState<string>(
    localStorage.getItem(localStorageKey) || ''
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [localStorageKey, value]);

  return [value, setValue];
};

export const getTodoList = () => {
  let todoList: ITask[] = [];
  const localData = localStorage.getItem(LOCAL_KEY);
  if (localData && localData.length > 0) {
    todoList = JSON.parse(localData);
  }
  return todoList;
}

export const validateTask = (task: ITask) => {
  const err: IError = {};
  const todos = getTodoList();
  if (!task.taskName || task.taskName.trim().length === 0) {
    err.title = "Please enter title of task!";
  } else if (todos.filter(to => to.taskName === task.taskName && to.id !== task.id).length > 0) {
    err.title = "Title is duplicate!";
  }
  if (moment().diff(moment(task.dueDate), "days") > 0) {
    err.dueDate = "Due date can't in the past!";
  }
  return Object.keys(err).length > 0 ? err : null;
}

export const formatDate = (date: string | Date | number, join: "-" | "/" = "/") => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join(join);
}