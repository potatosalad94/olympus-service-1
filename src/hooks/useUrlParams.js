import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useUrlParams(paramConfigs) {
	const navigate = useNavigate();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);

	// Validate a single parameter based on its configuration
	const validateParam = (value, config) => {
		if (!config.validator) return value;
		return config.validator(value) ? value : config.defaultValue;
	};

	// Get initial values for all parameters
	const getInitialValues = () => {
		return Object.entries(paramConfigs).reduce((acc, [key, config]) => {
			const value = searchParams.get(key) || config.defaultValue;
			acc[key] = validateParam(value, config);
			return acc;
		}, {});
	};

	// Handle changing multiple parameters at once
	const setParams = (updates) => {
		const newSearchParams = new URLSearchParams(searchParams);

		Object.entries(updates).forEach(([key, value]) => {
			if (paramConfigs[key]) {
				const validValue = validateParam(value, paramConfigs[key]);
				if (validValue) {
					newSearchParams.set(key, validValue);
				} else {
					newSearchParams.delete(key);
				}
			}
		});

		navigate(`${location.pathname}?${newSearchParams.toString()}`, {
			replace: true,
		});
	};

	// Validate all parameters on location change
	useEffect(() => {
		let needsUpdate = false;
		const updates = {};

		Object.entries(paramConfigs).forEach(([key, config]) => {
			const currentValue = searchParams.get(key);
			const validValue = validateParam(currentValue, config);

			if (currentValue !== validValue) {
				needsUpdate = true;
				updates[key] = validValue;
			}
		});

		if (needsUpdate) {
			setParams(updates);
		}
	}, [location.search]);

	return {
		params: getInitialValues(),
		setParams,
	};
}
