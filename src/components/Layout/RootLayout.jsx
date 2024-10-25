import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./RootLayout.module.scss";
import { useAppContext } from "@/hooks/useAppContext";

const RootLayout = () => {
	const { landingData, handleContainerClick } = useAppContext();

	const { content, css, currentLanguage, step } = landingData || {};
	const { termsV } = css ?? {};
	const { termsAndConditions, topPriceDescription } = content || {};

	return (
		<div
			className={styles.container}
			onClick={() => {
				handleContainerClick?.();
			}}
		>
			<div style={{ height: termsV ? "auto" : "100dvh" }}>
				<Header
					text={topPriceDescription}
					lang={currentLanguage}
					step={step}
				/>
				<div className={styles.children_wrapper}>
					<Outlet />
				</div>
			</div>

			<Footer content={termsAndConditions} />
		</div>
	);
};

export default RootLayout;
