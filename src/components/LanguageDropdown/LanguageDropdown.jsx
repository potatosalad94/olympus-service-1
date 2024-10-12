import { changeLanguage } from "@/api/client";
import { queryKeys } from "@/app-keys-factory";
import useApi from "@/hooks/useApi";
import useVisitorId from "@/hooks/useVisitorId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dropdown } from "primereact/dropdown";
import { useRef, useState } from "react";
import styles from "./LanguageDropdown.module.scss";
import { errorToast } from "@/utils/toast-messages";
import { useToastContext } from "@/hooks/useToastContext";

const languages = [
	{ name: "English", code: "En" },
	{ name: "العربية", code: "Ar" },
];

const LanguageDropdown = ({ lang }) => {
	const { showToast } = useToastContext();
	const { visitorId } = useVisitorId();
	const queryClient = useQueryClient();

	const toast = useRef(null);

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

		onError: () => showToast(errorToast()),
	});

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
				className={styles.dropdown}
			/>
		</>
	);
};

export default LanguageDropdown;
