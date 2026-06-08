import { useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import UncontrolledForm from './components/UncontrolledForm';
import ReactHookForm from './components/ReactHookForm';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState<'uncontrolled' | 'hookform'>(
    'uncontrolled'
  );

  function openModal(type: 'uncontrolled' | 'hookform'): void {
    setIsModalOpen(true);
    setFormType(type);
  }

  function closeModal() {
    setIsModalOpen(false);
  }
  return (
    <div className="app">
      <h1>Forms</h1>
      <div className="buttons">
        <button className="button" onClick={() => openModal('uncontrolled')}>
          First form
        </button>
        <button className="button" onClick={() => openModal('hookform')}>
          Second form
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          formType === 'uncontrolled' ? 'Uncontrolled Form' : 'React Hook Form'
        }
      >
        {formType === 'uncontrolled' ? (
          <UncontrolledForm />
        ) : (
          <ReactHookForm/>
        )}
      </Modal>

      <div className="submitted-data">
        <h2 className="submitted-title">Submitted data</h2>
      </div>
    </div>
  );
}

export default App;
