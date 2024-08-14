import { queryKeys } from "@/app-keys-factory";
import Input from "@/components/Input/Input";
import { newVisit, serviceInfo } from "@api/client";
import Layout from "@components/Layout/Layout";
import useApi from "@hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import styles from "./Landing.module.scss";
import serviceImg from "@/images/service_1.png";

const Landing = () => {
	// * ====== SERVICE INFO CALL ======

	const serviceInfoApi = useApi(serviceInfo);

	const getServiceInfo = async ({ queryKey }) => {
		const [_, serviceName, language] = queryKey;
		const response = await serviceInfoApi.request(serviceName, language);
		// const response = await serviceInfoApi.request({
		// 	serviceName,
		// 	language,
		// });
		return response.data;
	};

	const { data: serviceInfoData } = useQuery({
		queryKey: queryKeys.serviceInfo("Service_1", "en"),
		queryFn: getServiceInfo,
	});

	console.log("🚀 ~ serviceInfo >>", serviceInfoData);

	const {
		websiteChargingDescription,
		websiteServiceDescription,
		websiteTermsAndConditions,
	} = serviceInfoData;

	// {
	//     "acquisitionWebsite": "www.acquisition-website.com",
	//     "chargingFrequency": "daily",
	//     "country": "UAE",
	//     "currency": "AED",
	//     "operatorsList": [
	//         "Du",
	//         "Etisalat"
	//     ],
	//     "serviceLink": "shorturl.at/GxU9b",
	//     "servicePriceInLocalCurrency": "1.0",
	//     "smsTermsAndConditionsUrl": "shorturl.at/GxU9b",
	//     "websiteChargingDescription": "FREE for 24 hours then 1.00 AED/day VAT Incl.",
	//     "websiteServiceDescription": "eSports TV: #1 eSports pack. Watch live gaming tournaments and more",
	//     "websiteSubscriptionConfirmation": "Thank you for subscribing to Service_1. You will soon receive a confirmation sms with the credentials you can use to access our service at www.shortUrl/esfs5. Please feel free to contact our support at support@our-website.com if ou need help to access this content",
	//     "websiteTermsAndConditions": "Free for 1 day, then 1.00 AED/day VAT included. By clicking the Subscribe button above, you agree to the following Terms and Conditions: Your paid subscription will automatically begin after the 1-day free trial and will renew daily. There is no commitment, and you can cancel your subscription at any time by sending STOP to 1011 for Etisalat users or 8888 for DU users, or by visiting our unsubscription page at www.service_1/unsubscription.com. For support, please contact support@service_1.com. The free trial is valid for new subscribers only. Please ensure your browser is not using any third-party blocking technologies and that you have a stable internet connection for seamless access to the content."
	// }

	// * ====== NEW VIST CALL ======

	const newVisitApi = useApi(newVisit);

	const postNewVisit = async () => {
		const response = await newVisitApi.request({
			serviceName: "Service_1",
			ipv4: "86.98.155.108",
			connectionType: "Wifi",
			landingPage: "Landing Page 1 En",
		}); //TODO >> values should not be hardcoded
		return response.data;
	};

	const { data: newVisitData } = useQuery({
		queryKey: queryKeys.newVisit,
		queryFn: postNewVisit,
		enabled: !!serviceInfoData,
	});

	console.log("THE NEWVISIT DATA >>", newVisitData);
	// * ===========================

	console.log("=========================");

	return (
		<Layout
			headerPrice={websiteChargingDescription}
			terms={websiteTermsAndConditions}
		>
			<div className={styles.logo_container}>
				<img src={serviceImg} alt="" />
			</div>

			<div className={styles.catch_container}>
				<p>{websiteServiceDescription}</p>
			</div>

			<div className={styles.main}>
				<Input />

				<Button label="Submit" />
				<Button label="Exit" className={styles.exitBtn} size="small" />
			</div>

			<div className={styles.price_wrapper}>
				<p>{websiteChargingDescription}</p>
			</div>
		</Layout>
	);
};

export default Landing;
