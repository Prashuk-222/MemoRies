import { createContext, useContext, useState } from "react";
import { users_data } from '../constants';


//create context
const VerifyContext = createContext();
//create a provider component
const Authorization = ({ children }) => {
    const [isVerified, setIsVerified] = useState(false);

    return (
        <VerifyContext.Provider value={[isVerified, setIsVerified]}>
            {children}
        </VerifyContext.Provider>
    )
};

//custom hook to use the GlobalContext
const useVerify = () => useContext(VerifyContext);


const Id = createContext();
const GetID = ({ children }) => {
    const [id, setId] = useState('new');

    return (
        <Id.Provider value={[id, setId]}>
            {children}
        </Id.Provider>
    )
};

//custom hook to use the GlobalContext
const useID = () => useContext(Id);

//for user data
const UserData = createContext();
const GetUserData = ({ children }) => {
    const [user, setUser] = useState(users_data.users[0].notes);

    return (
        <UserData.Provider value={[user, setUser]}>
            {children}
        </UserData.Provider>
    )
};

const useUser = () => useContext(UserData);


export { Authorization, useVerify, GetID, useID, GetUserData, useUser }