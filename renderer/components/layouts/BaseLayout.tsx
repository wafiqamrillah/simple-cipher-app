import React from 'react';
import Head from 'next/head';

import LoadingIndicator from '../LoadingIndicator';
import Footer from '../Footer';

interface BaseLayoutProps {
    title?: string;
    children: React.ReactNode;
}

interface BaseLayoutContextProps {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

// Context
const BaseLayoutContext = React.createContext<BaseLayoutContextProps | undefined>(undefined);
export const useBaseLayout = () => {
    const context = React.useContext(BaseLayoutContext);

    if (!context) {
        throw new Error('useBaseLayout must be used within BaseLayoutProvider');
    }

    return context;
}

// Render
export default function BaseLayout({ title = null, children }: BaseLayoutProps) {
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        window.ipc.on('message', (event, arg) => {
            console.log(event, arg);
        });

        window.ipc.send('message', 'Hello');
    }, []);
    
    return (
        <React.Fragment>
            <Head>
                <title>{`${title ? `${title} | ` : ''}Simple Cipher Application | Created by: Ahmad Wafiq Amrillah © ${new Date().getFullYear()}`}</title>
            </Head>

            <BaseLayoutContext.Provider value={{ isLoading, setIsLoading }}>
                <div className="relative flex flex-col max-h-screen min-h-screen overflow-hidden font-sans antialiased">
                    {/* Page Content */}
                    <div className="relative flex flex-col flex-auto m-2 overflow-y-auto bg-gray-200 rounded-lg">
                        { children }
                    </div>

                    {/* Footer */}
                    <Footer />

                    {/* Loading Indicator */}
                    <LoadingIndicator show={ isLoading } />
                </div>
            </BaseLayoutContext.Provider>
        </React.Fragment>
    );
}