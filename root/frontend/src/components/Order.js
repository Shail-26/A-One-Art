// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import Navbar from './Navbar';
// import '../assets/styles/Order.css';
// import '../assets/styles/forall.css';

// const EventForm = () => {
//     return (
//         <div>
//             <Navbar />
//             <div className="event-form-container">
//                 <form className="event-form">
//                     <div className="form-group">
//                         <label htmlFor="event">Event</label>
//                         <select id="event" name="event" required>
//                             <option value="">Select an Event</option>
//                             <option value="birthday">Birthday</option>
//                             <option value="anniversary">Anniversary</option>
//                             <option value="wedding">Wedding</option>
//                             <option value="corporate">Corporate Event</option>
//                             <option value="other">Other</option>
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="description">Description</label>
//                         <input type="text" id="description" />
//                     </div>
//                     <div className="form-group">
//                         <label>Date</label>
//                         <div className="date-range">
//                             <input type="date" id="date-from" />
//                             <span>To</span>
//                             <input type="date" id="date-to" />
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="location">Location</label>
//                         <input type="text" id="location" />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="estimated-price">Estimated Price</label>
//                         <input type="text" id="estimated-price" />
//                     </div>
//                     <button type="submit">Submit</button>
//                 </form>
//             </div>

//         </div>
//     );
// };

// export default EventForm;


import React, { useState } from 'react';
import Navbar from './Navbar';
import '../assets/styles/Order.css';
import '../assets/styles/forall.css';

const EventForm = () => {
    const [formData, setFormData] = useState({
        event: '',
        description: '',
        dateFrom: '',
        dateTo: '',
        location: '',
    });

    const [estimatedPrice, setEstimatedPrice] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Logic to calculate the estimated price
        const calculatedPrice = 1000; // Example static value, replace with your logic
        setEstimatedPrice(calculatedPrice);
    };

    return (
        <div>
            <Navbar />
            <div className="event-form-container">
                <form className="event-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="event">Event</label>
                        <select 
                            id="event" 
                            name="event" 
                            required 
                            value={formData.event} 
                            onChange={handleChange}
                        >
                            <option value="">Select an Event</option>
                            <option value="birthday">Birthday</option>
                            <option value="anniversary">Anniversary</option>
                            <option value="wedding">Wedding</option>
                            <option value="corporate">Corporate Event</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input 
                            type="text" 
                            id="description" 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <div className="date-range">
                            <input 
                                type="date" 
                                id="date-from" 
                                name="dateFrom"
                                value={formData.dateFrom}
                                onChange={handleChange}
                            />
                            <span>To</span>
                            <input 
                                type="date" 
                                id="date-to" 
                                name="dateTo"
                                value={formData.dateTo}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input 
                            type="text" 
                            id="location" 
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <button className="order-btn" type="submit">Submit</button>
                    </div>
                    {estimatedPrice && (
                        <div className="form-group">
                            <label htmlFor="estimated-price">Estimated Price</label>
                            <input 
                                type="text" 
                                id="estimated-price" 
                                name="estimatedPrice"
                                value={`$${estimatedPrice}`}
                                readOnly
                            />
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EventForm;
