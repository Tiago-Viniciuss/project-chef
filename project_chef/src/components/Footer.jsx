import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {


    function openFooter() {
        const footer = document.getElementById('footer')
        const openFooterButton = document.getElementById('openFooter')

        footer.classList.toggle('expand')
        openFooterButton.style.display = 'none'
    }

    function closeFooter() {
        const footer = document.getElementById('footer')
        const openFooterButton = document.getElementById('openFooter')

        footer.classList.toggle('expand')
        openFooterButton.style.display = 'flex'
    }

  return (
    <div id='containerFooter'>
        <button  id='openFooter' className='material-symbols-outlined' onClick={openFooter}>expand_less</button>
        <footer id='footer'>
            <button id='closeFooter'  className='material-symbols-outlined' onClick={closeFooter}>expand_more</button>
            <nav id='navFooter'>
            <div className='footerButton'>
                <Link className='material-symbols-outlined' name='home' id='homeFooter' to={'/'}>home</Link>
                <label htmlFor="home">Início</label>
            </div>
            <div className='footerButton'>
                <Link className='material-symbols-outlined' name='favorite' id='favorite'>favorite</Link>
                <label htmlFor="favorite">Favoritos</label>
            </div>
            <div className='footerButton'>
                <Link className='material-symbols-outlined' name='sms' id='sms'>sms</Link>
                <label htmlFor="sms">Conversas</label>
            </div>
            <div className='footerButton'>
                <Link className='material-symbols-outlined' name='settings' id='settings'>settings</Link>
                <label htmlFor="settings">Configurações</label>
            </div>    
            </nav>
        </footer>
    </div>
  )
}

export default Footer