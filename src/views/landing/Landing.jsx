import { queryKeys } from "@/app-keys-factory";
import Input from "@/components/Input/Input";
import useConnectionInfo from "@/hooks/useConnectionInfo";
import useServiceInfo from "@/hooks/useServiceInfo";
// import serviceImg from "@/images/service_1.png";
import { newVisit } from "@api/client";
import Layout from "@components/Layout/Layout";
import useApi from "@hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import styles from "./Landing.module.scss";
import useVisitorId from "@/hooks/useVisitorId";
import { useEffect } from "react";
import useNewVisit from "@/hooks/useNewVisit";

const serviceName = "Service_1";

const Landing = () => {
	// // * ====== SERVICE INFO CALL ======
	// const { data: serviceInfoData, isFetching: isFetchingServiceInfo } =
	// 	useServiceInfo(serviceName);

	// const {
	// 	websiteChargingDescription,
	// 	websiteServiceDescription,
	// 	websiteTermsAndConditions,
	// } = serviceInfoData || {};

	// * ====== NEW VIST CALL ======

	const { data: newVisitData, isFetching: isFetchingNewVisit } = useNewVisit(
		serviceName,
		true,
		16 // 3rd parameter as testResponse
	);

	const { css, content, msisdn, heRequired } = newVisitData || {};

	//! doublons:
	// acknowledgment
	// bottomPriceDescription
	// exitButton
	// image
	// otpConfirmTimer
	// phoneEntryBox
	// serviceDescription
	// termsAndConditions
	// topPriceDescription
	// userInstructions

	const { clickableZone, termsV } = css ?? {};

	const {
		acknowledgment,
		bottomPriceDescription,
		cta,
		exitButton,
		image,
		imageSteps,
		newOtpRequest,
		otpConfirmTimer,
		phoneEntryBox,
		popupCta,
		popupInstructions,
		serviceDescription,
		termsAndConditions,
		topPriceDescription,
		userInstructions,
	} = content || {};

	console.log("🚀 ~ content >>", content);
	console.log("🚀 ~ css >>", css);
	console.log("=============");

	// * ===========================

	if (isFetchingNewVisit) return "Loading"; //TODO >> better loading spinner / skeleton to implement

	if (heRequired) return <div> Should do a HE redirect + call Post HE</div>;

	return (
		<Layout
			headerPrice={topPriceDescription ?? ""}
			terms={termsAndConditions}
			termsVisibility={termsV}
		>
			{image && (
				<div className={styles.logo_container}>
					<img src={image} alt="" />
				</div>
			)}

			{serviceDescription && (
				<div className={styles.catch_container}>
					<p>{serviceDescription}</p>
				</div>
			)}

			<div className={styles.main}>
				<form>
					{phoneEntryBox && (
						<>
							<p>Enter your mobile number to continue</p>
							<Input />
						</>
					)}

					<Button
						label={cta}
						size={clickableZone === "Large" ? "large" : undefined}
					/>
				</form>
				<Button
					type={"button"}
					label="Exit"
					className={styles.exitBtn}
					onClick={() => window.close()}
					size="small"
				/>
			</div>

			{bottomPriceDescription && (
				<div className={styles.price_wrapper}>
					<p>{bottomPriceDescription}</p>
				</div>
			)}
		</Layout>
	);
};

export default Landing;
