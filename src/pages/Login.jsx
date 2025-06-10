import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';


const Login = () => {
  useEffect(() => {
    document.title = 'Login - Bulk Cartel';
  }, []);

  const [error, setError] = useState('');
  const { signIn, googleLogIn, resetPassword } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 6 characters, include an uppercase letter and a lowercase letter.");
      return;
    }

    signIn(email, password)
      .then((result) => {
        setError('');
        toast.success("Logged in successfully");
        navigate(location.state || '/');
      })
      .catch(() => {
        setError("Invalid email or password");
        toast.error("Login failed");
      });
  };

  const handleGoogleSignIn = () => {
    googleLogIn()
      .then(() => {
        toast.success("Logged in with Google!");
        navigate(location.state || '/');
      })
      .catch(() => {
        toast.error("Google Sign-In failed");
      });
  };

  return (
    <div className='flex justify-center min-h-screen items-center'>
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5">
        <h2 className='font-semibold text-2xl text-center'>Login your account</h2>
        <form onSubmit={handleLogin} className="card-body">
          <fieldset>
            <label className="label">Email</label>
            <input name='email' type="email" className="input" placeholder="Email" required />

            <label className="label">Password</label>
            <input name='password' type="password" className="input" placeholder="Password" required />

            <div>
              <Link
                to="/auth/forgot-password"
                state={{ email: document.querySelector('input[name="email"]')?.value || '' }}
                className="link link-hover text-sm text-blue-500 mt-2 block"
              >
                Forgot password?
              </Link>
            </div>

            {error && <p className='text-red-400 text-xs'>{error}</p>}

            <button type='submit' className="btn btn-neutral mt-4 mr-2">Login</button>
            <button type="button" onClick={handleGoogleSignIn} className="btn btn-outline mt-4">
              Sign in with Google
            </button>
            <p className='pt-5 font-semibold text-center'>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
