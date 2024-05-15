import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../style/ChangeLanguage.css'

const ChangeLanguage = () => {
    const { i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    useEffect(() => {
        if (i18n) {
            setCurrentLanguage(i18n.language);
        }
    }, [i18n]);

    const handleChangeLanguage = (value) => {
        if (i18n) {
            i18n.changeLanguage(value);
            setCurrentLanguage(value);
        }
    }

    return (
        <div className='languageSelector'>
            <select onChange={(e) => handleChangeLanguage(e.target.value)} id="languageSelect" value={currentLanguage} className='form-control'>
                <option value="pt">PT</option>
                <option value="en">EN</option>
            </select>
        </div>
    );
};

export default ChangeLanguage;
