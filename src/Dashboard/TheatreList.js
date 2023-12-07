import React, { useEffect, useState } from 'react';
import './TheatreList.css';
import Sidebar from './Sidebar';

const TheatreList = () => {
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [selectedScreens, setSelectedScreens] = useState(null)
    const [selectedTheatre, setSelectedTheatre] = useState(null)

    useEffect(() => {
        const storedMovie = localStorage.getItem('selectedMovie')
        const storedScreen = localStorage.getItem('selectedScreen')
        const storedTheatre = localStorage.getItem('selectedTheatre')
        console.log(selectedTheatre)
        if(storedMovie){
            setSelectedMovie(JSON.parse(storedMovie))
        }
        if(storedScreen){
            setSelectedScreens(JSON.parse(storedScreen))
        }
        if(storedTheatre){
            setSelectedTheatre(JSON.parse(storedTheatre))
        }
    }, [])

    const handleScreenSelect = (theatre, screen) => {
        if(screen?.id === selectedScreens?.id){
          setSelectedScreens(null)
          localStorage.removeItem('selectedScreen')
          return
        } 
        localStorage.setItem("selectedScreen", JSON.stringify(screen))
        localStorage.setItem('selectedTheatre', JSON.stringify(theatre))
        setSelectedScreens(screen)
        setSelectedTheatre(theatre)
      }


  return (
    <div className='theatres'>
        <div className='theatres__sidebar'>
            <Sidebar />
        </div>
        <div className='theatres__page'>
        <h2>{selectedMovie?.title}</h2>
      {selectedMovie && (selectedMovie.theatres.map((theatre) => {
        return (
            <div key={theatre.id} className='theatres__details'>
                <div>
                   <h3>{theatre.name}</h3>
                </div>
                <div className='theatres__details--btns'> 
                {selectedMovie && 
                    theatre.screens.map((screen) => {
                        return (
                            <button 
                                className={`btns ${selectedScreens && selectedScreens.id === screen.id ? "active" : ""}`}
                                key={screen.id} 
                                onClick={() => handleScreenSelect(theatre, screen)}>
                                {screen.time}
                            </button>
                        )
                    })
                }
                </div>
            </div>
        )
      }))}
      </div>
    </div>
  )
}

export default TheatreList;
