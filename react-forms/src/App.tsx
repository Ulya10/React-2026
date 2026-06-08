import { useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import UncontrolledForm from './components/UncontrolledForm';
import ReactHookForm from './components/ReactHookForm';
import { useFormStore } from './store/useFormStore';

function App() {
  const submissionsForCards = useFormStore((state) => state.submissions);
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
          <UncontrolledForm onSuccess={closeModal} />
        ) : (
          <ReactHookForm onSuccess={closeModal} />
        )}
      </Modal>

      <div className="submitted-data">
        <h2 className="submitted-title">Submitted data</h2>
        {submissionsForCards.length === 0 ? (
          <p>No submissions yet</p>
        ) : (
          <div className="cards">
            {submissionsForCards.map((item) => (
              <div key={item.id} className="card">
                <p>
                  <strong>Name:</strong> {item.name}
                </p>
                <p>
                  <strong>Age:</strong> {item.age}
                </p>
                <p>
                  <strong>Email:</strong> {item.email}
                </p>
                <p>
                  <strong>Gender:</strong> {item.gender}
                </p>
                <p>
                  <strong>Country:</strong> {item.country}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
