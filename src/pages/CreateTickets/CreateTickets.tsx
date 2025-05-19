import { ChangeEvent, FC, useState } from 'react';
import './CreateTickets.css';

const CreateTickets: FC = () => {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const numValue = Number(inputValue);

        if (numValue > 10000) {
            setError('El número debe ser menor a 10000');
        } else if (numValue < 0) {
            setError('El número debe ser positivo');
        } else {
            setError('');
        }

        setValue(inputValue);
    };

    const handleCreateTickets = () => {
        setShowModal(true);
    };

    const confirmCreateTickets = () => {
        const numValue = Number(value);
        if (!error && numValue > 0) {
            console.log(numValue);
            setShowModal(false);
        }
    };

    return (
        <div className="number-input-container">
            <input
                type="number"
                className="number-input"
                value={value}
                onChange={handleChange}
                min="0"
                max="9999"
                placeholder="Ingresa un número"
                aria-label="Número de tickets"
            />
            {error && <span className="number-input-error">{error}</span>}
            <button
                className="create-button"
                onClick={handleCreateTickets}
                disabled={!!error || !value}
            >
                Crear tickets
            </button>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p className="modal-message">¿Estás seguro que deseas crear {value} tickets?</p>
                        <div className="modal-buttons">
                            <button className="confirm-button" onClick={confirmCreateTickets}>
                                Confirmar
                            </button>
                            <button className="cancel-button" onClick={() => setShowModal(false)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateTickets;
