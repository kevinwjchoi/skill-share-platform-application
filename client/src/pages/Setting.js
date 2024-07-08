import React from "react";
import { useEffect , useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingForm from '../components/SettingForm'

function Setting({user, setUser}){
    const navigate = useNavigate();
    const [showSettingForm, setShowSettingForm] = useState(false);
    const [showButtons, setShowButtons] = useState(true);

    const toggleSettingForm = () => {
        setShowSettingForm(!showSettingForm);
        setShowButtons(!showButtons);
    }



    const deleteAccountButton = () => {
        fetch('/users/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (response.ok) {
                setUser(null);
                navigate('/login');
            } else {
                return response.json().then((err) => {
                    console.error('Failed to delete user:', err.error);
                });
            }
        })
        .catch((error)=> {
            console.error('Error:', error);
        });
    };

    useEffect(() => {
        // auto-login
        fetch("/check_session").then((r) => {
          if (r.ok) {
            r.json().then((data) => setUser(data));
          } else {
            navigate("/login"); 
          }
        });
      }, [setUser, navigate]);

      if (!user) {
        return <p>Loading...</p>;
      }

    return (
    <>
        <div>
            <h1>Settings</h1>
            <h2>Username: {user.username}</h2>
            {showButtons && (<button onClick={toggleSettingForm}>
                Change password
            </button>)}
            {showSettingForm && <SettingForm setUser={setUser} toggleSettingForm={toggleSettingForm}/>}
            {showButtons && (<button onClick={deleteAccountButton}>Delete Account</button> )}
        </div> 
    </>
    );
}
export default Setting;