import { useEffect, useRef, useState } from 'react';
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';

import { GuildStats, UploadFile, UserStats } from './containers/';
import { Header } from './containers/header/header';
import Info from './containers/info/info';
import { Language } from './enums/language';
import { LocalStorageKey } from './enums/storage';
import { initLanguage } from './helpers/initLanguage';
import { InfoData } from './types/infoData';
import { ExcelUser, Step } from './constants';
import TRANSLATIONS from './languages';

import './styles/index.scss';

void i18next.use(initReactI18next).init({
    lng: localStorage.getItem(LocalStorageKey.LANG) || Language.RU,
    debug: true,
    resources: TRANSLATIONS,
    fallbackLng: 'en',
});

const infoPageData: InfoData[] = [
    {
        title: { __html: 'about website' },
        description: {
            __html: `
            Upload your excel file on <span>LMStats</span> and you can see your and your guild friends scores. 
            You may copy list of users failed hunt, purch or both of them with or without completion progress percents.
        `,
        },
    },
    {
        title: {
            __html: 'about creator',
        },
        description: {
            __html: `
            <span>ZloyHomyak13</span> - my nickname in Lords Mobile, 
            you can contact me if you have questions, ideas how to improve website or you faced bugs here, 
            I will fix them as soon as possible.
        `,
        },
    },
    {
        title: {
            __html: 'future of the project',
        },
        description: {
            __html: `
            I am going to create server and add  accounts system. 
            Your guild leader or officers will create guild and accept your join request 
            and <span>only them</span> will have to upload file here, all of guild members will see their stats <span>without uploading file</span>. 
            If this project will be popular, I will think about additional features like analyzing data for few months with comfortable charts.
        `,
        },
    },
    {
        title: {
            __html: 'links',
        },
        description: {
            __html: `
            <p>Source code:</p>
            <link href='https://github.com/Dimdim28/LMStats'>https://github.com/Dimdim28/LMStats</link>
            <br/>
            <br/>
            <p>My profile:</p>
            <link href='https://github.com/Dimdim28'>https://github.com/Dimdim28</link>
        `,
        },
    },
];

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
                setCurrentStep={setCurrentStep}
                data={data}
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
                    {currentStep === 'info' && <Info data={infoPageData} />}
                </div>
            </main>
        </>
    );
};

export default App;
