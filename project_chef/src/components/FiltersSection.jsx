import React from 'react'
import '../style/FiltersSection.css'

const FiltersSection  = () => {
  return (
    <div>
        <section id='filterSection'>
            <button className='btn'>Restaurantes</button>
            <button className='btn'>Pastelarias</button>
            <button className='btn'>Padarias</button>
            <button className='btn'>Bares e Pubs</button>
            <button className='btn'>Organização de Eventos</button>
            <button className='btn'>Hotel ou Hostel</button>
            <button className='btn'>Restaurante Delivery</button>
            <button className='btn'>Refeição em Casa</button>
            <button className='btn'>Cozinheiro Viajante</button>
            <button className='btn'>Outros</button>
        </section>
    </div>
  )
}

export default FiltersSection 