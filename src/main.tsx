import ReactDOM from 'react-dom/client';

import LanguageProvider from './context/languageContext.tsx';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <LanguageProvider>
        <App />
    </LanguageProvider>,
);
