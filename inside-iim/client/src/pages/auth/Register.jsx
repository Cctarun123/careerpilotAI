import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { LogoWordmark } from '../../components/icons/Logo';
import { isValidEmail, isValidPassword } from '../../utils/validators';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', targetRole: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!isValidEmail(form.email)) {
      setError('Enter a valid email');
      return;
    }
    if (!isValidPassword(form.password)) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await register(form);
      navigate('/onboarding/goal');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="mb-6">
          <LogoWordmark />
        </div>
        <h1 className="text-xl font-semibold text-black mb-1">Create account</h1>
        <p className="text-neutral-500 text-sm mb-6">Start your career journey</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['name', 'email', 'password', 'targetRole'].map((field) => (
            <div key={field}>
              <label className="block text-sm text-neutral-500 mb-1 capitalize">
                {field === 'targetRole' ? 'Target role (optional)' : field}
              </label>
              <input
                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                placeholder={field === 'targetRole' ? 'e.g. Frontend Developer' : ''}
                className="input-field"
                required={field !== 'targetRole'}
              />
            </div>
          ))}
          {error && <p className="text-neutral-400 text-sm border border-neutral-300 rounded-md p-3">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Create account'}
          </Button>
        </form>
        <p className="text-sm text-neutral-500 mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-black underline underline-offset-2">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
