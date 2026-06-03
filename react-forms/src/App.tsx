import { useState } from 'react';
import './App.css';

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
      {isModalOpen && (
        <div className="overlay">
          <div className="modal">
            <h2>
              {formType === 'uncontrolled'
                ? 'Uncontrolled Form'
                : 'React Hook Form'}
            </h2>
            <p>Form will be here</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
      <div className="submitted-data">
        <h2 className="submitted-title">Submitted data</h2>
      </div>
    </div>
  );
}

export default App;
