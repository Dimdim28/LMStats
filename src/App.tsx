import { useEffect, useRef, useState } from 'react';
import { initReactI18next } from 'react-i18next';
import { use } from 'i18next';

import GuildStats from './containers/guildStats/guildStats';
import { Header } from './containers/header/header';
import Info from './containers/info/info';
import UploadFile from './containers/uploadFile/uploadFile';
import UserStats from './containers/userStats/userStats';
import { Language } from './enums/language';
import { LocalStorageKey } from './enums/storage';
import { initLanguage } from './helpers/initLanguage';
import useInfoPageData from './hooks/useInfoPageData';
// const GuildStats = lazy(() => import('./containers/guildStats/guildStats'));
// const UploadFile = lazy(() => import('./containers/uploadFile/uploadFile'));
// const UserStats = lazy(() => import('./containers/userStats/userStats'));
// const Info = lazy(() => import('./containers/info/info'));
// import { Preloader } from './components';
import { ColumnNames, ExcelUser, Step } from './constants';
import TRANSLATIONS from './languages';

import './styles/index.scss';

void use(initReactI18next).init({
    lng: localStorage.getItem(LocalStorageKey.LANG) || Language.EN,
    debug: true,
    resources: TRANSLATIONS,
    fallbackLng: 'en',
});

const App = () => {
    const [currentStep, setCurrentStep] = useState<Step>('upload');
    const [data, setData] = useState<ExcelUser[] | null>(null);
    const [activeUser, setActiveUser] = useState<string | null>(null);
    const [valuesBiggerThan100, setValuesBiggerThan100] = useState(false);
    const [columnNames, setColumnNames] = useState<
        Partial<Record<ColumnNames, string>>
    >({
        'UserID': '',
        'Name': '',
        'TotalActions': '',
        'HuntActions': '',
        'PurchActions': '',
        'L1Hunt': '',
        'L2Hunt': '',
        'L3Hunt': '',
        'L4Hunt': '',
        'L5Hunt': '',
        'L1Purch': '',
        'L2Purch': '',
        'L3Purch': '',
        'L4Purch': '',
        'L5Purch': '',
        'HuntPoints': '',
        'PurchsPoints': '',
        'HuntCompletion': '',
        'PurchCompletion': '',
    });

    const scrollableContainerRef = useRef<HTMLDivElement>(null);

    const infoPageData = useInfoPageData();

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
                    {/* <Suspense fallback={<Preloader />}> */}
                    {currentStep === 'upload' && (
                        <UploadFile
                            setData={setData}
                            setColumnNames={setColumnNames}
                            columnNames={columnNames}
                            setValuesBiggerThan100={setValuesBiggerThan100}
                        />
                    )}
                    {currentStep === 'user' && (
                        <UserStats
                            data={data}
                            user={activeUser}
                            columnNames={columnNames}
                            valuesBiggerThan100={valuesBiggerThan100}
                        />
                    )}
                    {currentStep === 'guild' && (
                        <GuildStats
                            data={data}
                            onClickUser={handleUserClick}
                            columnNames={columnNames}
                            valuesBiggerThan100={valuesBiggerThan100}
                        />
                    )}
                    {currentStep === 'info' && <Info data={infoPageData} />}
                    {/* </Suspense> */}
                </div>
            </main>
        </>
    );
};

export default App;
