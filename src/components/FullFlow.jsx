import {
    otpConfirm,
    otpRequest,
    resendOtp as resendOtpEndpoint,
} from "@/api/client";
import Input from "@/components/Input/Input";
import otpConfirmSchema from "@/components/OtpConfirm/otpConfirmSchema";
import otpRequestSchema from "@/components/OtpRequest/otpRequestSchema";
import useApi from "@/hooks/useApi";
import useOtpCountdown from "@/hooks/useOtpCountdown";
import { languages } from "@/utils/languages-dictionnary";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputOtp } from "primereact/inputotp";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./FullFlow.module.scss";
import { classNames } from "primereact/utils";

// Helper function to detect iOS
const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

const FullFlow = ({
    content,
    css,
    showModal,
    setShowModal,
    language,
    ctaMethod,
    visitorId,
    onSuccess,
    isLoadingDataDisplay,
}) => {
    const {
        showModalMsisdnInput,
        clickableZone,
        msisdnPrefill,
        closableModal,
        blurPx,
        modalCtaFontColor,
        modalCtaFontSize,
        modalCtaFontStyle,
        modalCtaFontWeight,
        modalCtaInfoFontColor,
        modalCtaInfoFontSize,
        modalCtaInfoFontStyle,
        modalCtaInfoFontWeight,
        dynamicMsisdnEntryBox,
    } = css;

    const {
        msisdn,
        dialCode,
        modalUserInstructions,
        modalUserInstructionsSecondStep,
        modalCta,
        modalCtaInfo,
        modalCtaSecondStep,
        newOtpRequest,
        otpConfirmTimer,
        phoneNumberNative,
    } = content;

    const [modalStep, setModalStep] = useState(ctaMethod);
    const [contactValue, setContactValue] = useState(
        msisdnPrefill && msisdn ? msisdn : ""
    );

    // * ==== API Services =====
    const otpRequestApi = useApi(otpRequest);
    const otpConfirmApi = useApi(otpConfirm);
    const resendOtpApi = useApi(resendOtpEndpoint);

    // * ==== Countdown Timer =====
    const { countdown, startCountdown } = useOtpCountdown(otpConfirmTimer);

    // * ==== RESEND OTP MUTATION =====
    const { mutate: resendOtp, isPending: isPendingOtp } = useMutation({
        mutationFn: (msisdn) => {
            return resendOtpApi.request({
                visitorId,
                msisdn,
            });
        },
        onSuccess: () => startCountdown(),
    });

    // * ==== OTP REQUEST FORM & MUTATION =====
    const { mutate: requestOtp, isPending } = useMutation({
        mutationFn: (msisdn = "") => {
            return otpRequestApi.request({
                visitorId,
                msisdn,
            });
        },
        onSuccess: () => {
            setModalStep("OtpConfirm");
        },
    });

    const {
        control,
        handleSubmit,
        setValue,
        formState: { isValid },
    } = useForm({
        resolver: joiResolver(otpRequestSchema(language?.code?.toLowerCase())),
        context: {
            showInput: showModalMsisdnInput,
        },
        defaultValues: {
            contact: contactValue,
        },
        mode: "onChange",
    });

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        // Check if the form is valid based on regex pattern
        if (showModalMsisdnInput) {
            const phoneRegex = /^(\+9715\d{8}|9715\d{8}|009715\d{8}|05\d{8})$/;
            const isValidNumber = phoneRegex.test(contactValue);
            setIsFormValid(isValidNumber && isValid);
        } else {
            setIsFormValid(true);
        }
    }, [contactValue, showModalMsisdnInput, isValid]);

    const onSubmitOtpRequest = ({ contact }) => {
        requestOtp(contact);
    };

    // * ==== OTP CONFIRM FORM & MUTATION =====
    const [otpState, setOtpState] = useState("");

    const {
        mutate: confirmOtp,
        isPending: isPendingConfirm,
        isError,
    } = useMutation({
        mutationFn: (otp) => {
            return otpConfirmApi.request({
                visitorId,
                otp,
            });
        },
        onSuccess,
        onError: () => resetOtpForm(),
    });

    const {
        control: controlOtp,
        handleSubmit: handleConfirmOtp,
        reset: resetOtpForm,
        setValue: setValueOtp,
        watch,
    } = useForm({
        resolver: joiResolver(otpConfirmSchema),
        mode: "onSubmit",
        defaultValues: {
            otp: otpState,
        },
    });

    const otpWatcher = watch("otp");

    const onSubmitOtpConfirm = ({ otp }) => {
        confirmOtp(otp);
    };

    // Handle iOS autofill detection
    useEffect(() => {
        if (modalStep === "OtpConfirm" && isIOS()) {
            const handleIosAutofill = () => {
                // iOS autofill affects the value of inputs
                // We check if any inputs suddenly have values
                const inputs = document.querySelectorAll(".p-inputotp-input");
                if (inputs.length === 4) {
                    // Check if any input has a value, indicating possible autofill
                    const values = Array.from(inputs).map(
                        (input) => input.value
                    );
                    if (values.some((val) => val)) {
                        // Combine the values into a single string
                        const combined = values.join("");
                        if (combined.length === 4) {
                            // Set the combined value to our state
                            setOtpState(combined);
                            setValueOtp("otp", combined);
                        }
                    }
                }
            };

            // Check for autofill shortly after rendering
            setTimeout(handleIosAutofill, 300);
            // Also check when the document changes which happens during autofill
            document.addEventListener("input", handleIosAutofill);

            return () => {
                document.removeEventListener("input", handleIosAutofill);
            };
        }
    }, [modalStep, setValueOtp]);

    // * ==== RENDER METHODS =====
    const renderOtpRequestFormContent = () => (
        <div className={styles.form_container}>
            {modalUserInstructions && <p>{modalUserInstructions}</p>}

            {showModalMsisdnInput && (
                <div className={styles.input_wrapper}>
                    <Controller
                        name="contact"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Input
                                {...field}
                                value={contactValue}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    setContactValue(newValue);
                                    setValue("contact", newValue, {
                                        shouldValidate: true,
                                    });
                                }}
                                dialCode={dialCode}
                                error={fieldState.error}
                                onClick={(e) => e.stopPropagation()}
                                type="tel"
                                disabled={isPending}
                                isAnimated={dynamicMsisdnEntryBox}
                                phoneNumberNative={phoneNumberNative}
                                langCode={language?.code}
                            />
                        )}
                    />
                </div>
            )}

            {modalCta && (
                <Button
                    type="submit"
                    size={clickableZone === "Large" ? "large" : undefined}
                    disabled={!isFormValid || isPending}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className={styles.submit_btn}
                >
                    {isPending ? (
                        <i className={`pi pi-spin pi-spinner-dotted`}></i>
                    ) : (
                        <>
                            <span
                                style={{
                                    color: modalCtaFontColor,
                                    fontSize: modalCtaFontSize,
                                    fontStyle: modalCtaFontStyle,
                                    fontWeight: modalCtaFontWeight,
                                }}
                            >
                                {modalCta}
                            </span>
                            <span
                                style={{
                                    color: modalCtaInfoFontColor,
                                    fontSize: modalCtaInfoFontSize,
                                    fontStyle: modalCtaInfoFontStyle,
                                    fontWeight: modalCtaInfoFontWeight,
                                }}
                            >
                                {modalCtaInfo}
                            </span>
                        </>
                    )}
                </Button>
            )}
        </div>
    );

    const renderOtpConfirmFormContent = () => (
        <div className={styles.form_container}>
            {modalUserInstructionsSecondStep && (
                <p>{modalUserInstructionsSecondStep}</p>
            )}

            <Controller
                name="otp"
                control={controlOtp}
                render={({ field }) => (
                    <div
                        className={classNames(styles.otp_wrapper, {
                            [styles.heartbeat_animation]: dynamicMsisdnEntryBox,
                        })}
                    >
                        <InputOtp
                            {...field}
                            pt={{
                                root: {
                                    className: classNames(
                                        styles["custom-otp-input"],
                                        {
                                            [styles.error]: isError,
                                        }
                                    ),
                                },
                            }}
                            onChange={(e) => {
                                const newValue = e.value;
                                setOtpState(newValue);
                                setValueOtp("otp", newValue);
                            }}
                            onPaste={(e) => {
                                e.preventDefault();
                                const pasteData = e.clipboardData
                                    .getData("text/plain")
                                    .trim();
                                if (pasteData && /^\d{4}$/.test(pasteData)) {
                                    setOtpState(pasteData);
                                    setValueOtp("otp", pasteData);
                                }
                            }}
                            autoFocus
                            integerOnly
                        />
                    </div>
                )}
            />

            <Button
                className={styles.submit_btn}
                disabled={otpWatcher.length !== 4}
            >
                {isPendingConfirm ? (
                    <i className={`pi pi-spin pi-spinner-dotted`}></i>
                ) : (
                    <span
                        style={{
                            color: modalCtaFontColor,
                            fontSize: modalCtaFontSize,
                            fontStyle: modalCtaFontStyle,
                            fontWeight: modalCtaFontWeight,
                        }}
                    >
                        {modalCtaSecondStep}
                    </span>
                )}
            </Button>

            <Button
                type={"button"}
                className={styles.resend_btn}
                onClick={() => resendOtp(contactValue)}
                disabled={
                    countdown > 0 ||
                    isPendingOtp ||
                    isPendingConfirm ||
                    isLoadingDataDisplay
                }
                link
            >
                {newOtpRequest}
            </Button>

            {countdown > 0 && (
                <p>
                    {language?.code === languages.arabic
                        ? `يمكنك طلب رمز التحقق مرة أخرى بعد ${countdown} ثانية`
                        : `You can request another OTP in ${countdown} seconds`}
                </p>
            )}
        </div>
    );

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Dialog
                pt={{
                    mask: {
                        style: {
                            backdropFilter: `blur(${blurPx}px)`,
                        },
                    },
                }}
                focusOnShow={false}
                visible={showModal}
                maskStyle={{ padding: "20px" }}
                blockScroll={true}
                onHide={() => {
                    setShowModal(false);
                }}
                closable={closableModal}
                draggable={false}
                showHeader={closableModal}
                contentClassName={classNames(styles.dialog_content, {
                    [styles.no_header]: !closableModal,
                })}
            >
                {modalStep === "OtpRequest" && (
                    <form
                        onSubmit={handleSubmit(onSubmitOtpRequest)}
                        noValidate
                    >
                        {renderOtpRequestFormContent()}
                    </form>
                )}

                {modalStep === "OtpConfirm" && (
                    <form
                        onSubmit={handleConfirmOtp(onSubmitOtpConfirm)}
                        noValidate
                    >
                        {renderOtpConfirmFormContent()}
                    </form>
                )}
            </Dialog>
        </div>
    );
};

export default FullFlow;
