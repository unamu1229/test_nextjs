import React from "react";

type Props = {
    id: number;
    task: string;
    completed: boolean;
    changeCompleted: (id: number) => void;
    deleteTodo: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({id, task, completed, changeCompleted, deleteTodo}: Props) => {
    return (
        <div>
            <input type="checkbox" id={id.toString()} checked={completed} onChange={() => changeCompleted(id)}/>
            <label htmlFor={id.toString()}>{task}</label>
            <button onClick={() => deleteTodo(id)}>削除</button>
        </div>
    )
}