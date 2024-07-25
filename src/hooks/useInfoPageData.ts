import { useTranslation } from 'react-i18next';

import { I18n } from '../enums/i18n-text';
import { InfoData } from '../types/infoData';

const useInfoPageData = () => {
    const { t } = useTranslation();

    const infoPageData: InfoData[] = [
        {
            title: { __html: t(I18n.ABOUT_WEBSITE) },
            description: {
                __html: t(I18n.ABOUT_WEBSITE_TEXT),
            },
        },
        {
            title: {
                __html: t(I18n.ABOUT_CREATOR),
            },
            description: {
                __html: t(I18n.ABOUT_CREATOR_TEXT),
            },
        },
        {
            title: {
                __html: t(I18n.FUTURE_OF_THE_PROJECT),
            },
            description: {
                __html: t(I18n.FUTURE_OF_THE_PROJECT_TEXT),
            },
        },
        {
            title: {
                __html: t(I18n.LINKS),
            },
            description: {
                __html: t(I18n.LINKS_TEXT),
            },
        },
    ];

    return infoPageData;
};

export default useInfoPageData;
