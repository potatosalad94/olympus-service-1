import { changeLanguage } from "@/api/client";
import { queryKeys } from "@/app-keys-factory";
import useApi from "@/hooks/useApi";
import useVisitorId from "@/hooks/useVisitorId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "primereact/button";
import styles from "./LanguageDropdown.module.scss";

const LanguageDropdown = ({ lang, step, availableLanguages }) => {
	const languagesToDisplay = availableLanguages.filter(
		(item) => item.code !== lang.code
	);

	const { visitorId } = useVisitorId();
	const queryClient = useQueryClient();
	const changeLanguageApi = useApi(changeLanguage);

	const mutation = useMutation({
		mutationFn: (language) => {
			return changeLanguageApi.request({
				visitorId,
				language,
			});
		},
		onSuccess: (response, langCode) => {
			queryClient.invalidateQueries(
				queryKeys.displayData(step, langCode)
			);
			document.body.setAttribute("lang", langCode);
		},
	});

	const handleSelect = (langCode) => {
		mutation.mutate(langCode);
	};

	return (
		<div className={styles.container}>
			{languagesToDisplay.map((language) => {
				return (
					<Button
						key={language.code}
						onClick={() => handleSelect(language.code)}
						className={styles.language_button}
					>
						<img src={language.icon} alt={language.language} />
					</Button>
				);
			})}
		</div>
	);
};

export default LanguageDropdown;
