import { useState, useEffect } from "react";

const useDataCollection = (enabled = true) => {
    const [visitorInfo, setVisitorInfo] = useState(() => {
        // Initialize with actual data immediately if enabled
        if (!enabled) {
            return {};
        }

        return {
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            navigatorLanguage: navigator.language || null,
            platform: navigator.platform || null,
            deviceMemory:
                "deviceMemory" in navigator ? navigator.deviceMemory : null,
        };
    });

    useEffect(() => {
        if (!enabled) {
            setVisitorInfo({});
            return;
        }

        // Update info if enabled state changes
        const basicInfo = {
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            navigatorLanguage: navigator.language || null,
            platform: navigator.platform || null,
            deviceMemory:
                "deviceMemory" in navigator ? navigator.deviceMemory : null,
        };

        setVisitorInfo(basicInfo);
    }, [enabled]);

    return { visitorInfo };
};

export default useDataCollection;
