import React from 'react';
import { TodoWithUserNameModel } from '../../assets/classes/goRESTClient/types/todo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faCircleCheck, IconDefinition, faCircleXmark } from '@fortawesome/free-solid-svg-icons'


const TodoItem: React.FC<{data: TodoWithUserNameModel, style: {}}> = ({data, style}) => {

    const isOverdue = (): boolean => {
        const due_on = new Date(data.due_on);
        const dateNow = new Date(Date.now());

        if (due_on.getTime > dateNow.getTime)
            return true;

        return false;
    }

    const getIcon = ():IconDefinition => {
        if (data.status === 'completed' && !isOverdue() )
            return faCircleCheck;
        else if (data.status === 'pending' && !isOverdue())
            return faCircleQuestion;
        else if (data.status === 'pending' && isOverdue())
            return faCircleXmark;
        
        return faCircleQuestion;
    }

    const getIconClassName = (): string => {
        let name = 'Icon';
        if (data.status === 'completed' && !isOverdue())
            name += ' Completed';
        else if (data.status === 'pending' && !isOverdue())
            name += ' Pending';
        else if (data.status === 'pending' && isOverdue())
            name += 'Overdue';

        return name;
    }

    return (
        <div className='TodoItem' style={style}>
            <div className='Container'>
                <div className='Data'>
                    <h1>{data.name}</h1>
                    <h3>{data.title}</h3>
                    <p className={data.status == 'pending' ? 'Pending' : ''}>{new Date(data.due_on).toDateString()}</p>
                </div>

                <div className={getIconClassName()}>
                    <FontAwesomeIcon
                        title={data.status.toLocaleUpperCase()}
                        icon={getIcon()}
                    />
                </div>
            </div>
        </div>
    )
}

export default TodoItem;