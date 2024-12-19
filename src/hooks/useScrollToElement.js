import { useRef, useLayoutEffect } from "react";

export const useScrollToElement = (shouldScroll = true) => {
	const elementRef = useRef(null);

	const scrollToElement = () => {
		const { current } = elementRef;
		if (current !== null) {
			current.scrollIntoView({ behavior: "instant", block: "start", inline: "nearest" });
		}
	};

	useLayoutEffect(() => {
		if (shouldScroll) {
			scrollToElement();
		}
	}, [shouldScroll]);

	return elementRef;
};
