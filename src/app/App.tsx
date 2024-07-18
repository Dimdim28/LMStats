import { useEffect, useRef, useState } from 'react';

import { GuildStats, UploadFile, UserStats } from './containers/';
import { Header } from './containers/header/header';
import { ExcelUser, Step } from './constants';

import './styles/index.scss';

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
                hidden={!data || !activeUser}
                setCurrentStep={setCurrentStep}
                currentStep={currentStep}
            />
            <main
                ref={scrollableContainerRef}
                className={!data || !activeUser ? 'hidden' : undefined}
            >
                {currentStep === 'upload' && <UploadFile setData={setData} />}
                {currentStep === 'user' && (
                    <UserStats data={data} user={activeUser} />
                )}
                {currentStep === 'guild' && (
                    <GuildStats data={data} onClickUser={handleUserClick} />
                )}
            </main>
        </>
    );
};

export default App;
