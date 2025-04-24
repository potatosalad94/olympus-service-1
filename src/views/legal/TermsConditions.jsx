import { useParams } from "react-router-dom";
import LegalPageLayout from "../../components/LegalPageLayout/LegalPageLayout";
import styles from "./Legal.module.scss";

const TermsConditions = () => {
	const { languageCode } = useParams();

	// Content based on language
	const content = {
		en: (
			<>
				<h2>Terms and Conditions</h2>
				<p>
					<h2>1. The Service</h2>
					<p>
						In these terms "Service" means the UAE E1 service and
						"subscriber" or "you" means a person (you or any
						individual using your mobile phone) who follows and
						completes the subscription and registration steps
						directed on our website.
					</p>
					<p>
						By subscribing to the Service, you acknowledge that you
						have read, understood, and agree to be bound by these
						terms.
					</p>
					<p>
						If you do not accept these terms, you must not
						subscribe/register for the Service.
					</p>
				</p>

				<h2>2. Service Operation</h2>
				<p>
					The Service works as follows: After following the
					instructions and entering your mobile number on the website,
					you will receive a PIN code. Once you enter the code you are
					subscribed to the service. You will receive a welcome
					message containing all relevant information about the
					service including the price, how to cancel and how to get
					support. As part of your subscription, depending on the
					service you join, you will also receive SMS messages
					containing mobile content or instructions on how to access
					the mobile content ("subscription messages").
				</p>

				<h2>3. Support & Cancellation</h2>
				<p>
					For support or to cancel your service, please visit
					https://charge-portal.com/. You can also cancel the service
					by following the instructions sent to you in your welcome
					message.
				</p>

				<h2>4. Usage Restrictions</h2>
				<p>
					To use the Service, you must be a resident of United Arab
					Emirates and at least 18 years old, or have explicit
					permission from an adult and the mobile phone owner.
				</p>

				<h2>5. Subscription Validation</h2>
				<p>
					We reserve the right to validate the subscription or
					subscriber and disqualify any subscription or subscriber
					that tampers with the service or does not use the service
					according to these terms.
				</p>
				<p>
					We reserve the right to suspend or prevent anyone from
					subscribing to the service.
				</p>

				<h2>6. Service Interruption</h2>
				<p>
					If the service is unable to operate as planned for any
					reason (including, but not limited to, computer viruses,
					errors, tampering, unauthorized intervention, fraud,
					technical failures, or any other causes) that could
					compromise the integrity or proper functioning of the
					service, we reserve the right to cancel, terminate, modify,
					or suspend the service.
				</p>

				<h2>7. Service Suspension or Termination</h2>
				<p>
					If, for any reason, our services are unable to operate as
					planned (including, but not limited to, technical failures,
					unauthorized interference, fraud, or any other causes beyond
					our control that compromise the management, security,
					fairness, or proper conduct of the service), we have the
					right, at our sole discretion, to exclude any individual who
					tampers with the service, cancel, terminate, modify, or
					suspend the service.
				</p>

				<h2>8. Intellectual Property Rights</h2>
				<p>
					You acknowledge and agree that the software and websites
					used in connection with the Service contain information and
					marks that are protected by applicable copyright, trade
					secret, trademark and other intellectual property laws. All
					current and future rights of every nature globally
					concerning the websites, Services, and software in any
					version remain with us (or our brand partners under licence)
					at all times ("Intellectual Property Rights"). You do not
					acquire any rights, express or implied, to the Intellectual
					Property Rights other than those expressly granted in the
					Terms of Service. You shall not sell or transfer,
					sub-licence, modify, rent, lease, loan, reproduce,
					distribute, create or develop any content or products
					derived in whole or in part from the Service.
				</p>
				<p>
					The Provider grants you a personal, limited,
					non-transferable, non-exclusive, revocable, and
					non-assignable licence to use the Service solely for your
					own personal, non-commercial use on a compatible mobile
					device, and to use the Software and the Sites in strict
					accordance with the Terms of Service. You shall not gain or
					seek to gain unauthorised access to the Service. You agree
					to use only the interface provided by the Provider to access
					the Service.
				</p>

				<h2>9. Liability</h2>
				<p>
					We are not responsible for any failure to comply with these
					terms. If any part or provision of these terms is found to
					be invalid, unenforceable, or illegal for any reason, that
					part or provision will be severed, and the remaining
					provisions will remain in full force and effect.
				</p>

				<h2>10. Entire Agreement</h2>
				<p>
					These terms and conditions constitute the entire agreement
					between you and the owner of the Service.
				</p>
			</>
		),
		ar: (
			<>
				<h2>الشروط والأحكام</h2>
				<p>
					<h2>1. الخدمة</h2>
					<p>
						في هذه الشروط، تعني "الخدمة" خدمة UAE E1، ويُقصد بـ
						"المشترك" أو "أنت" أي شخص (سواء أنت أو أي شخص يستخدم
						هاتفك المحمول) يقوم باتباع خطوات الاشتراك والتسجيل
						الموضحة على موقعنا الإلكتروني.
					</p>
					<p>
						عند الاشتراك في الخدمة، فإنك تُقر بأنك قرأت هذه الشروط
						وفهمتها وتوافق على الالتزام بها.
					</p>
					<p>
						إذا كنت لا توافق على هذه الشروط، فلا يجوز لك الاشتراك أو
						التسجيل في الخدمة.
					</p>
				</p>

				<h2>2. تشغيل الخدمة</h2>
				<p>
					تعمل الخدمة على النحو التالي: بعد اتباع التعليمات وإدخال رقم
					هاتفك المحمول على الموقع، ستتلقى رمز تحقق (PIN). بمجرد إدخال
					هذا الرمز، يتم تفعيل اشتراكك في الخدمة. سوف تتلقى رسالة
					ترحيبية تحتوي على جميع المعلومات المتعلقة بالخدمة، بما في
					ذلك السعر، طريقة الإلغاء، وطريقة الحصول على الدعم. كجزء من
					اشتراكك، ووفقًا لنوع الخدمة، ستتلقى أيضًا رسائل نصية (SMS)
					تحتوي على محتوى أو تعليمات للوصول إلى المحتوى ("رسائل
					الاشتراك").
				</p>

				<h2>3. الدعم والإلغاء</h2>
				<p>
					للدعم أو إلغاء خدمتك، يُرجى زيارة الرابط:
					https://charge-portal.com. يمكنك أيضًا إلغاء الخدمة من خلال
					اتباع التعليمات التي وردتك في رسالة الترحيب.
				</p>

				<h2>4. قيود الاستخدام</h2>
				<p>
					لاستخدام هذه الخدمة، يجب أن تكون مقيمًا في دولة الإمارات
					العربية المتحدة وأن لا يقل عمرك عن 18 عامًا، أو أن تمتلك
					إذنًا صريحًا من شخص بالغ ومالك الهاتف.
				</p>

				<h2>5. التحقق من الاشتراك</h2>
				<p>
					نحتفظ بالحق في التحقق من الاشتراك أو من هوية المشترك،
					واستبعاد أي اشتراك أو مشترك يعبث بالخدمة أو لا يستخدمها
					وفقًا لهذه الشروط.
				</p>
				<p>
					كما نحتفظ بالحق في تعليق أو منع أي شخص من الاشتراك في
					الخدمة.
				</p>

				<h2>6. انقطاع الخدمة</h2>
				<p>
					إذا تعذّر تشغيل الخدمة كما هو مخطط له لأي سبب (بما في ذلك
					على سبيل المثال لا الحصر: الفيروسات، الأعطال، التدخل غير
					المصرّح به، الاحتيال، أو المشكلات التقنية)، فإننا نحتفظ
					بالحق في إلغاء أو إنهاء أو تعديل أو تعليق الخدمة.
				</p>

				<h2>7. تعليق أو إنهاء الخدمة</h2>
				<p>
					إذا تعذّر علينا تشغيل الخدمة كما هو مخطط له لأي سبب (بما في
					ذلك الأسباب الخارجة عن إرادتنا والتي تؤثر على إدارة الخدمة
					أو أمانها أو عدالتها أو تشغيلها)، فإننا نحتفظ بالحق، حسب
					تقديرنا، في استبعاد أي شخص يعبث بالخدمة أو في إلغاء أو تعديل
					أو تعليق الخدمة.
				</p>

				<h2>8. حقوق الملكية الفكرية</h2>
				<p>
					أنت تُقر وتوافق على أن البرمجيات والمواقع المستخدمة ضمن
					الخدمة تحتوي على معلومات وعلامات محمية بموجب قوانين حقوق
					النشر، الأسرار التجارية، والعلامات التجارية وغيرها من قوانين
					الملكية الفكرية المعمول بها. جميع الحقوق الحالية والمستقبلية
					على مستوى العالم المتعلقة بالمواقع والخدمات والبرمجيات تعود
					لنا أو لشركائنا بموجب ترخيص، ولا تُمنح لك أي حقوق صريحة أو
					ضمنية بخلاف ما هو منصوص عليه صراحة في هذه الشروط.
				</p>
				<p>
					لا يجوز لك بيع أو نقل أو ترخيص أو تعديل أو تأجير أو استئجار
					أو نسخ أو توزيع أو إنشاء أعمال مشتقة كليًا أو جزئيًا من
					الخدمة. يُمنح لك ترخيص محدود وشخصي وغير قابل للتحويل أو
					التنازل وقابل للإلغاء لاستخدام الخدمة لأغراضك الشخصية وغير
					التجارية فقط على جهازك المحمول المتوافق، وفقًا للشروط.
				</p>

				<h2>9. المسؤولية</h2>
				<p>
					لسنا مسؤولين عن أي فشل في الامتثال لهذه الشروط. إذا تبيّن أن
					أي جزء أو بند من هذه الشروط غير صالح أو غير قابل للتنفيذ أو
					غير قانوني لأي سبب من الأسباب، فسيتم فصل هذا الجزء دون أن
					يؤثر ذلك على بقية البنود التي ستظل سارية المفعول.
				</p>

				<h2>10. الاتفاق الكامل</h2>
				<p>
					تشكل هذه الشروط والأحكام الاتفاق الكامل والنهائي بينك وبين
					مالك الخدمة.
				</p>
			</>
		),
	};

	return (
		<LegalPageLayout
			title={
				languageCode === "ar"
					? "الشروط والأحكام"
					: "Terms and Conditions"
			}
		>
			<div className={styles.legalContent}>
				{content[languageCode] || content["en"]}
			</div>
		</LegalPageLayout>
	);
};

export default TermsConditions;
