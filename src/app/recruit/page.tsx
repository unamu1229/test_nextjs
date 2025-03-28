'use client'

import {useState} from "react";

export default function Page() {

    const todoListInit = [
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

    return <>
        <h1>RecruitのReact研修</h1>
        <ul>
            {
                todoList.map((todo) => {

                    return <li>
                        <input type="checkbox" id={todo.id} checked={todo.completed} onClick={() => changeCompleted(todo.id)}/>
                        <label for={todo.id}>{todo.task}</label>
                    </li>
                })
            }
        </ul>
    </>;
}