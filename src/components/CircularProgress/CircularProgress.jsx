import { useState, useEffect } from "react";

const CircularProgress = ({ color = "#06b6d4" }) => {
	const [progress, setProgress] = useState(0);
	const [showArrow, setShowArrow] = useState(false);
	const [arrowOffset, setArrowOffset] = useState(0);

	const size = 150;
	const strokeWidth = 10;
	const center = size / 2;
	const radius = center - strokeWidth;
	const circumference = 2 * Math.PI * radius;
	const arrowSize = 70;

	useEffect(() => {
		// Progress animation
		if (progress < 100) {
			const timer = setTimeout(() => {
				setProgress((prev) => Math.min(prev + 1, 100));
			}, 10); // Approximately 3 seconds total
			return () => clearTimeout(timer);
		} else if (progress === 100 && !showArrow) {
			setTimeout(() => setShowArrow(true), 500);
		}
	}, [progress]);

	// Arrow bounce animation with reduced offset
	useEffect(() => {
		if (showArrow) {
			const bounceAnimation = () => {
				setArrowOffset((prev) => {
					const newOffset = Math.sin(Date.now() / 1000) * 10; // Reduced from 10 to 5
					return newOffset;
				});
			};

			const animationFrame = setInterval(bounceAnimation, 16);
			return () => clearInterval(animationFrame);
		}
	}, [showArrow]);

	const progressStyle = {
		strokeDasharray: circumference,
		strokeDashoffset: circumference - (progress / 100) * circumference,
		transition: "stroke-dashoffset 0.1s ease-out",
	};

	const containerStyle = {
		width: size,
		height: size,
		position: "relative",
		display: "inline-block",
	};

	const textStyle = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		fontSize: "2rem",
		fontWeight: "bold",
	};

	return (
		<div style={containerStyle}>
			<svg width={size} height={size}>
				{/* Background circle */}
				<circle
					cx={center}
					cy={center}
					r={radius}
					fill="none"
					stroke="#e6e6e6"
					strokeWidth={strokeWidth}
				/>
				{/* Progress circle */}
				<circle
					cx={center}
					cy={center}
					r={radius}
					fill="none"
					stroke={color}
					strokeWidth={strokeWidth}
					style={progressStyle}
					transform={`rotate(-90 ${center} ${center})`}
				/>
			</svg>

			<div style={textStyle}>
				{!showArrow ? (
					`${progress}%`
				) : (
					<svg
						width={arrowSize}
						height={arrowSize}
						viewBox="0 0 24 24"
						style={{
							transform: `translateY(${arrowOffset}px)`,
							transition: "transform 0.1s ease-out",
						}}
					>
						<path
							d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
							fill={color}
							transform="rotate(90 12 12)"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							stroke={color}
						/>
					</svg>
				)}
			</div>
		</div>
	);
};

export default CircularProgress;
