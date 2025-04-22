import { useParams } from "react-router-dom";
import LegalPageLayout from "../../components/LegalPageLayout/LegalPageLayout";
import styles from "./Legal.module.scss";

const PrivacyPolicy = () => {
	const { languageCode } = useParams();

	// Content based on language
	const content = {
		en: (
			<>
				<h2>Privacy Policy</h2>
				<p>
					This Privacy Policy describes how we collect, use, and share
					your personal information when you use our service.
				</p>

				<h2>1. Information We Collect</h2>
				<p>
					We may collect several different types of information for
					various purposes to provide and improve our service to you:
				</p>
				<ul>
					<li>
						<strong>Personal Data:</strong> While using our service,
						we may ask you to provide us with certain personally
						identifiable information that can be used to contact or
						identify you.
					</li>
					<li>
						<strong>Usage Data:</strong> We may also collect
						information on how the service is accessed and used.
					</li>
					<li>
						<strong>Cookies Data:</strong> We use cookies and
						similar tracking technologies to track activity on our
						service.
					</li>
				</ul>

				<h2>2. Use of Data</h2>
				<p>We use the collected data for various purposes:</p>
				<ul>
					<li>To provide and maintain our service</li>
					<li>To notify you about changes to our service</li>
					<li>To provide customer support</li>
					<li>
						To gather analysis or valuable information so that we
						can improve our service
					</li>
					<li>To monitor the usage of our service</li>
					<li>To detect, prevent and address technical issues</li>
				</ul>

				<h2>3. Transfer of Data</h2>
				<p>
					Your information, including Personal Data, may be
					transferred to — and maintained on — computers located
					outside of your state, province, country or other
					governmental jurisdiction where data protection laws may
					differ.
				</p>

				<h2>4. Disclosure of Data</h2>
				<p>
					We may disclose your Personal Data in the good faith belief
					that such action is necessary to:
				</p>
				<ul>
					<li>Comply with a legal obligation</li>
					<li>Protect and defend our rights or property</li>
					<li>
						Prevent or investigate possible wrongdoing in connection
						with the service
					</li>
					<li>
						Protect the personal safety of users of the service or
						the public
					</li>
					<li>Protect against legal liability</li>
				</ul>

				<h2>5. Security of Data</h2>
				<p>
					The security of your data is important to us, but remember
					that no method of transmission over the Internet, or method
					of electronic storage is 100% secure.
				</p>

				<h2>6. Your Rights</h2>
				<p>
					You have certain data protection rights. You may update,
					correct, or delete your Personal Data by contacting us.
				</p>

				<h2>7. Changes to This Privacy Policy</h2>
				<p>
					We may update our Privacy Policy from time to time. We will
					notify you of any changes by posting the new Privacy Policy
					on this page.
				</p>

				<h2>8. Contact Us</h2>
				<p>
					If you have any questions about this Privacy Policy, please
					contact us.
				</p>
			</>
		),
		ar: (
			<>
				<h2>سياسة الخصوصية</h2>
				<p>
					تصف سياسة الخصوصية هذه كيفية جمع معلوماتك الشخصية واستخدامها
					ومشاركتها عند استخدامك لخدمتنا.
				</p>

				<h2>1. المعلومات التي نجمعها</h2>
				<p>
					قد نجمع عدة أنواع مختلفة من المعلومات لأغراض مختلفة لتوفير
					خدمتنا وتحسينها لك:
				</p>
				<ul>
					<li>
						<strong>البيانات الشخصية:</strong> أثناء استخدام خدمتنا،
						قد نطلب منك تزويدنا بمعلومات تعريف شخصية معينة يمكن
						استخدامها للاتصال بك أو تحديد هويتك.
					</li>
					<li>
						<strong>بيانات الاستخدام:</strong> قد نجمع أيضًا معلومات
						حول كيفية الوصول إلى الخدمة واستخدامها.
					</li>
					<li>
						<strong>بيانات ملفات تعريف الارتباط:</strong> نستخدم
						ملفات تعريف الارتباط وتقنيات التتبع المماثلة لتتبع
						النشاط على خدمتنا.
					</li>
				</ul>

				<h2>2. استخدام البيانات</h2>
				<p>نستخدم البيانات التي تم جمعها لأغراض مختلفة:</p>
				<ul>
					<li>لتوفير خدمتنا والحفاظ عليها</li>
					<li>لإخطارك بالتغييرات في خدمتنا</li>
					<li>لتوفير دعم العملاء</li>
					<li>
						لجمع التحليلات أو المعلومات القيمة حتى نتمكن من تحسين
						خدمتنا
					</li>
					<li>لمراقبة استخدام خدمتنا</li>
					<li>لاكتشاف المشكلات الفنية ومنعها ومعالجتها</li>
				</ul>

				<h2>3. نقل البيانات</h2>
				<p>
					قد يتم نقل معلوماتك، بما في ذلك البيانات الشخصية، إلى أجهزة
					كمبيوتر موجودة خارج ولايتك أو مقاطعتك أو بلدك أو ولاية
					قضائية حكومية أخرى حيث قد تختلف قوانين حماية البيانات.
				</p>

				<h2>4. الكشف عن البيانات</h2>
				<p>
					قد نكشف عن بياناتك الشخصية بحسن نية بأن مثل هذا الإجراء
					ضروري لـ:
				</p>
				<ul>
					<li>الامتثال للالتزام القانوني</li>
					<li>حماية حقوقنا أو ممتلكاتنا والدفاع عنها</li>
					<li>
						منع أو التحقيق في المخالفات المحتملة فيما يتعلق بالخدمة
					</li>
					<li>حماية السلامة الشخصية لمستخدمي الخدمة أو الجمهور</li>
					<li>الحماية من المسؤولية القانونية</li>
				</ul>

				<h2>5. أمان البيانات</h2>
				<p>
					أمان بياناتك مهم بالنسبة لنا، ولكن تذكر أنه لا توجد طريقة
					نقل عبر الإنترنت، أو طريقة تخزين إلكتروني آمنة بنسبة 100٪.
				</p>

				<h2>6. حقوقك</h2>
				<p>
					لديك حقوق معينة لحماية البيانات. يمكنك تحديث بياناتك الشخصية
					أو تصحيحها أو حذفها عن طريق الاتصال بنا.
				</p>

				<h2>7. التغييرات في سياسة الخصوصية هذه</h2>
				<p>
					قد نقوم بتحديث سياسة الخصوصية الخاصة بنا من وقت لآخر. سنخطرك
					بأي تغييرات من خلال نشر سياسة الخصوصية الجديدة على هذه
					الصفحة.
				</p>

				<h2>8. اتصل بنا</h2>
				<p>
					إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، فيرجى الاتصال
					بنا.
				</p>
			</>
		),
	};

	return (
		<LegalPageLayout
			title={languageCode === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
		>
			<div className={styles.legalContent}>
				{content[languageCode] || content["en"]}{" "}
				{/* Default to English if language not found */}
			</div>
		</LegalPageLayout>
	);
};

export default PrivacyPolicy;
