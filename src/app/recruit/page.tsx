'use client'

import {ChangeEvent, ChangeEventHandler, KeyboardEventHandler, MouseEventHandler, useState} from "react";
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

    const [todoList, changeTodoList] = useState(todoListInit);

    const changeCompleted = (id: number) => {
        const changedTodoList = todoList.map((todo) => {
            if (todo.id == id) {
                return {
                    ...todo,
                    completed: !todo.completed
                }
            }
            return  todo;
        })
        changeTodoList(changedTodoList);
    }

    const deleteTodo = (id: number) => {
        const changedTodoList = todoList.filter((todo) => {
            return todo.id !== id;
        })
        changeTodoList(changedTodoList);
    }

    const [newTodo, setNewTodo] = useState("");
    const changeNewTodo: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTodo(event.currentTarget.value);
    };

    const addTodoFromEnter: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key !== "Enter") {
            return;
        }
        addTodo();
    }

    const addTodoFromButton: MouseEventHandler<HTMLButtonElement> = (event) => {
        addTodo();
    }

    function addTodo() {
        if (newTodo === "") {
            return;
        }

        const currentMaxId: number = todoList.reduce((accumulator:number , todo: Todo) => {
            return accumulator > todo.id ? accumulator : todo.id;
        }, 0);
        const newTodoList = [...todoList, {id: currentMaxId + 1, task: newTodo, completed: false}];
        changeTodoList(newTodoList);
        setNewTodo("");
    }


    return <>
        <h1>RecruitのReact研修</h1>
        <input type="text" value={newTodo} onChange={changeNewTodo} onKeyDown={addTodoFromEnter}/> <button onClick={addTodoFromButton}>追加</button>
        <ul>
            {
                todoList.map((todo) => {

                    return <li key={todo.id}>
                        <TodoItem id={todo.id} task={todo.task} completed={todo.completed} changeCompleted={changeCompleted} deleteTodo={deleteTodo}/>
                    </li>
                })
            }
        </ul>
    </>;
}