import { otpConfirm, resendOtp as resendOtpEndpoint } from "@/api/client";
import useApi from "@/hooks/useApi";
import useOtpCountdown from "@/hooks/useOtpCountdown";
import { languages } from "@/utils/languages-dictionnary";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { InputOtp } from "primereact/inputotp";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./OtpConfirm.module.scss";
import otpConfirmSchema from "./otpConfirmSchema";
import { classNames } from "primereact/utils";

// Helper function to detect iOS
const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

const OtpConfirm = ({ css, onSuccess, visitorId, content, language }) => {
    const {
        ctaFontColor,
        ctaFontSize,
        ctaFontStyle,
        ctaFontWeight,
        dynamicMsisdnEntryBox,
    } = css;

    const [otpState, setOtpState] = useState("");

    const { msisdn, userInstructions, cta, newOtpRequest, otpConfirmTimer } =
        content || {};

    const { countdown, startCountdown } = useOtpCountdown(otpConfirmTimer);

    // * ==== OTP CONFIRM =====
    const otpConfirmApi = useApi(otpConfirm);

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
        onError: () => reset(),
    });

    // * ==== RESEND OTP =====
    const resendOtpApi = useApi(resendOtpEndpoint);

    const { mutate: resendOtp, isPending: isPendingOtp } = useMutation({
        mutationFn: (msisdn) => {
            return resendOtpApi.request({
                visitorId,
                msisdn,
            });
        },
        onSuccess: () => startCountdown(),
    });

    const handleOtpRequest = () => {
        resendOtp(msisdn);
    };

    // * ==== FORM HANDLING =====
    const { control, handleSubmit, reset, setValue, watch } = useForm({
        resolver: joiResolver(otpConfirmSchema),
        mode: "onSubmit",
        defaultValues: {
            otp: otpState,
        },
    });

    const otpWatcher = watch("otp");

    const onSubmit = ({ otp }) => {
        confirmOtp(otp);
    };

    // Handle iOS autofill detection
    useEffect(() => {
        if (isIOS()) {
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
                            setValue("otp", combined);
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
    }, [setValue]);

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.container}>
                    {userInstructions && <p>{userInstructions}</p>}

                    <Controller
                        name="otp"
                        control={control}
                        render={({ field }) => (
                            <div
                                className={classNames(styles.otp_wrapper, {
                                    [styles.heartbeat_animation]:
                                        dynamicMsisdnEntryBox,
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
                                        setValue("otp", newValue);
                                    }}
                                    onPaste={(e) => {
                                        e.preventDefault();
                                        const pasteData = e.clipboardData
                                            .getData("text/plain")
                                            .trim();
                                        if (
                                            pasteData &&
                                            /^\d{4}$/.test(pasteData)
                                        ) {
                                            setOtpState(pasteData);
                                            setValue("otp", pasteData);
                                        }
                                    }}
                                    autoFocus
                                    integerOnly
                                />
                            </div>
                        )}
                    />

                    {cta && (
                        <>
                            <Button
                                className={styles.cta_btn}
                                disabled={otpWatcher.length !== 4}
                            >
                                {isPendingConfirm ? (
                                    <i
                                        className={`pi pi-spin pi-spinner-dotted`}
                                    ></i>
                                ) : (
                                    <span
                                        style={{
                                            color: ctaFontColor,
                                            fontSize: ctaFontSize,
                                            fontStyle: ctaFontStyle,
                                            fontWeight: ctaFontWeight,
                                        }}
                                    >
                                        {cta}
                                    </span>
                                )}
                            </Button>

                            <Button
                                type={"button"}
                                className={styles.resend_btn}
                                onClick={handleOtpRequest}
                                disabled={
                                    countdown > 0 ||
                                    isPendingOtp ||
                                    isPendingConfirm
                                }
                                link
                            >
                                {newOtpRequest}
                            </Button>
                        </>
                    )}

                    {countdown > 0 && (
                        <p>
                            {language?.code === languages.arabic
                                ? `يمكنك طلب رمز التحقق مرة أخرى بعد ${countdown} ثانية`
                                : `You can request another OTP in ${countdown} seconds`}
                        </p>
                    )}
                </div>
            </form>
        </>
    );
};

export default OtpConfirm;
