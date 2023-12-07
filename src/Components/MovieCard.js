import React from 'react';
import './MovieCard.css';

const MovieCard = ({title, language, price, image, id}) => {
  
  return (
    <div className='movieCard' id={id}>
      <img src={image} alt='' />
      <div className='movieCard__text'>
        <h3>{title}</h3>
        <p id='lang'>{language}</p>
        <p id='price'>Rs. {price} per seat</p>
      </div>
    </div>
  )
}

export default MovieCard;
