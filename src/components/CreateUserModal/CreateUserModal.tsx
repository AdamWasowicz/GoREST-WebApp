import React from 'react';
import Modal from 'react-modal';
import useCreateUserModal from './utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import { setStep } from '../../redux/features/auth-slice';


interface CreateUserModalProps {
    isOpen: boolean,
    handleClose: () => void,
}


const CreateUserModal: React.FC<CreateUserModalProps> = (props) => {

    const { renderScreen, step } = useCreateUserModal(props.handleClose);
    const dispatch = useDispatch();

    const handleGoBack = () => {
        dispatch(setStep(step - 1));
    }

    return (
        <Modal
            isOpen={props.isOpen}
            className='CreateUserModalContainer'
            overlayClassName='CreateUserModalOverlay'
        >
            <div className='CreateUserModal'>
                <div className='IconContainer'>
                    {
                        step > 0 && 
                        <div className='Icon' onClick={handleGoBack}>
                            <FontAwesomeIcon icon={faCircleArrowLeft} title='Go back' />
                        </div>
                    }

                    <div className='Icon' onClick={props.handleClose}>
                        <FontAwesomeIcon icon={faCircleXmark} title='Close' />
                    </div>

                </div>
                {renderScreen()}
            </div>
        </Modal>
    )
}

export default CreateUserModal;