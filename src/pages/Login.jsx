import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
}).required();

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await login(data.email, data.password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log in. Please check your credentials.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page container section-padding">
      <div className="auth-card glass animate-fade">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Log in to your account to continue</p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              {...register('email')} 
              placeholder="email@example.com"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              {...register('password')} 
              placeholder="••••••••"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </div>

          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
