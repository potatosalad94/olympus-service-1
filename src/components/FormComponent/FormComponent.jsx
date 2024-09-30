import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Controller, useForm } from "react-hook-form";
import Input from "../Input/Input";
import styles from "./FormComponent.module.scss";
import { joiResolver } from "@hookform/resolvers/joi";
import formSchema from "@/formSchema";
import { forwardRef, useImperativeHandle } from "react";

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
		const { handleSubmit, control, reset } = useForm({
			resolver: joiResolver(formSchema),
			mode: "onSubmit",
			context: { phoneEntryBox }, // Pass phoneEntryBox as context
		});

		useImperativeHandle(ref, () => ({
			reset,
		}));

		const onSubmit = (data) => {
			console.log(data);
			// Handle form submission
		};

		const renderFormContent = () => (
			<>
				{phoneEntryBox && (
					<>
						{userInstructions && <p>{userInstructions}</p>}
						<Controller
							name="contact"
							control={control}
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
						alert("clicked CTA"); //TODO >> to be handled by react-hook-form
					}}
				/>
			</>
		);

		return (
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				{renderFormContent()}

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
					<div>{renderFormContent()}</div>
				</Dialog>
			</form>
		);
	}
);

export default FormComponent;
