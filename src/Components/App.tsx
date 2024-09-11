import React, { FormEvent, ChangeEvent, useState } from "react";
import MyButton from "./Button/Button";

interface todoItem {
  id: number;
  taskName: string;
  checked: boolean;
}

// Store the maximum id given to new tasks
let globalTaskId = 3;

function App() {
  // The current task name entered in the input form
  const [currentTaskName, setCurrentTaskName] = useState("");
  // Store the full list of todoItem/task
  const [todoList, setTodoList] = useState<todoItem[]>([
    { id: 0, taskName: "Eat", checked: true },
    { id: 1, taskName: "Sleep", checked: true },
    { id: 2, taskName: "Repeat", checked: false },
  ]);

  const handleAddTask = (taskName: string) => {
    setTodoList([
      ...todoList,
      { id: globalTaskId++, taskName, checked: false },
    ]);
  };

  const handleRemoveTask = (taskId: number) => {
    const newTodoList = todoList.filter((taskItem) => taskItem.id !== taskId);
    setTodoList(newTodoList);
  };

  // Change the name the task by it's id
  const handleChangeTask = (taskId: number, taskName: string) => {
    const targetTaskIndex = todoList.findIndex(
      (taskItem) => taskItem.id === taskId
    );
    const changedTask = { ...todoList[targetTaskIndex], taskName };
    const newTodoList = [
      ...todoList.slice(0, targetTaskIndex),
      changedTask,
      ...todoList.slice(targetTaskIndex + 1),
    ];

    setTodoList(newTodoList);
  };

  // Check or uncheck a task given it's id
  const handleCheckingTask = (targetTaskId: number) => {
    const targetTaskIndex = todoList.findIndex(
      (taskItem) => taskItem.id === targetTaskId
    );
    const changedTask = { ...todoList[targetTaskIndex] };
    changedTask.checked = !changedTask.checked;
    const newTodoList = [
      ...todoList.slice(0, targetTaskIndex),
      changedTask,
      ...todoList.slice(targetTaskIndex + 1),
    ];

    setTodoList(newTodoList);
  };

  // Update the input value in the form of the current task
  const handleCurrentTaskInput = (event: ChangeEvent) => {
    const value = (event.target as HTMLInputElement).value;
    setCurrentTaskName(value);
  };

  // Prevent form from submitting and erase the content of the input value
  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    handleAddTask(currentTaskName);
    setCurrentTaskName((_) => "");
  };

  // Display a prompt modal to allow the user to enter a new task name
  const editEvent = (currentTaskName: string) => {
    const newTaskName =
      prompt(`What's the new name of the task ${currentTaskName} ?`) || "";
    return newTaskName;
  };

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Todo App</h1>
          <form onSubmit={handleFormSubmit} className="flex mt-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Add Todo"
              value={currentTaskName}
              onChange={handleCurrentTaskInput}
            />
            <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-green-800 hover:bg-teal">
              Add
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-grey-darkest">
            {todoList.length} tasks remaining
          </h2>

          <ul
            role="list"
            className="todo-list stack-large stack-exception"
            aria-labelledby="list-heading"
          >
            {todoList.map(({ id, taskName, checked }: todoItem) => {
              return (
                <li
                  className="flex flex-wrap sm:flex-nowrap mb-4 items-center"
                  key={`task-${id}`}
                  id={`task-${id}`}
                >
                  <p
                    className={`w-full ${
                      checked ? "line-through text-green" : "text-grey-darkest"
                    }`}
                  >
                    {taskName}
                  </p>

                  <div className="flex flex-nowrap w-fit gap-x-4 mt-2 sm:ml-4 sm:mt-0">
                    {!checked && (
                      <MyButton
                        handleClick={() =>
                          handleChangeTask(id, editEvent(taskName))
                        }
                        classValue="hover:text-sky-600"
                      >
                        Change
                      </MyButton>
                    )}

                    <MyButton
                      handleClick={() => handleCheckingTask(id)}
                      classValue={`text-nowrap hover:text-orange-400 ${
                        checked
                          ? "text-grey border-grey hover:bg-grey"
                          : "text-green border-green hover:bg-green"
                      }`}
                    >
                      {checked ? "Not Done" : "Done"}
                    </MyButton>

                    <MyButton
                      classValue="text-red border-red-800 hover:text-slate-50 hover:bg-red-800"
                      handleClick={() => handleRemoveTask(id)}
                    >
                      Remove
                    </MyButton>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
