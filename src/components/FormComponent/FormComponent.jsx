import Input from "@/components/Input/Input";
import formSchema from "@/formSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./FormComponent.module.scss";
import useApi from "@/hooks/useApi";
import { otpRequest } from "@/api/client";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "primereact/toast";

const FormComponent = forwardRef(
	(
		{
			phoneEntryBox,
			userInstructions,
			cta,
			clickableZone,
			showModal,
			setShowModal,
			closableModal,
			visitorId,
		},
		ref
	) => {
		const toast = useRef(null);

		const otpApi = useApi(otpRequest);

		const mutation = useMutation({
			mutationFn: (msisdn) => {
				return otpApi.request({
					visitorId,
					msisdn,
				});
			},

			onSuccess: (response) => console.log("RESPONSE >>", response),
			// queryClient.setQueryData(queryKeys.newVisit, response.data),

			onError: () =>
				toast.current.show({
					severity: "error",
					summary: "Error",
					detail: "Something wrong happened",
					life: 3000,
				}),
		});

		const {
			reset,
			control: mainControl,
			handleSubmit: mainHandleSubmit,
			formState: { errors: mainErrors },
		} = useForm({
			resolver: joiResolver(formSchema),
			context: { phoneEntryBox },
			mode: "onSubmit",
		});

		const {
			control: dialogControl,
			handleSubmit: dialogHandleSubmit,
			formState: { errors: dialogErrors },
		} = useForm({
			resolver: joiResolver(formSchema),
			context: { phoneEntryBox },
			mode: "onSubmit",
		});

		const onSubmit = ({ contact }) => {
			mutation.mutate(contact);
		};

		useImperativeHandle(ref, () => ({
			reset,
		}));

		const renderFormContent = (control, errors) => (
			<div className={styles.form_container}>
				{phoneEntryBox && (
					<>
						{userInstructions && <p>{userInstructions}</p>}
						<Controller
							name="contact"
							control={control}
							defaultValue=""
							render={({ field, fieldState }) => (
								<Input
									{...field}
									defaultValue={phoneEntryBox}
									error={fieldState.error}
									onClick={(e) => e.stopPropagation()}
								/>
							)}
						/>
					</>
				)}
				<Button
					type="submit"
					label={cta}
					size={clickableZone === "Large" ? "large" : undefined}
					onClick={(e) => {
						e.stopPropagation();
					}}
				/>
			</div>
		);

		return (
			<>
				<div
					onClick={(e) => {
						e.stopPropagation(); // Stops the click event from propagating to the toast
					}}
				>
					<Toast ref={toast} />
				</div>

				<form onSubmit={mainHandleSubmit(onSubmit)} noValidate>
					{renderFormContent(mainControl, mainErrors)}
				</form>

				<Dialog
					visible={showModal}
					style={{ width: "70vw" }}
					onHide={() => setShowModal(false)}
					closable={closableModal}
					draggable={false}
					showHeader={closableModal}
					contentClassName={
						!closableModal ? styles.no_header : undefined
					}
				>
					<form onSubmit={dialogHandleSubmit(onSubmit)} noValidate>
						{renderFormContent(dialogControl, dialogErrors)}
					</form>
				</Dialog>
			</>
		);
	}
);

export default FormComponent;
