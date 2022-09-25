import React from "react";
import Modal from 'react-modal';
import CommentModel from "../../assets/classes/GoRESTClient/types/comment";
import CommentItem from "../CommentItem/CommentItem";
import { List, ListRowProps } from 'react-virtualized';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'



interface ListModalProps {
    //Modal
    isOpen: boolean
    handleClose: () => void,

    //List
    data: CommentModel[],
    height: number,
    width: number,
    rowCount: number,
    rowHeight: number,
    listClassName?: string,
}

const ListModal: React.FC<ListModalProps> = (props) => {

    const defaultListClassName = 'List';
    const renderRow = (renderProps: ListRowProps): JSX.Element => {
        return <CommentItem
            key={renderProps.key}
            style={renderProps.style}
            data={props.data[renderProps.index]}
        />
    }

    return <Modal
        isOpen={props.isOpen}
        className='ModalContainer'
        overlayClassName='ModalOverlay'
    >
            <div className='Modal'>
                <div className='Icon' onClick={props.handleClose}>
                    <FontAwesomeIcon icon={faCircleXmark} title='Go back'/>
                </div>
                <List
                    height={props.rowHeight}
                    width={props.width}
                    rowCount={props.rowCount}
                    rowHeight={props.rowHeight}
                    rowRenderer={renderRow}
                    className={props.listClassName ? props.listClassName : defaultListClassName}
                    style={{ width: '100%' }}
                />
            </div>
    </Modal>
}

export default ListModal;