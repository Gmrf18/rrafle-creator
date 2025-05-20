import { type ChangeEvent, type FC, useState, useEffect, type FormEvent } from 'react';
import './CreateTickets.css';

interface TicketProps {
    nameOfClient?: string;
    nameOfSeller?: string;
    price: number; 
    id: string;
    number: number;
    available: boolean;
}

const MAX_TICKETS_ALLOWED = 10000;
const DEFAULT_TICKET_PRICE = 10; 

const CreateTickets: FC = () => {
    const [numberOfTickets, setNumberOfTickets] = useState<string>('');
    const [priceOfTickets, setPriceOfTickets] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const [tickets, setTickets] = useState<TicketProps[]>([]);

    useEffect(() => {
        if (tickets.length > 0) {
            console.log('Tickets:', tickets);
        }
    }, [tickets]); 

    const handleNumberOfTicketsChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setNumberOfTickets(inputValue);

        if (inputValue.trim() === '') {
            setError(''); 
            return;
        }

        const numValue = Number(inputValue);
        if (isNaN(numValue)) {
            setError('El número de tickets debe ser un valor numérico.');
        } else if (numValue <= 0) {
            setError('El número de tickets debe ser mayor que cero.');
        } else if (numValue > MAX_TICKETS_ALLOWED) {
            setError(`El número de tickets no puede exceder ${MAX_TICKETS_ALLOWED}.`);
        } else {
            setError(''); 
        }
    };

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setPriceOfTickets(inputValue);

        if (inputValue.trim() === '') {
            setError(''); 
            return;
        }

        const priceValue = Number(inputValue);
        if (isNaN(priceValue)) {
            setError('El precio debe ser un valor numérico.');
        } else if (priceValue < 0) {
            setError('El precio no puede ser negativo.');
        } else {
            setError(''); 
        }
    };

    const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        
        if (error || !numberOfTickets || !priceOfTickets) {
            
            console.warn('Attempted to create tickets with invalid input or error.');
            return;
        }
        setShowModal(true);
    };

    const confirmCreateTickets = () => {
        
        const numTicketsValue = Number(numberOfTickets);
        const priceInputString = priceOfTickets.trim();

        if (error || numTicketsValue <= 0 || numTicketsValue > MAX_TICKETS_ALLOWED || priceInputString === '') {
            
            console.error("Confirmation attempted with invalid data.");
            setShowModal(false);
            return;
        }

        let finalPrice = parseFloat(priceInputString);
        if (isNaN(finalPrice) || finalPrice < 0) { 
            finalPrice = DEFAULT_TICKET_PRICE;
        }
        
        


        const newTickets: TicketProps[] = Array.from({ length: numTicketsValue }, (_, index) => ({
            id: crypto.randomUUID(),
            price: finalPrice,
            number: index + 1, 
            available: true
        }));

        setTickets(prevTickets => [...prevTickets, ...newTickets]);
         console.log('Newly created tickets:', newTickets); 

        setShowModal(false);
        setNumberOfTickets(''); 
        setPriceOfTickets('');
        setError(''); 
    };

    const isButtonDisabled = !!error || !numberOfTickets.trim() || !priceOfTickets.trim();

    return (
        <div>
            <form onSubmit={handleSubmitForm} className="number-input-container">
                <input
                    type="number"
                    className="number-input"
                    value={numberOfTickets}
                    onChange={handleNumberOfTicketsChange}
                    min="1" 
                    max={MAX_TICKETS_ALLOWED}
                    placeholder="Número de tickets"
                    aria-label="Número de tickets"
                    aria-invalid={!!error && numberOfTickets.trim() !== ''} 
                    aria-describedby={error && numberOfTickets.trim() !== '' ? "input-error" : undefined}
                />

                <input
                    type="number"
                    className="price-input"
                    value={priceOfTickets}
                    onChange={handlePriceChange}
                    min="0" 
                    step="any" 
                    placeholder="Precio"
                    aria-label="Precio de tickets"
                    aria-invalid={!!error && priceOfTickets.trim() !== ''}
                    aria-describedby={error && priceOfTickets.trim() !== '' ? "input-error" : undefined}
                />

                {error && <span id="input-error" className="number-input-error">{error}</span>}

                <button
                    type="submit" 
                    className="create-button"
                    disabled={isButtonDisabled}
                >
                    Crear tickets
                </button>
            </form>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p className="modal-message">
                            ¿Estás seguro que deseas crear {numberOfTickets} tickets con precio ${parseFloat(priceOfTickets) || DEFAULT_TICKET_PRICE}?
                        </p>
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
