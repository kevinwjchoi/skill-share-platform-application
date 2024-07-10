import React from "react";
import { useEffect , useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingForm from '../components/SettingForm';
import RoleForm from "../components/RoleForm";

function Setting({user, setUser, handleNewRole, roles}){
    const navigate = useNavigate();
    const [showSettingForm, setShowSettingForm] = useState(false);
    const [showRoleForm, setShowRoleForm] = useState(false);
    const [showSettingButtons, setShowSettingButtons] = useState(true);


    useEffect(() => {
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
      };
    
    const roleNames = roles && roles.length > 0 ? roles.map(role => role.name).join(', ') : 'None';

    const toggleSettingForm = () => {
        setShowSettingForm(!showSettingForm);
        setShowSettingButtons(!showSettingButtons);
    }

    const toggleRoleForm = () => {
        setShowRoleForm(!showRoleForm);
        setShowSettingButtons(!showSettingButtons)
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


    return (
    <>
        <div>
            <h1>Settings</h1>
            <h2>Username: {user.username}</h2>
            <h2>Roles: {roleNames}</h2>

            {showSettingButtons && (<button onClick={toggleRoleForm}>Add Role</button>)}
            {showSettingButtons && (<button onClick={toggleSettingForm}>Change Password</button>)}
            {showSettingButtons && (<button onClick={deleteAccountButton}>Delete Account</button> )}

            {showRoleForm && <RoleForm toggleRoleForm={toggleRoleForm} handleNewRole={handleNewRole}/>}
            {showSettingForm && <SettingForm setUser={setUser} toggleSettingForm={toggleSettingForm}/>}
        </div> 
    </>
    );
}
export default Setting;