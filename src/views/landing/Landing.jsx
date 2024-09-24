import Input from "@/components/Input/Input";
import useNewVisit from "@/hooks/useNewVisit";
import Layout from "@components/Layout/Layout";
import { Button } from "primereact/button";
import styles from "./Landing.module.scss";

const serviceName = "Service_1";

const Landing = () => {
	// * ====== NEW VIST CALL ======

	const { data: newVisitData, isFetching: isFetchingNewVisit } = useNewVisit(
		serviceName,
		true
		// 1 // testResponse
	);

	const { css, content, msisdn, heRequired, currentLanguage } =
		newVisitData || {};

	const { clickableZone, termsV, playButton } = css ?? {};

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
			terms={termsAndConditions ?? ""}
			termsVisibility={termsV}
			lang={currentLanguage}
		>
			{image && (
				<div
					role={"button"}
					tabIndex={0}
					className={styles.logo_container}
					onClick={
						playButton ? () => alert("CLICKED ON IMAGE") : undefined
					}
				>
					{playButton && <i className="pi pi-play-circle"></i>}
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
							{/* <p>Enter your mobile number to continue</p> */}
							<Input defaultValue={phoneEntryBox} />
						</>
					)}

					<Button
						label={cta}
						size={clickableZone === "Large" ? "large" : undefined}
						onClick={() => alert("clicked CTA")}
					/>
				</form>
				{exitButton && (
					<Button
						type={"button"}
						label={exitButton}
						className={styles.exitBtn}
						onClick={() => window.close()}
						size="small"
					/>
				)}
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
