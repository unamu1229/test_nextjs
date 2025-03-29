import React from "react";

type Props = {
    id: number;
    task: string;
    completed: boolean;
    changeCompleted: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({id, task, completed, changeCompleted}: Props) => {
    return (
        <div>
            <input type="checkbox" id={id.toString()} checked={completed} onChange={() => changeCompleted(id)}/>
            <label htmlFor={id.toString()}>{task}</label>
        </div>
    )
}