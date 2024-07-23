import { useEffect, useRef, useState } from 'react';
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';

import { GuildStats, UploadFile, UserStats } from './containers/';
import { Header } from './containers/header/header';
import { Language } from './enums/language';
import { LocalStorageKey } from './enums/storage';
import { initLanguage } from './helpers/initLanguage';
import { ExcelUser, Step } from './constants';
import TRANSLATIONS from './languages';

import './styles/index.scss';

void i18next.use(initReactI18next).init({
    lng: localStorage.getItem(LocalStorageKey.LANG) || Language.RU,
    debug: true,
    resources: TRANSLATIONS,
    fallbackLng: 'en',
});

const App = () => {
    const [currentStep, setCurrentStep] = useState<Step>('upload');
    const [data, setData] = useState<ExcelUser[] | null>(null);
    const [activeUser, setActiveUser] = useState<string | null>(null);

    const scrollableContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!data) {
            setCurrentStep('upload');
        } else {
            setCurrentStep('guild');
        }
    }, [data]);
    const appHeight = () => {
        const doc = document.documentElement;
        doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    window.onload = function () {
        appHeight();
    };

    useEffect(() => {
        window.addEventListener('resize', appHeight);
        window.addEventListener('load', appHeight);
        initLanguage();
        appHeight();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        window.requestAnimationFrame(() =>
            scrollableContainerRef?.current?.scrollTo({
                top: 0,
            }),
        );

        scrollableContainerRef?.current?.scrollTo({ top: 0 });
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
        });
    }, [currentStep]);

    const handleUserClick = (userName: string) => {
        setActiveUser(userName);
        setCurrentStep('user');
    };

    return (
        <>
            <Header
                hidden={false}
                setCurrentStep={setCurrentStep}
                currentStep={currentStep}
            />
            <main
                ref={scrollableContainerRef}
                className={!data || !activeUser ? 'hidden' : undefined}
            >
                <div className="container ">
                    {currentStep === 'upload' && (
                        <UploadFile setData={setData} />
                    )}
                    {currentStep === 'user' && (
                        <UserStats data={data} user={activeUser} />
                    )}
                    {currentStep === 'guild' && (
                        <GuildStats data={data} onClickUser={handleUserClick} />
                    )}
                </div>
            </main>
        </>
    );
};

export default App;
