import { useFormStatus } from 'react-dom';

const Submit: React.FC = () => {
  const status = useFormStatus();
  return (
    <button type="submit" disabled={status.pending}>
      Submit
    </button>
  );
};

export default Submit;
