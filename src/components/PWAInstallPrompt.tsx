import { useEffect, useState } from 'react';
import { Download, Share, Plus, ChevronDown, ChevronUp } from 'lucide-react';

export const PWAInstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Check if device is mobile and iOS
        const checkDevice = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
            const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword));
            const isMobileViewport = window.innerWidth <= 768;
            const isIOSDevice = /iphone|ipad|ipod/.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

            setIsMobile(isMobileDevice || isMobileViewport);
            setIsIOS(isIOSDevice);
            setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);

        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
            window.removeEventListener('resize', checkDevice);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        setDeferredPrompt(null);
    };

    const handleIOSExpand = () => {
        setIsExpanded(!isExpanded);
    };

    // Don't show if already installed as standalone app
    if (isStandalone) return null;

    // Don't show on desktop (non-mobile)
    if (!isMobile) return null;

    // Show different prompts for iOS vs Android
    const showAndroidPrompt = deferredPrompt && !isIOS;
    const showIOSPrompt = isIOS;

    // Don't show if neither prompt type should be shown
    if (!showAndroidPrompt && !showIOSPrompt) return null;

    return (
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border-b border-emerald-100 dark:border-emerald-900">
            <div className="content-container px-4 sm:px-6 py-2">
                {showAndroidPrompt && (
                    <button
                        onClick={handleInstall}
                        className="w-full flex items-center justify-center space-x-2 text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 transition-colors"
                    >
                        <Download size={16} className="shrink-0" />
                        <span className="text-sm font-medium">Install app for quick offline access</span>
                    </button>
                )}

                {showIOSPrompt && (
                    <div>
                        <button
                            onClick={handleIOSExpand}
                            className="w-full flex items-center justify-between text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 transition-colors"
                        >
                            <div className="flex items-center space-x-2">
                                <Download size={16} className="shrink-0" />
                                <span className="text-sm font-medium">Install app for offline access</span>
                            </div>
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        {isExpanded && (
                            <div className="mt-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-emerald-200 dark:border-emerald-800">
                                <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-3">
                                    Steps to install on iPhone:
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                                            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">1</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Tap the <strong>Share</strong> button</span>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                                            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">2</span>
                                        </div>
                                        <div className="">
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Scroll and tap <strong>Add to Home Screen</strong></span>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                                            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">3</span>
                                        </div>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                            Tap <strong>Add</strong> to install the app
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}; 