import {Trans, useTranslation} from 'react-i18next'
import '../style/OptionsBar.css'


const CompanyOptionsBar = () => {
    const {t} = useTranslation()

    function changePage1() {
        const button5 = document.getElementById('btn5')
        const button4 = document.getElementById('btn4')
        const button3 = document.getElementById('btn3')
        const button2 = document.getElementById('btn2')
        const button1 = document.getElementById('btn1')
        const companyProfileInfo = document.getElementById('companyProfileInfo')
        const createJobs = document.getElementById('createJobs')
        const postedJobs = document.getElementById('myPostedJobs')
        const companyChatBox = document.getElementById('CompanyChatBox')

        button1.style.backgroundColor = 'white'
        button2.style.backgroundColor = 'black'
        button3.style.backgroundColor = 'black'
        button4.style.backgroundColor = 'black'
        button5.style.backgroundColor = 'black'
        button1.style.color = 'black'
        button2.style.color = 'white'
        button3.style.color = 'white'
        button4.style.color = 'white'
        button5.style.color = 'white'

        companyProfileInfo.style.display = 'flex'
        postedJobs.style.display = 'none'
        createJobs.style.display = 'none'
        companyChatBox.style.display = 'none'
    }

    function changePage2() {
        const button5 = document.getElementById('btn5')
        const button4 = document.getElementById('btn4')
        const button3 = document.getElementById('btn3')
        const button2 = document.getElementById('btn2')
        const button1 = document.getElementById('btn1')
        const companyProfileInfo = document.getElementById('companyProfileInfo')
        const createJobs = document.getElementById('createJobs')
        const postedJobs = document.getElementById('myPostedJobs')
        const companyChatBox = document.getElementById('CompanyChatBox')
        

        button1.style.backgroundColor = 'black'
        button2.style.backgroundColor = 'white'
        button3.style.backgroundColor = 'black'
        button4.style.backgroundColor = 'black'
        button5.style.backgroundColor = 'black'
        button1.style.color = 'white'
        button2.style.color = 'black'
        button3.style.color = 'white'
        button4.style.color = 'white'
        button5.style.color = 'white'

        companyProfileInfo.style.display = 'none'
        postedJobs.style.display = 'none'
        createJobs.style.display = 'block'
        companyChatBox.style.display = 'none'
    }

    function changePage3() {
        const button5 = document.getElementById('btn5')
        const button4 = document.getElementById('btn4')
        const button3 = document.getElementById('btn3')
        const button2 = document.getElementById('btn2')
        const button1 = document.getElementById('btn1')
        const companyProfileInfo = document.getElementById('companyProfileInfo')
        const createJobs = document.getElementById('createJobs')
        const postedJobs = document.getElementById('myPostedJobs')
        const companyChatBox = document.getElementById('CompanyChatBox')


        button1.style.backgroundColor = 'black'
        button2.style.backgroundColor = 'black'
        button3.style.backgroundColor = 'white'
        button4.style.backgroundColor = 'black'
        button5.style.backgroundColor = 'black'
        button1.style.color = 'white'
        button2.style.color = 'white'
        button3.style.color = 'black'
        button4.style.color = 'white'
        button5.style.color = 'white'
        companyProfileInfo.style.display = 'none'
        postedJobs.style.display = 'flex'
        createJobs.style.display = 'none'
        companyChatBox.style.display = 'none'
    }

    function changePage4() {
        const button5 = document.getElementById('btn5')
        const button4 = document.getElementById('btn4')
        const button3 = document.getElementById('btn3')
        const button2 = document.getElementById('btn2')
        const button1 = document.getElementById('btn1')
        const companyProfileInfo = document.getElementById('companyProfileInfo')
        const createJobs = document.getElementById('createJobs')
        const postedJobs = document.getElementById('myPostedJobs')
        const companyChatBox = document.getElementById('CompanyChatBox')

        button1.style.backgroundColor = 'black'
        button2.style.backgroundColor = 'black'
        button3.style.backgroundColor = 'black'
        button4.style.backgroundColor = 'white'
        button5.style.backgroundColor = 'black'
        button1.style.color = 'white'
        button2.style.color = 'white'
        button3.style.color = 'white'
        button4.style.color = 'black'
        button5.style.color = 'white'
        companyProfileInfo.style.display = 'none'
        postedJobs.style.display = 'none'
        createJobs.style.display = 'none'
        companyChatBox.style.display = 'flex'
        
    }

    function changePage5() {
        const button5 = document.getElementById('btn5')
        const button4 = document.getElementById('btn4')
        const button3 = document.getElementById('btn3')
        const button2 = document.getElementById('btn2')
        const button1 = document.getElementById('btn1')
        const companyProfileInfo = document.getElementById('companyProfileInfo')
        const createJobs = document.getElementById('createJobs')
        const postedJobs = document.getElementById('myPostedJobs')
        const companyChatBox = document.getElementById('CompanyChatBox')

        button1.style.backgroundColor = 'black'
        button2.style.backgroundColor = 'black'
        button3.style.backgroundColor = 'black'
        button4.style.backgroundColor = 'black'
        button5.style.backgroundColor = 'white'
        button1.style.color = 'white'
        button2.style.color = 'white'
        button3.style.color = 'white'
        button4.style.color = 'white'
        button5.style.color = 'black'
        
    }
    


  return (
    <div id='candidateOptionsBar' className="optionsBar">
        <button id='btn1' className='btn' onClick={changePage1}> {t("companyButtons.button1")} </button>
        <button id='btn2' className='btn' onClick={changePage2}>{t("companyButtons.button2")}</button>
        <button id='btn3' className='btn' onClick={changePage3}>{t("companyButtons.button3")}</button>
        <button id='btn4' className='btn' onClick={changePage4}>{t("companyButtons.button4")}</button>
        <button id='btn5' className='btn' onClick={changePage5}>{t("companyButtons.button5")}</button>
    </div>
  )
}

export default CompanyOptionsBar