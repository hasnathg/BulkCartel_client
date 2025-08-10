import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import { Helmet } from 'react-helmet-async';


const Register = () => {
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { createUser, setUser } = useContext(AuthContext);  
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const photo = form.photo.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    if (name.length < 4) {
      setNameError("Name should be more than 3 characters");
      return;
    } else {
      setNameError("");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/; // at least 6 chars, upper & lower case
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 6 characters, include uppercase and lowercase letters.");
      return;
    } else {
      setPasswordError("");
    }

    createUser(email, password)
      .then(({ user: createdUser }) => {
        return updateProfile(createdUser, {
          displayName: name,
          photoURL: photo,
        }).then(() => {
            const updatedUser = {
                ...createUser,
                displayName: name,
                photoURL: photo,
                
            };

          setUser(updatedUser);
          toast.success('Registration successful!');
          navigate("/");
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
      <>
      <Helmet>
        <title>Register | BulkCartel</title>
      </Helmet>
    <div className='flex justify-center min-h-screen items-center'>
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5">
        <h2 className='font-semibold text-2xl text-center'>Register your account</h2>
        <form onSubmit={handleRegister} className="card-body">
          <fieldset>
            <label className="label">Name</label>
            <input name="name" type="text" className="input" placeholder="Name" required />
            {nameError && <p className="text-xs text-error">{nameError}</p>}

            <label className="label">Photo URL</label>
            <input name='photo' type="text" className="input" placeholder="Photo URL" required />

            <label className="label">Email</label>
            <input name='email' type="email" className="input" placeholder="Email" required />

            <label className="label">Password</label>
            <input name='password' type="password" className="input" placeholder="Password" required />
            {passwordError && <p className="text-xs text-error">{passwordError}</p>}

            <button type='submit' className="btn btn-neutral mt-4">Register</button>
            <p className='pt-5 font-semibold text-center'>
              Already have an account? <Link to="/Login">Login</Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;
