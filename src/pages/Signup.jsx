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
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
}).required();

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await signup(data.email, data.password);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to create an account. ' + (error.message || ''));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page container section-padding">
      <div className="auth-card glass animate-fade">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join ShopWave and start your premium journey</p>
        
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

          <div className="form-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              {...register('confirmPassword')} 
              placeholder="••••••••"
              className={errors.confirmPassword ? 'input-error' : ''}
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
          </div>

          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Log In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
