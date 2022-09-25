import { AxiosError } from "axios";
import React, { useState } from "react";
import GoRESTClient from "../../assets/classes/GoRESTClient";
import { CreateUserModel } from "../../assets/classes/goRESTClient/types/user";
import { useAppSelector } from "../../redux/hooks";
import './style.scss';


const CreateUserForm: React.FC<{closeModal: () => void }> = (props) => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    
    const apiKey = useAppSelector(state => state.auth.apiKey);

    const clearForm = () => {
        setName('');
        setEmail('');
        setStatus('active');
        setGender('male');
    }
    
    const handleNameChange = (event: React.FormEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    }

    const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    }

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value);
    }

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender(event.target.value);
    }

    const handleOnSubmit = (event: any) => {
        event.preventDefault();

        const body: CreateUserModel = {
           name: name,
           email: email,
           status: status,
           gender: gender,
        };

        console.log(body);

        const client = new GoRESTClient();
        client.postNewUserReturnPromise(body, apiKey)
            .then(response => {
                alert('There is a new user in database');
                clearForm();
                props.closeModal();
            })
            .catch((error: AxiosError) => {
                console.log('Something went wrong...')
            });
    }


    return (
        <div className="CreateUserForm">
            <div className="Container">
                <h1>Create new User</h1>
                <form>
                    <div className="FieldContainer">
                        <label>
                            <p>Name and Surname:</p>
                            <input
                                type='text' 
                                name='name' 
                                value={name}
                                onChange={handleNameChange}
                            />
                        </label>

                        <label>
                            <p>Email:</p>
                            <input 
                                type='text' 
                                name='email' 
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </label>

                        <label>
                            <p>Status:</p>
                            <input 
                                type='radio' 
                                value='active' 
                                name='status' 
                                onChange={handleStatusChange}
                            /> Active
                            <input 
                                type='radio' 
                                value='inactive' 
                                name='status' 
                                onChange={handleStatusChange}
                            /> Inactive
                        </label>

                        <label>
                            <p>Gender:</p>
                            <input 
                                type='radio' 
                                value='male' 
                                name='gender' 
                                onChange={handleGenderChange}
                            /> Male
                            <input 
                                type='radio' 
                                value='female' 
                                name='gender' 
                                onChange={handleGenderChange}
                            /> Female
                        </label>
                    </div>

                    <button onClick={handleOnSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateUserForm;