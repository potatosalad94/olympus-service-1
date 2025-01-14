import { changeLanguage } from "@/api/client";
import { queryKeys } from "@/app-keys-factory";
import useApi from "@/hooks/useApi";
import useVisitorId from "@/hooks/useVisitorId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "primereact/button";
import arFlag from "@images/Ar-flag.png";
import enFlag from "@images/En-flag.png";
import styles from "./LanguageDropdown.module.scss";
import { classNames } from "primereact/utils";

const LanguageDropdown = ({ lang, step, className }) => {
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
		onSuccess: (response, lang) => {
			queryClient.invalidateQueries(queryKeys.displayData(step, lang));
		},
	});

	const toggleLanguage = (e) => {
		e.stopPropagation();
		const newLang = lang === "En" ? "Ar" : "En";
		mutation.mutate(newLang);
	};

	return (
		<Button onClick={toggleLanguage} className={classNames(styles.language_button, className)}>
			<img
				src={lang === "En" ? arFlag : enFlag}
				alt={lang === "En" ? "العربية" : "English"}
			/>
		</Button>
	);
};

export default LanguageDropdown;
