'use client'

import {ChangeEvent, ChangeEventHandler, KeyboardEventHandler, MouseEventHandler, useReducer, useState} from "react";
import { TodoItem } from "./TodoItem";

export default function Page() {

    type Todo = {
        id: number;
        task: string;
        completed: boolean;
    }

    const todoListInit: Todo[] = [
        { id: 1, task: "Learning Browser", completed: true },
        { id: 2, task: "Learning JavaScript/TypeScript", completed: true },
        { id: 3, task: "Learning React", completed: false },
        { id: 4, task: "Learning Next.js", completed: false },
    ];

    type CompletedAction = {
        type: "completed";
        id: number;
    }

    type DeletedAction = {
        type: "deleted";
        id: number;
    }

    type AddedAction = {
        type: "added";
        task: string;
    }

    type Action = CompletedAction | DeletedAction | AddedAction;

    const completeAction:(id: number) => CompletedAction =
        (id: number) => {
            return {
                type: "completed",
                id: id
            }
        }

    const deleteAction:(id: number) => DeletedAction =
        (id: number) => {
            return {
                type: "deleted",
                id: id
            }
        }

    const addAction:(task: string) => AddedAction =
        (task: string) => {
            return {
                type: "added",
                task: task
            }
        }

    const newTodoList = (todoList: Todo[], action: Action) => {
        switch (action.type) {
            case "completed":
                return todoList.map((todo) => {
                    if (todo.id == action.id) {
                        return {
                            ...todo,
                            completed: !todo.completed
                        }
                    }
                    return  todo;
                });

            case "deleted":
                return todoList.filter((todo) => {
                    return todo.id !== action.id;
                });

            case "added":
                if (action.task === "") {
                    return todoList;
                }

                const currentMaxId: number = todoList.reduce((accumulator:number , todo: Todo) => {
                    return accumulator > todo.id ? accumulator : todo.id;
                }, 0);

                return [
                    ...todoList,
                    {
                        id: currentMaxId + 1,
                        task: action.task,
                        completed: false
                    }
                ];
            default:
                return todoList;
        }
    }

    const [todoList, changeTodoListDispatch] = useReducer(newTodoList, todoListInit);

    const [newTodo, setNewTodo] = useState("");
    const changeNewTodo: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTodo(event.currentTarget.value);
    };

    return <>
        <h1>RecruitのReact研修</h1>
        <input type="text" value={newTodo} onChange={changeNewTodo}
               onKeyDown={
                    (event) => {
                        if (event.key !== "Enter") {
                            return;
                        }
                        changeTodoListDispatch(addAction(newTodo))
                        setNewTodo("")
                    }
               }
        />

        <button onClick={() => {
            changeTodoListDispatch(addAction(newTodo));
            setNewTodo("");
        }}>追加</button>

        <ul>
            {
                todoList.map((todo) => {

                    return <li key={todo.id}>
                        <TodoItem id={todo.id} task={todo.task} completed={todo.completed}
                                  changeCompleted={() => changeTodoListDispatch(completeAction(todo.id))}
                                      deleteTodo={() => changeTodoListDispatch(deleteAction(todo.id))}
                                      />
                    </li>
                })
            }
        </ul>
    </>;
}