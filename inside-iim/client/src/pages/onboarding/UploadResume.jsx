import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Icon from '../../components/icons/Icons';

export default function UploadResume() {
  const { uploadResume } = useResume();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setError('');
    setLoading(true);
    try {
      await uploadResume(file);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <h1 className="text-xl font-semibold text-black mb-1">Upload your resume</h1>
        <p className="text-neutral-500 text-sm mb-6">PDF only, max 5MB</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 rounded-md p-10 cursor-pointer hover:border-neutral-500 transition-colors">
            <div className="icon-box icon-box-lg mb-3">
              <Icon name="file" className="w-5 h-5" />
            </div>
            <span className="text-neutral-400 text-sm">
              {file ? file.name : 'Click to select PDF'}
            </span>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>
          {error && <p className="text-neutral-400 text-sm border border-neutral-300 rounded-md p-3">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading || !file}>
            {loading ? 'Uploading...' : 'Upload & continue'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => navigate('/dashboard')}
          >
            Skip for now
          </Button>
        </form>
      </Card>
    </div>
  );
}
