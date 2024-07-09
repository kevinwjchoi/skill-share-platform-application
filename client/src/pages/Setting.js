import React from "react";
import { useEffect , useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingForm from '../components/SettingForm'
import RoleForm from "../components/RoleForm";

function Setting({user, setUser, handleNewRole, roles}){
    const navigate = useNavigate();
    const [showSettingForm, setShowSettingForm] = useState(false);
    const [showButtons, setShowButtons] = useState(true);
    const [showRoleForm, setShowRoleForm] = useState(false);

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
        setShowButtons(!showButtons);

    }

    const toggleRoleForm = () => {
        setShowRoleForm(!showRoleForm);
        setShowButtons(!showButtons)
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

            {showButtons && (<button onClick={toggleRoleForm}>Add Role</button>)}
            {showButtons && (<button onClick={toggleSettingForm}>Change Password</button>)}
            {showButtons && (<button onClick={deleteAccountButton}>Delete Account</button> )}
            
            {showRoleForm && <RoleForm toggleRoleForm={toggleRoleForm} handleNewRole={handleNewRole}/>}
            {showSettingForm && <SettingForm setUser={setUser} toggleSettingForm={toggleSettingForm}/>}
        </div> 
    </>
    );
}
export default Setting;