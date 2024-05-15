import { useTranslation } from "react-i18next"

const CandidateOptionsBar = () => {

    const {t} = useTranslation()

    function changePage1() {


        const button5 = document.getElementById('btn5')
        const button4 = document.getElementById('btn4')
        const button3 = document.getElementById('btn3')
        const button2 = document.getElementById('btn2')
        const button1 = document.getElementById('btn1')
        const editProfile = document.getElementById('editCandidateProfile')
        const candidateInfo = document.getElementById('candidateInfo')

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
        candidateInfo.style.display = 'block'
        editProfile.style.display = 'none'
    }

    function changePage2() {
        const button5 = document.getElementById('btn5')
        const button4 = document.getElementById('btn4')
        const button3 = document.getElementById('btn3')
        const button2 = document.getElementById('btn2')
        const button1 = document.getElementById('btn1')
        const editProfile = document.getElementById('editCandidateProfile')
        const candidateInfo = document.getElementById('candidateInfo')

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
        candidateInfo.style.display = 'none'
        editProfile.style.display = 'flex'
    }

    function changePage3() {
        const button5 = document.getElementById('btn5')
        const button4 = document.getElementById('btn4')
        const button3 = document.getElementById('btn3')
        const button2 = document.getElementById('btn2')
        const button1 = document.getElementById('btn1')
        const editProfile = document.getElementById('editCandidateProfile')
        const candidateInfo = document.getElementById('candidateInfo')

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
    }

    function changePage4() {
        const button5 = document.getElementById('btn5')
        const button4 = document.getElementById('btn4')
        const button3 = document.getElementById('btn3')
        const button2 = document.getElementById('btn2')
        const button1 = document.getElementById('btn1')
        const editProfile = document.getElementById('editCandidateProfile')
        const candidateInfo = document.getElementById('candidateInfo')

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
        
    }

    function changePage5() {
        const button5 = document.getElementById('btn5')
        const button4 = document.getElementById('btn4')
        const button3 = document.getElementById('btn3')
        const button2 = document.getElementById('btn2')
        const button1 = document.getElementById('btn1')
        const editProfile = document.getElementById('editCandidateProfile')
        const candidateInfo = document.getElementById('candidateInfo')

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
        <button id='btn1' className='btn' onClick={changePage1}>{t("candidateButtons.button1")}</button>
        <button id='btn2' className='btn' onClick={changePage2}>{t("candidateButtons.button2")}</button>
        <button id='btn3' className='btn' onClick={changePage3}>{t("candidateButtons.button3")}</button>
        <button id='btn4' className='btn' onClick={changePage4}>{t("candidateButtons.button3")}</button>
        <button id='btn5' className='btn' onClick={changePage5}>{t("candidateButtons.button3")}</button>
    </div>
  )
}

export default CandidateOptionsBar