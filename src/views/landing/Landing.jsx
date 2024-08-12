import Layout from "@components/Layout/Layout";
import styles from "./Landing.module.scss";
import { useQuery } from "@tanstack/react-query";
import useApi from "@hooks/useApi";
import { newVisit } from "@api/client";

const Landing = () => {
	const newVisitApi = useApi(newVisit);

	const postNewVisit = async () => {
		const response = await newVisitApi.request({
			serviceName: "Service_1",
			ipv4: "94.207.100.51",
			navigatorLanguage: "en",
			connectionType: "Wifi",
		});
		return response.data;
	};

	const { isLoading, data } = useQuery({
		queryKey: ["newVisit"],
		queryFn: postNewVisit,
	});

	console.log("THE DATA >>", data);

	return <Layout>Landing page</Layout>;
};

export default Landing;
