import { otpRequest } from "@/api/client";
import Input from "@/components/Input/Input";
import formSchema from "@/formSchema";
import useApi from "@/hooks/useApi";
import { useToastContext } from "@/hooks/useToastContext";
import { errorToast } from "@/utils/toast-messages";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { forwardRef, useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./FormComponent.module.scss";

const FormComponent = forwardRef(
	(
		{
			phoneEntryBox,
			dialCode,
			userInstructions,
			cta,
			clickableZone,
			showModal,
			setShowModal,
			closableModal,
			visitorId,
			onSuccess,
		},
		ref
	) => {
		const { showToast } = useToastContext();

		const otpApi = useApi(otpRequest);

		const { mutate: requestOtp, isPending } = useMutation({
			mutationFn: (msisdn = "") => {
				return otpApi.request({
					visitorId,
					msisdn,
				});
			},
			onSuccess,
			onError: () => showToast(errorToast()),
		});

		const {
			reset,
			control: mainControl,
			handleSubmit: mainHandleSubmit,
			formState: { errors: mainErrors },
		} = useForm({
			resolver: joiResolver(formSchema),
			context: { dialCode, phoneEntryBox },
			defaultValues: {
				contact: phoneEntryBox ?? "",
			},
			mode: "onSubmit",
		});

		const {
			control: dialogControl,
			handleSubmit: dialogHandleSubmit,
			formState: { errors: dialogErrors },
		} = useForm({
			resolver: joiResolver(formSchema),
			context: { dialCode, phoneEntryBox },
			defaultValues: {
				contact: phoneEntryBox ?? "",
			},
			mode: "onSubmit",
		});

		const onSubmit = ({ contact }) => {
			requestOtp(contact);
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
							render={({ field, fieldState }) => (
								<Input
									{...field}
									dialCode={dialCode}
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
					loading={isPending}
				/>
			</div>
		);

		return (
			<>
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
