import Input from "@/components/Input/Input";
import formSchema from "@/formSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { forwardRef, useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./FormComponent.module.scss";

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
		},
		ref
	) => {
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

		const onSubmit = (data) => {
			console.log(data);
			// Handle form submission
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
