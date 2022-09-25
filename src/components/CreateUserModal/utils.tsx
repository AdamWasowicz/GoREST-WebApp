import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setStep } from '../../redux/features/auth-slice';
import { useAppSelector } from '../../redux/hooks';
import CreateUserAuth from './CreateUserAuth';
import CreateUserForm from './CreateUserForm';


const useCreateUserModal = (closeModal: () => void) => {    

    const dispatch = useDispatch();
    const step = useAppSelector(state => state.auth.step);

    const renderAuthSettings = (): JSX.Element => {
        return <CreateUserAuth/>
    }

    const renderForm = (): JSX.Element => {
        return <CreateUserForm closeModal={closeModal}/>
    }

    const renderScreen = (): JSX.Element => {
        switch(step) {
            case 0:
                return renderAuthSettings();
            case 1:
                return renderForm();
            default:
                return renderAuthSettings();
        }
    }


    useEffect(() => {
        dispatch(setStep(0));
    }, [])

    return { 
        step, renderScreen
    }
}

export default useCreateUserModal;