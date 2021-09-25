import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Spinner animation='grow' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
