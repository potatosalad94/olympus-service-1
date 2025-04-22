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
					Welcome to our service. By accessing or using our service,
					you agree to be bound by these Terms and Conditions.
				</p>

				<h2>1. Acceptance of Terms</h2>
				<p>
					By accessing or using our service, you agree to be bound by
					these Terms. If you disagree with any part of the terms,
					then you may not access the service.
				</p>

				<h2>2. Use of Service</h2>
				<p>
					Our service is provided "as is" and "as available" basis. We
					do not guarantee that the service will be uninterrupted,
					secure or error-free.
				</p>

				<h2>3. Account Registration</h2>
				<p>
					To access certain features of the service, you may be
					required to register for an account. You must provide
					accurate information and keep your account secure.
				</p>

				<h2>4. User Conduct</h2>
				<p>You agree not to:</p>
				<ul>
					<li>
						Use the service in any way that violates applicable laws
					</li>
					<li>Post unauthorized content</li>
					<li>
						Attempt to interfere with the proper functioning of the
						service
					</li>
					<li>
						Make unauthorized copies of content from the service
					</li>
				</ul>

				<h2>5. Privacy Policy</h2>
				<p>
					Your use of our service is also governed by our Privacy
					Policy. Please review our Privacy Policy which also governs
					the service and informs users of our data collection
					practices.
				</p>

				<h2>6. Termination</h2>
				<p>
					We may terminate or suspend your account immediately,
					without prior notice, for conduct that we determine violates
					these Terms or is harmful to other users, us, or third
					parties, or for any other reason.
				</p>

				<h2>7. Changes to Terms</h2>
				<p>
					We reserve the right to modify or replace these Terms at any
					time. If a revision is material, we will try to provide at
					least 30 days' notice prior to any new terms taking effect.
				</p>

				<h2>8. Contact Us</h2>
				<p>
					If you have any questions about these Terms, please contact
					us.
				</p>
			</>
		),
		ar: (
			<>
				<h2>الشروط والأحكام</h2>
				<p>
					مرحبًا بك في خدمتنا. من خلال الوصول إلى خدمتنا أو استخدامها،
					فإنك توافق على الالتزام بهذه الشروط والأحكام.
				</p>

				<h2>1. قبول الشروط</h2>
				<p>
					من خلال الوصول إلى خدمتنا أو استخدامها، فإنك توافق على
					الالتزام بهذه الشروط. إذا كنت لا توافق على أي جزء من الشروط،
					فلا يجوز لك الوصول إلى الخدمة.
				</p>

				<h2>2. استخدام الخدمة</h2>
				<p>
					يتم تقديم خدمتنا على أساس "كما هي" و "كما هو متاح". نحن لا
					نضمن أن الخدمة ستكون غير منقطعة أو آمنة أو خالية من الأخطاء.
				</p>

				<h2>3. تسجيل الحساب</h2>
				<p>
					للوصول إلى ميزات معينة من الخدمة، قد يُطلب منك التسجيل
					للحصول على حساب. يجب عليك تقديم معلومات دقيقة والحفاظ على
					أمان حسابك.
				</p>

				<h2>4. سلوك المستخدم</h2>
				<p>أنت توافق على عدم:</p>
				<ul>
					<li>استخدام الخدمة بأي طريقة تنتهك القوانين المعمول بها</li>
					<li>نشر محتوى غير مصرح به</li>
					<li>محاولة التدخل في الأداء السليم للخدمة</li>
					<li>عمل نسخ غير مصرح بها من المحتوى من الخدمة</li>
				</ul>

				<h2>5. سياسة الخصوصية</h2>
				<p>
					يخضع استخدامك لخدمتنا أيضًا لسياسة الخصوصية الخاصة بنا. يرجى
					مراجعة سياسة الخصوصية الخاصة بنا التي تحكم أيضًا الخدمة
					وتُعلم المستخدمين بممارسات جمع البيانات لدينا.
				</p>

				<h2>6. الإنهاء</h2>
				<p>
					يجوز لنا إنهاء أو تعليق حسابك فورًا، دون إشعار مسبق، للسلوك
					الذي نقرر أنه ينتهك هذه الشروط أو يضر بالمستخدمين الآخرين أو
					بنا أو بأطراف ثالثة، أو لأي سبب آخر.
				</p>

				<h2>7. التغييرات في الشروط</h2>
				<p>
					نحتفظ بالحق في تعديل أو استبدال هذه الشروط في أي وقت. إذا
					كان التعديل جوهريًا، فسنحاول تقديم إشعار قبل 30 يومًا على
					الأقل من دخول أي شروط جديدة حيز التنفيذ.
				</p>

				<h2>8. اتصل بنا</h2>
				<p>إذا كان لديك أي أسئلة حول هذه الشروط، يرجى الاتصال بنا.</p>
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
				{content[languageCode] || content["en"]}{" "}
				{/* Default to English if language not found */}
			</div>
		</LegalPageLayout>
	);
};

export default TermsConditions;
