import { changeLanguage } from "@/api/client";
import { queryKeys } from "@/app-keys-factory";
import useApi from "@/hooks/useApi";
import useVisitorId from "@/hooks/useVisitorId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import styles from "./LanguageDropdown.module.scss";
import { errorToast } from "@/utils/toast-messages";
import { useToastContext } from "@/hooks/useToastContext";

const languages = [
	{ name: "English", code: "En" },
	{ name: "العربية", code: "Ar" },
];

const LanguageDropdown = ({ lang, step }) => {
	const { showToast } = useToastContext();
	const { visitorId } = useVisitorId();

	const queryClient = useQueryClient();

	const [selectedLanguage, setSelectedLanguage] = useState({});

	useEffect(() => {
		if (lang) setSelectedLanguage(languages.find((item) => item.code === lang));
	}, [lang]);

	const changeLanguageApi = useApi(changeLanguage);

	const mutation = useMutation({
		mutationFn: (language) => {
			return changeLanguageApi.request({
				visitorId,
				language,
			});
		},

		onSuccess: (response) =>
			queryClient.setQueryData(queryKeys.displayData(step), response.data),

		onError: (error) => showToast(errorToast(error)),
	});

	const selectedCountryTemplate = (option, props) => {
		if (option) {
			return (
				<div className={styles.language_item}>
					<img src={`/src/images/${option.code}-flag.png`} />
					<div>{option.name}</div>
				</div>
			);
		}

		return <span>{props.placeholder}</span>;
	};

	const countryOptionTemplate = (option) => {
		return (
			<div className={styles.language_item}>
				<img src={`/src/images/${option.code}-flag.png`} />
				<div>{option.name}</div>
			</div>
		);
	};

	return (
		<>
			<Dropdown
				value={selectedLanguage}
				onChange={(e) => {
					mutation.mutate(e.value.code);
					setSelectedLanguage(e.value);
				}}
				onClick={(e) => e.stopPropagation()}
				options={languages}
				optionLabel="name"
				valueTemplate={selectedCountryTemplate}
				itemTemplate={countryOptionTemplate}
			/>
		</>
	);
};

export default LanguageDropdown;
