import { type ChangeEvent, type FC, useState } from 'react';
import './CreateTickets.css';

interface TicketProps {
    nameOfClient?: string;
    nameOfSeller?: string;
    price?: number;
    id: string;
    number: number;
    available: boolean;
}

const CreateTickets: FC = () => {
    const [numberOfTickets, setNumberOfTickets] = useState<string>('');
    const [priceOfTickets, setPriceOfTickets] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const [tickets, setTickets] = useState<TicketProps[]>([]);

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

        setNumberOfTickets(inputValue);
    };

    const handleCreateTickets = () => {
        setShowModal(true);
    };

    const confirmCreateTickets = () => {
        const numValue = Number(numberOfTickets);
        const price = Number(priceOfTickets) | 10;

        if (!error && numValue > 0) {
            const newTickets: TicketProps[] = Array.from({length: numValue}, (_, index) => ({
                id: crypto.randomUUID(),
                price,
                number: index + 1,
                available: true
            }));

            setTickets(prevTickets => [...prevTickets, ...newTickets]);
            setShowModal(false);
            setNumberOfTickets('');
            setTimeout(() => console.log(tickets), 1)
        }
    };

    return (
        <div>
            <div className="number-input-container">
                <input
                    type="number"
                    className="number-input"
                    value={numberOfTickets}
                    onChange={handleChange}
                    min="0"
                    max="9999"
                    placeholder="Numero de tickets"
                    aria-label="Número de tickets"
                />

                <input
                    type="number"
                    className="price-input"
                    value={priceOfTickets}
                    onChange={(e) => setPriceOfTickets(e.target.value)}
                    min="0"
                    placeholder="Precio"
                    aria-label="Precio de tickets"
                />

                {error && <span className="number-input-error">{error}</span>}

                <button
                    className="create-button"
                    onClick={handleCreateTickets}
                    disabled={!!error || !numberOfTickets || !priceOfTickets}
                >
                    Crear tickets
                </button>

                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <p className="modal-message">¿Estás seguro que deseas crear {numberOfTickets} tickets con precio ${priceOfTickets}?</p>
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
        </div>
    );
};

export default CreateTickets;
