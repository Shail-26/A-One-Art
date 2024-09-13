import React, { useState } from 'react';
import Navbar from './Navbar';
import '../assets/styles/OurWork.css';
import babyshower from '../assets/images/babyshower.jpg';
import bday from '../assets/images/bday.jpg';
import festival from '../assets/images/festival.jpg';
import wedding from '../assets/images/wedding.jpg';
import others from '../assets/images/others.jpg';

// Import additional images for each category
import bday1 from '../assets/images/bday.jpg';
import bday2 from '../assets/images/bday.jpg';
import festival1 from '../assets/images/festival.jpg';
import festival2 from '../assets/images/festival.jpg';
import wedding1 from '../assets/images/wedding.jpg';
import wedding2 from '../assets/images/wedding.jpg';

const OurWork = () => {
  // Define state for selected category
  const [selectedCategory, setSelectedCategory] = useState('none');

  // Image categories with their respective images
  const categories = {
    Birthday: [bday, bday1, bday2, bday, bday, festival, wedding, babyshower, wedding],
    Festival: [festival, festival1, festival2],
    Wedding: [wedding, wedding1, wedding2],
    'Baby Shower': [babyshower],
    Others: [others],
  };

  // Render the selected category images or the main categories
  const renderWorkItems = () => {
    if (selectedCategory === 'none') {
      // Main categories view
      return (
        <>
          <div className="work-item" onClick={() => setSelectedCategory('Festival')}>
            <img src={festival} alt="Festival" />
            <p className="work-text">Festivals</p>
          </div>
          <div className="work-item" onClick={() => setSelectedCategory('Baby Shower')}>
            <img src={babyshower} alt="Baby Shower" />
            <p className="work-text">Baby Shower</p>
          </div>
          <div className="work-item" onClick={() => setSelectedCategory('Birthday')}>
            <img src={bday} alt="Birthday Celebration" />
            <p className="work-text">Birthday Celebration</p>
          </div>
          <div className="work-item" onClick={() => setSelectedCategory('Wedding')}>
            <img src={wedding} alt="Wedding Ceremony" />
            <p className="work-text">Wedding Ceremony</p>
          </div>
          <div className="work-item" onClick={() => setSelectedCategory('Others')}>
            <img src={others} alt="Others" />
            <p className="work-text">Others</p>
          </div>
        </>
      );
    } else {
      // Show images of the selected category in a grid (Google Images-like layout)
      return categories[selectedCategory].map((img, index) => (
        <div className="category-item" key={index}>
          <img src={img} alt={selectedCategory} />
        </div>
      ));
    }
  };

  return (
    <div className="ourwork">
      <Navbar />
      <div className={`work-container ${selectedCategory !== 'none' ? 'category-view' : ''}`}>
        {/* Render Back button if a category is selected */}
        {selectedCategory !== 'none' && (
          <button className="back-button" onClick={() => setSelectedCategory('none')}>
            Back to Categories
          </button>
        )}
        {renderWorkItems()}
      </div>
    </div>
  );
};

export default OurWork;
