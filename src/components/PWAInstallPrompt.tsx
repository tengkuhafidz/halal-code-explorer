import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

export const PWAInstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if device is mobile
        const checkMobile = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
            const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword));
            const isMobileViewport = window.innerWidth <= 768;
            setIsMobile(isMobileDevice || isMobileViewport);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }

        setDeferredPrompt(null);
    };

    if (!deferredPrompt || !isMobile) return null;

    return (
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border-b border-emerald-100 dark:border-emerald-900">
            <div className="content-container px-4 sm:px-6 py-2">
                <button
                    onClick={handleInstall}
                    className="w-full flex items-center justify-center space-x-2 text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 transition-colors"
                >
                    <Download size={16} className="shrink-0" />
                    <span className="text-sm font-medium">Install app for quick offline access</span>
                </button>
            </div>
        </div>
    );
}; 