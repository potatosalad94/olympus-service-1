import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import styles from "./LanguageDropdown.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "@/hooks/useApi";
import { changeLanguage } from "@/api/client";
import useVisitorId from "@/hooks/useVisitorId";
import { queryKeys } from "@/app-keys-factory";

const languages = [
	{ name: "English", code: "En" },
	{ name: "العربية", code: "Ar" },
];

const LanguageDropdown = ({ lang }) => {
	const { visitorId } = useVisitorId();
	const queryClient = useQueryClient();

	const [selectedLanguage, setSelectedLanguage] = useState(() =>
		languages.find((item) => item.code === lang)
	);

	const changeLanguageApi = useApi(changeLanguage);

	const mutation = useMutation({
		mutationFn: (language) => {
			return changeLanguageApi.request({
				visitorId,
				language,
			});
		},
		onSuccess: (response) =>
			queryClient.setQueryData(queryKeys.newVisit, response.data),
		// onError: () =>  //TODO >> add toast library to show error message
	});

	return (
		<>
			<Dropdown
				value={selectedLanguage}
				onChange={(e) => {
					mutation.mutate(e.value.code);
					setSelectedLanguage(e.value);
				}}
				options={languages}
				optionLabel="name"
				className={styles.dropdown}
			/>
		</>
	);
};

export default LanguageDropdown;
