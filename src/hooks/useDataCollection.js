import { useState, useEffect } from "react";
import { useDetectAdBlock } from "adblock-detect-react";

const useDataCollection = (enabled = true, collectionWindow = 1000) => {
	const [visitorInfo, setVisitorInfo] = useState({});
	const [isCollecting, setIsCollecting] = useState(enabled);
	const adBlockDetected = useDetectAdBlock();

	// Canvas fingerprint generator
	const getCanvasFingerprint = () => {
		try {
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");
			canvas.width = 200;
			canvas.height = 50;

			// Add text with different styles
			ctx.textBaseline = "top";
			ctx.font = "14px 'Arial'";
			ctx.textBaseline = "alphabetic";
			ctx.fillStyle = "#f60";
			ctx.fillRect(125, 1, 62, 20);
			ctx.fillStyle = "#069";
			ctx.fillText("Hello, world!", 2, 15);
			ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
			ctx.fillText("Hello, world!", 4, 17);

			return canvas.toDataURL();
		} catch (e) {
			return null;
		}
	};

	// Audio fingerprint generator
	const getAudioFingerprint = () => {
		try {
			const audioContext = new (window.AudioContext ||
				window.webkitAudioContext)();
			const oscillator = audioContext.createOscillator();
			const analyser = audioContext.createAnalyser();
			const gainNode = audioContext.createGain();
			const scriptProcessor = audioContext.createScriptProcessor(
				4096,
				1,
				1
			);

			let audioData = "";

			gainNode.gain.value = 0; // Mute the sound
			oscillator.type = "triangle";
			oscillator.connect(analyser);
			analyser.connect(scriptProcessor);
			scriptProcessor.connect(gainNode);
			gainNode.connect(audioContext.destination);

			scriptProcessor.onaudioprocess = (e) => {
				const inputBuffer = e.inputBuffer;
				const dataArray = new Float32Array(inputBuffer.length);
				inputBuffer.copyFromChannel(dataArray, 0);
				audioData = dataArray.reduce((acc, val) => acc + val, "");
				audioContext.close();
			};

			oscillator.start(0);
			return audioData || null;
		} catch (e) {
			return null;
		}
	};

	// Get installed plugins and mime types
	const getPluginsAndMimeTypes = () => {
		const plugins = Array.from(navigator.plugins || []).map((p) => p.name);
		const mimeTypes = Array.from(navigator.mimeTypes || []).map(
			(mt) => mt.type
		);
		return { plugins, mimeTypes };
	};

	// Feature detection
	const getFeatureSupport = () => ({
		vibrationSupported: "vibrate" in navigator,
		notificationsSupported: "Notification" in window,
		geolocationSupported: "geolocation" in navigator,
		isMotionAllowed: "DeviceMotionEvent" in window,
		isOrientationAllowed: "DeviceOrientationEvent" in window,
	});

	useEffect(() => {
		if (!enabled) {
			setIsCollecting(false);
			setVisitorInfo({});
			return;
		}

		let mouseMovements = [];
		let keyPressCount = 0;
		let scrollCount = 0;
		let focusBlurCount = 0;
		let resizeCount = 0;
		let firstInteractionTime = null;
		const startTime = performance.now();

		const getWebGLInfo = () => {
			try {
				const canvas = document.createElement("canvas");
				const gl =
					canvas.getContext("webgl") ||
					canvas.getContext("experimental-webgl");

				if (gl) {
					const debugInfo = gl.getExtension(
						"WEBGL_debug_renderer_info"
					);
					if (debugInfo) {
						return {
							webglVendor: gl.getParameter(
								debugInfo.UNMASKED_VENDOR_WEBGL
							),
							webglRenderer: gl.getParameter(
								debugInfo.UNMASKED_RENDERER_WEBGL
							),
						};
					}
				}
				return {
					webglVendor: "",
					webglRenderer: "",
				};
			} catch (e) {
				return {
					webglVendor: "",
					webglRenderer: "",
				};
			}
		};

		const getBasicInfo = () => ({
			screenWidth: window.screen.width,
			screenHeight: window.screen.height,
			devicePixelRatio: window.devicePixelRatio,
			colorDepth: window.screen.colorDepth,

			hasLocalStorage: (() => {
				try {
					return !!window.localStorage;
				} catch (e) {
					return false;
				}
			})(),

			hasSessionStorage: (() => {
				try {
					return !!window.sessionStorage;
				} catch (e) {
					return false;
				}
			})(),

			hasIndexdb: !!window.indexedDB,

			cpuCores: navigator.hardwareConcurrency, // * no default values >> || 1,
			memory: navigator.deviceMemory, // * no default values >> || 2,
			platform: navigator.platform,

			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			timezoneOffset: new Date().getTimezoneOffset(),
			navigatorLanguage: navigator.language,
			languages: navigator.languages,

			doNotTrack: navigator.doNotTrack,

			initialViewportWidth: window.innerWidth,
			initialViewportHeight: window.innerHeight,
			currentOrientation: screen.orientation
				? screen.orientation.type
				: "landscape",

			touchPoints: navigator.maxTouchPoints,
			hasTouchScreen: "ontouchstart" in window,

			deviceMemory: navigator.deviceMemory,
			hardwareConcurrency: navigator.hardwareConcurrency,
			pdfViewerEnabled: navigator.pdfViewerEnabled,
			cookiesEnabled: navigator.cookieEnabled,
			isOnline: navigator.onLine,

			userActivation: {
				hasBeenActive: navigator.userActivation.hasBeenActive,
				isActive: navigator.userActivation.isActive,
			},
		});

		const getNetworkInfo = () => {
			const connection =
				navigator.connection ||
				navigator.mozConnection ||
				navigator.webkitConnection;

			if (connection) {
				return {
					effectiveType: connection.effectiveType,
					downlink: Math.round(connection.downlink),
					rtt: connection.rtt,
					saveData: connection.saveData,
				};
			}
			//* not using default values
			// return {
			// 	effectiveType: "4g",
			// 	downlink: 10,
			// 	rtt: 50,
			// 	saveData: false,
			// };
		};

		const getPerformanceMetrics = () => {
			const navigation = performance.getEntriesByType("navigation")[0];
			return navigation
				? {
						timeToFirstByte: Math.round(
							navigation.responseStart - navigation.requestStart
						),
						domLoadTime:
							navigation.domContentLoadedEventEnd -
							navigation.navigationStart,
						pageLoadTime:
							navigation.loadEventEnd -
							navigation.navigationStart,
				  }
				: {
						//* not using default values
						// timeToFirstByte: 50,
						// domLoadTime: 100,
						// pageLoadTime: 150,
				  };
		};

		const firstInteractionHandler = () => {
			if (firstInteractionTime === null) {
				firstInteractionTime = performance.now() - startTime;
			}
		};

		// Event listeners
		const mouseHandler = (e) => {
			mouseMovements.push({
				x: e.clientX,
				y: e.clientY,
				timestamp: performance.now(),
			});
			firstInteractionHandler();
		};

		const keyHandler = () => {
			keyPressCount++;
			firstInteractionHandler();
		};

		const scrollHandler = () => {
			scrollCount++;
			firstInteractionHandler();
		};

		const focusHandler = () => {
			focusBlurCount++;
		};

		const resizeHandler = () => {
			resizeCount++;
		};

		// Set up event listeners
		window.addEventListener("mousemove", mouseHandler);
		window.addEventListener("keypress", keyHandler);
		window.addEventListener("scroll", scrollHandler);
		window.addEventListener("focus", focusHandler);
		window.addEventListener("blur", focusHandler);
		window.addEventListener("resize", resizeHandler);

		// Battery API
		//* no default values
		let batteryInfo = {
			// batteryLevel: 1,
			// batteryCharging: true,
		};

		if ("getBattery" in navigator) {
			navigator.getBattery().then((battery) => {
				batteryInfo = {
					batteryLevel: battery.level,
					batteryCharging: battery.charging,
				};
			});
		}

		// Collection timeout
		const timeoutId = setTimeout(async () => {
			const { plugins, mimeTypes } = getPluginsAndMimeTypes();
			const featureSupport = getFeatureSupport();

			// Collect all information
			const finalInfo = {
				...getBasicInfo(),
				...getWebGLInfo(),
				canvasFingerprint: getCanvasFingerprint(),
				audioFingerprint: getAudioFingerprint(),
				installedPlugins: plugins,
				mimeTypes,
				...batteryInfo,
				...featureSupport,
				adBlockerUsed: adBlockDetected,
				navigatorConnection: getNetworkInfo(),
				networkInformation: getNetworkInfo(), // Both fields are in the dictionary
				...getPerformanceMetrics(),
				mouseMovementPoints: mouseMovements,
				resizeEvents: resizeCount,
				keyPressCount,
				scrollCount,
				focusBlurCount,
				firstInteractionTime: firstInteractionTime || 0,
				totalCollectionTime: performance.now() - startTime,
			};

			setVisitorInfo(finalInfo);
			setIsCollecting(false);

			// Clean up event listeners
			window.removeEventListener("mousemove", mouseHandler);
			window.removeEventListener("keypress", keyHandler);
			window.removeEventListener("scroll", scrollHandler);
			window.removeEventListener("focus", focusHandler);
			window.removeEventListener("blur", focusHandler);
			window.removeEventListener("resize", resizeHandler);
		}, collectionWindow);

		// Cleanup function
		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener("mousemove", mouseHandler);
			window.removeEventListener("keypress", keyHandler);
			window.removeEventListener("scroll", scrollHandler);
			window.removeEventListener("focus", focusHandler);
			window.removeEventListener("blur", focusHandler);
			window.removeEventListener("resize", resizeHandler);
		};
	}, [adBlockDetected, collectionWindow, enabled]);

	return { visitorInfo, isCollecting };
};

export default useDataCollection;
