import React from "react";
import useUsers from './utils';
import './style.scss';
import InfiniteList from "../../components/InfiniteList";
import Loading from "../../components/Loading";
import DataFetchError from "../../components/DataFetchError";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import CreateUserModal from "../../components/CreateUserModal";


const User: React.FC = () => {

    const { 
        loadMoreUsers, users, isRowLoaded,
        height, width, renderRow,
        errorMsg, openModal, closeModal,
        isModalOpen,
    } = useUsers();


    return (
        <>
        <div className='User'>
            <div className="ContentContainer">
                {
                    users.length != 0
                    ? <InfiniteList
                            isRowLoaded={isRowLoaded}
                            loadMoreRowsCallback={loadMoreUsers}
                            height={height * 1.2}
                            width={width}
                            rowCount={users.length}
                            rowHeight={275}
                            renderRowCallback={renderRow}
                    />
                    : <div className='Container'>
                        {
                            errorMsg != ''
                            ? <DataFetchError onButtonClick={loadMoreUsers}/>
                            : <Loading/>
                        }
                    </div>
                }
            </div>

            <div className='ShowModalButton' onClick={openModal}>
                    <FontAwesomeIcon icon={faPlus} title='Add Users'/>
            </div>
        </div>
        <CreateUserModal isOpen={isModalOpen} handleClose={closeModal}/>
        </>
    )
}

export default User;