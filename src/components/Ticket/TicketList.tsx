import { type FC } from 'react';
import './Ticket.css';

interface TicketProps {
    nameOfClient?: string;
    nameOfSeller?: string;
    price: number;
    id: string;
    available?: boolean;
}

interface TicketListProps {
    tickets: TicketProps[];
}

const TicketList: FC<TicketListProps> = ({ tickets }) => {
    return (
        <div className="ticket-list">
            Tickets
            {tickets.map(ticket => (
                <div
                    key={ticket.id}
                    className={`ticket-card ${!ticket.available ? 'ticket-unavailable' : ''}`}
                >
                    <div className="ticket-header">
                        <span className="ticket-id">#{ticket.id}</span>
                        <span className={`ticket-status ${ticket.available ? 'available' : 'unavailable'}`}>
                            {ticket.available ? 'Disponible' : 'No disponible'}
                        </span>
                    </div>
                    <div className="ticket-body">
                        {ticket.nameOfClient && (
                            <div className="ticket-field">
                                <label>Cliente:</label>
                                <span>{ticket.nameOfClient}</span>
                            </div>
                        )}
                        {ticket.nameOfSeller && (
                            <div className="ticket-field">
                                <label>Vendedor:</label>
                                <span>{ticket.nameOfSeller}</span>
                            </div>
                        )}
                        <div className="ticket-field">
                            <label>Precio:</label>
                            <span>${ticket.price.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TicketList;
