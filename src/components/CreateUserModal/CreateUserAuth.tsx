import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setApiKey, setStep } from "../../redux/features/auth-slice";
import { useAppSelector } from "../../redux/hooks";
import './style.scss';


const CreateUserAuth: React.FC = () => {
    
    const [inputText, setInputText] = useState<string>('');
    const dispatch = useDispatch();
    

    const apiKey = useAppSelector(state => state.auth.apiKey);


    const handleTextInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        setInputText(event.currentTarget.value);
    }

    const handleContinueToNextStep = () => {
        dispatch(setStep(1));
    }

    const handleResetApiKey = () => {
        dispatch(setApiKey(''));
    }

    const handleEnterNewKey = () => {
        dispatch(setApiKey(inputText));
    }


    return (
        <div className="CreateUserAuth">
            {
                apiKey != ''
                ? <div className="Container">
                    <h1>Looks like you already entered API key</h1>
                    <p>You can use that or enter new one</p>
                    <div className="ButtonContainer">
                        <button onClick={handleContinueToNextStep}>Continue</button>
                        <button onClick={handleResetApiKey}>Enter new</button>
                    </div>
                </div>
                : <div className="Container">
                    <h1>Please enter your API key</h1>
                    <input
                        onChange={handleTextInputChange}
                        type='password'
                    />
                    <button onClick={handleEnterNewKey}>Enter</button>
                </div>
            }
        </div>
    )
}

export default CreateUserAuth;