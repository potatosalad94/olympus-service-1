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
                    This Privacy Policy sets out the ways in which we, Olympus
                    Digital, collect and manage personal data through the
                    service UAE E1 and associated direct carrier billing payment
                    processing (the "Service"), with whom it may be shared and
                    your rights and choices in how your data is used.
                </p>

                <h2>Personal Data We Collect</h2>
                <p>
                    The personal data we collect about you is solely used for
                    and necessary to provide the Service.
                </p>
                <p>We will collect some or all of the following information:</p>
                <ul>
                    <li>
                        Your mobile number (which may be automatically requested
                        from your network operator if you choose network
                        operator billing)
                    </li>
                    <li>
                        Information about your browser and/or device and other
                        attached metadata, including language and locale
                        settings
                    </li>
                    <li>
                        Mobile network operator or network connection
                        identifiers
                    </li>
                    <li>Billing amount, product description, and merchant</li>
                </ul>

                <p>Depending on the type of service, we may also collect:</p>
                <ul>
                    <li>Contact telephone number(s)</li>
                    <li>
                        Your full name (if provided voluntarily during support
                        inquiries)
                    </li>
                </ul>

                <p>
                    If you are a customer, your mobile network operator may have
                    passed some or all of the above data to us. We hold this
                    data securely and use it solely in accordance with this
                    Privacy Policy.
                </p>

                <p>
                    When we conduct fraud monitoring, prevention, and detection
                    activities, we may also receive Personal Data about you from
                    our business partners, financial service providers, identity
                    verification services, and publicly available sources as
                    necessary to confirm your identity and prevent fraud. Our
                    fraud monitoring, detection, and prevention services may use
                    technology that helps us assess the risk associated with a
                    transaction attempt on the merchant's website or
                    application.
                </p>

                <h2>
                    Technical Data Collection for Security and Fraud Prevention
                </h2>
                <p>
                    To protect our service from abuse and fraud (such as fake
                    form submissions, automated scripts, or malicious behavior),
                    we collect limited technical data from your device when you
                    visit our website.
                </p>
                <p>This includes:</p>
                <ul>
                    <li>Screen resolution</li>
                    <li>Browser language setting</li>
                    <li>Device platform and memory</li>
                </ul>
                <p>
                    This information is collected solely for fraud prevention
                    and technical diagnostics, and is not used to identify you
                    personally, track your behavior, or personalize ads. We do
                    not use this information for marketing or profiling
                    purposes, and we do not share it with advertisers or
                    third-party analytics services.
                </p>

                <h2>How We Use Personal Data</h2>
                <p>
                    Olympus Digital is committed to ensuring the information we
                    obtain and use about you is processed in accordance with its
                    intended purpose.
                </p>

                <p>The ways we use your information are;</p>
                <ul>
                    <li>Authenticating and processing your transactions</li>
                    <li>
                        Sending electronic communications to you as part of the
                        service
                    </li>
                    <li>
                        Restricting access to services in the event of
                        cancellation of recurring payments
                    </li>
                    <li>Combatting and preventing fraud</li>
                    <li>
                        Processing and responding to any Customer support
                        enquires you make
                    </li>
                    <li>
                        Managing and understanding our ongoing relationship with
                        you
                    </li>
                </ul>

                <p>
                    All of the information that we process about you is done on
                    the basis of one or more of the following;
                </p>
                <ul>
                    <li>
                        Consent provided by you for us to process your data for
                        a specific purpose;
                    </li>
                    <li>For the provision of the Service to you;</li>
                    <li>
                        To comply with legal obligations that we are subject to;
                        and / or
                    </li>
                    <li>
                        For purposes which are in our legitimate interests, or
                        those of third parties.
                    </li>
                </ul>

                <p>
                    <strong>
                        We will never offer your personal information for sale.
                    </strong>
                </p>

                <h2>How We Disclose Personal Data</h2>
                <p>
                    Olympus Digital shares personal data for a variety of
                    reasons however we will not sell, rent, or lease your
                    personal information. We may however share the information
                    you share with us with the following parties: mobile network
                    operators with whom you have a contractual relationship; our
                    employees, contractors, agents and advisors, and with law
                    enforcement and public authorities as required by applicable
                    laws and regulations. Where we share your personal
                    information with the third parties listed above, we require
                    that such third parties manage and process your personal
                    information on terms which provide safeguards for your
                    privacy and the confidentiality of your information no less
                    stringent than the requirements of this Policy.
                </p>

                <h2>Your Rights</h2>
                <p>
                    In this Section, we have summarised the rights that you have
                    under data protection law. Some of the rights are complex,
                    and not all of the details have been included in our
                    summaries. Accordingly, you should read the relevant laws
                    and guidance from the regulatory authorities for a full
                    explanation of these rights.
                </p>

                <p>Your principal rights under data protection law are:</p>
                <ul>
                    <li>The right to access;</li>
                    <li>The right to rectification;</li>
                    <li>The right to erasure;</li>
                    <li>The right to restrict processing;</li>
                    <li>The right to object to processing;</li>
                    <li>The right to data portability;</li>
                    <li>
                        The right to complain to a supervisory authority; and
                    </li>
                    <li>The right to withdraw consent.</li>
                </ul>

                <p>
                    You have the right to confirmation whether we process your
                    personal data and, where we do, access to the personal data
                    together with certain additional information including
                    details of the purposes of the processing, the categories of
                    personal data concerned and the recipients of the personal
                    data. Providing the rights and freedoms of others are not
                    affected, we will supply to you a copy of your personal
                    data. The first copy will be provided free of charge, but
                    additional copies may be subject to a reasonable fee. You
                    can access your personal data by emailing us at
                    support@uae-e1prime.tv
                </p>

                <p>
                    You have the right to have any inaccurate personal data
                    about you rectified and, taking into account the purposes of
                    the processing, to have any incomplete personal data about
                    you completed.
                </p>

                <p>
                    In some circumstances you have the right to the erasure of
                    your personal data without undue delay. Those circumstances
                    include: the personal data are no longer necessary in
                    relation to the purposes for which they were collected or
                    otherwise processed; you withdraw consent to consent-based
                    processing; you object to the processing under certain rules
                    of applicable data protection law; the processing is for
                    direct marketing purposes; and the personal data have been
                    unlawfully processed. However, there are exclusions of the
                    right to erasure. The general exclusions include where
                    processing is necessary: for exercising the right of freedom
                    of expression and information; for compliance with a legal
                    obligation; or for the establishment, exercise or defence of
                    legal claims.
                </p>

                <p>
                    In some circumstances you have the right to restrict the
                    processing of your personal data. Those circumstances are:
                    you contest the accuracy of the personal data; processing is
                    unlawful but you oppose erasure; we no longer need the
                    personal data for the purposes of our processing, but you
                    require personal data for the establishment, exercise or
                    defence of legal claims; and you have objected to
                    processing, pending the verification of that objection.
                    Where processing has been restricted on this basis, we may
                    continue to store your personal data. However, we will only
                    otherwise process it: with your consent; for the
                    establishment, exercise or defence of legal claims; for the
                    protection of the rights of another natural or legal person;
                    or for reasons of important public interest.
                </p>

                <p>
                    You have the right to object to our processing of your
                    personal data on grounds relating to your particular
                    situation, but only to the extent that the legal basis for
                    the processing is that the processing is necessary for: the
                    performance of a task carried out in the public interest or
                    in the exercise of any official authority vested in us; or
                    the purposes of the legitimate interests pursued by us or by
                    a third party. If you make such an objection, we will cease
                    to process the personal information unless we can
                    demonstrate compelling legitimate grounds for the processing
                    which override your interests, rights and freedoms, or the
                    processing is for the establishment, exercise or defence of
                    legal claims.
                </p>

                <p>
                    To the extent that the legal basis for our processing of
                    your personal data is (a) Consent; or (b) that the
                    processing is necessary for the performance of the Service
                    with you or in order to take steps at your request prior to
                    commencing the Service; and such processing is carried out
                    by automated means, you have the right to receive your
                    personal data from us in a structured, commonly used and
                    machine-readable format. However, this right does not apply
                    where it would adversely affect the rights and freedoms of
                    others.
                </p>

                <p>
                    If you consider that our processing of your personal
                    information infringes data protection laws, you have a legal
                    right to lodge a complaint with a supervisory authority
                    responsible for data protection. If you are in the EU or UK
                    you may do so in the EU member state of your habitual
                    residence, your place of work or the place of the alleged
                    infringement. Otherwise you may do so with the data
                    protection supervisory authority in your jurisdiction.
                </p>

                <p>
                    To the extent that the legal basis for our processing of
                    your personal information is consent, you have the right to
                    withdraw that consent at any time. Withdrawal will not
                    affect the lawfulness of processing before the withdrawal.
                </p>

                <p>
                    You may exercise any of your rights in relation to your
                    personal data by written notice to us via email to
                    support@uae-e1prime.tv or via post to{" "}
                    <strong>
                        Data Protection Officer, Olympus Digital PO Box 342001,
                        Dubai, United Arab Emirates
                    </strong>
                    .
                </p>

                <h2>Security and Retention</h2>
                <p>
                    The specific period for which Olympus Digital is required to
                    retain personal data depends on the nature of the data held
                    and the context in which it is held. It is also driven by
                    legal, regulatory and contractual obligations. Olympus
                    Digital will always retain data for the minimum period
                    necessary. Olympus Digital maintains a comprehensive list of
                    retention periods according to data category and has
                    technical and organisational systems and procedures
                    implemented to enforce these.
                </p>

                <h2>International Data Transfers</h2>
                <p>
                    Olympus Digital is a company operating in multiple
                    jurisdictions around the world. As described in this Privacy
                    Policy, we may share your information with third parties
                    which may require us to export your information described in
                    this Privacy Policy across national boundaries. If this
                    occurs such data transfers shall be made in compliance with
                    local data protection laws which may include either
                    transfers to countries on an approved list of safe
                    destinations, or where Olympus Digital has ensured
                    appropriate safeguards with such third parties for the
                    transfer of your personal information in compliance with
                    such organisational and technological safeguards as are
                    necessary to protect your privacy.
                </p>

                <h2>Use by Minors</h2>
                <p>
                    We work with our merchants and supplier partners using best
                    endeavours to ensure that children's personal data is
                    protected and is not collected or processed. If you believe
                    that Olympus Digital is holding or processing a child's
                    personal data, please contact us immediately by emailing
                    Olympus Digital
                </p>

                <h2>Updates To this Privacy Policy and Notifications</h2>
                <p>
                    We may change this Privacy Policy from time to time to
                    reflect new services, changes in our Personal Data practices
                    or relevant laws. We will post changes to this Privacy
                    Policy on our website and other places we deem appropriate.
                </p>

                <h2>Links To Other Websites, Products or Services</h2>
                <p>
                    The Services may also provide the ability to connect to
                    other websites. These websites may operate independently
                    from us and may have their own privacy notices or policies,
                    which we strongly suggest you review. If any linked website
                    is not owned or controlled by us, we are not responsible for
                    its content, any use of the website or the privacy practices
                    of the operator of the website.
                </p>

                <h2>Cookies Policy</h2>
                <p>
                    A "cookie" is a small file containing a string of characters
                    that is sent to your computer when you visit a website.
                </p>

                <p>
                    Olympus Digital uses cookies to operate our services; some
                    cookies are essential to the operation of our services and
                    websites to authenticate you on any of our websites, to help
                    use detect and prevent fraud and to deliver service and
                    website features and settings.
                </p>

                <p>
                    Olympus Digital also uses cookies to improve our services by
                    providing insights on how customers use our websites. These
                    cookies will not include personally identifiable
                    information.
                </p>

                <p>
                    We also use third party analytics including but not limited
                    to Google Analytics to collect and analyse information about
                    the use of our services and website. More information about
                    how Google Analytics will capture and use this information
                    can be found on the Google Website.
                </p>

                <p>
                    You may opt out of non-essential cookies by choosing the
                    opt-out option displayed when you use one of our websites
                    (which will always be displayed when non-essential cookies
                    are used). Alternatively you can change your web browser
                    settings to reject all cookies, however please note that if
                    you choose to disable cookies in your web browser some or
                    all of our services may not operate as intended. We have
                    included below links to common browsers' instructions for
                    disabling cookies:
                </p>

                <ul>
                    <li>
                        <a href="https://support.google.com/chrome/answer/95647?hl=en">
                            Chrome
                        </a>
                    </li>
                    <li>
                        <a href="https://support.microsoft.com/en-us/products/windows?os=windows-10">
                            Explorer
                        </a>
                    </li>
                    <li>
                        <a href="https://support.apple.com/en-gb/HT201265">
                            Safari
                        </a>
                    </li>
                    <li>
                        <a href="https://support.mozilla.org/en-US/kb/block-websites-storing-cookies-site-data-firefox">
                            Firefox
                        </a>
                    </li>
                    <li>
                        <a href="http://www.opera.com/help/tutorials/security/cookies/">
                            Opera
                        </a>
                    </li>
                </ul>

                <h2>Sub-processors</h2>
                <p>
                    Olympus Digital uses a limited number of third party service
                    providers to assist us with data processing activities. When
                    we work with these service providers in our capacity as a
                    data processor, the third-party service provider is a
                    sub-processor of Olympus Digital ("Sub-processor").
                </p>

                <p>
                    Before engaging any Sub-processor, we perform extensive due
                    diligence, including detailed security and legal analysis.
                    We do not engage a Sub-processor unless our quality
                    standards are met. Our Sub-processors are all subject to
                    contract terms that enforce compliance with applicable data
                    protection laws.
                </p>
            </>
        ),
        ar: (
            <>
                <h2>سياسة الخصوصية</h2>
                <p>
                    تحدد سياسة الخصوصية هذه الطرق التي من خلالها تقوم شركة
                    Olympus Digital بجمع وإدارة البيانات الشخصية من خلال خدمة
                    UAE E1 ومعالجة الدفع المباشر عبر مزودي خدمات الاتصالات
                    (يُشار إليها فيما بعد بـ "الخدمة")، والجهات التي قد تُشارك
                    معها هذه البيانات، وحقوقك وخياراتك في كيفية استخدام بياناتك.
                </p>

                <h2>البيانات الشخصية التي نقوم بجمعها</h2>
                <p>
                    يتم جمع البيانات الشخصية الخاصة بك فقط لغرض تقديم الخدمة،
                    وهي ضرورية لهذا الغرض.
                </p>
                <p>قد نقوم بجمع بعض أو جميع المعلومات التالية:</p>
                <ul>
                    <li>
                        رقم هاتفك المحمول (وقد يتم طلبه تلقائيًا من مشغل شبكة
                        الهاتف إذا اخترت الدفع عن طريق مشغل الشبكة)
                    </li>
                    <li>
                        معلومات حول المتصفح و/أو الجهاز الخاص بك، بما في ذلك
                        إعدادات اللغة والمنطقة
                    </li>
                    <li>مشغل شبكة الهاتف المحمول أو معرفات اتصال الشبكة</li>
                    <li>قيمة الفاتورة، وصف المنتج، والتاجر</li>
                </ul>

                <p>اعتمادًا على نوع الخدمة، قد نقوم أيضًا بجمع ما يلي:</p>
                <ul>
                    <li>رقم الهاتف للتواصل</li>
                    <li>
                        اسمك الكامل (إذا تم تقديمه طوعًا عند التواصل مع الدعم
                        الفني)
                    </li>
                </ul>

                <p>
                    إذا كنت عميلاً، فقد يكون مشغل شبكة الهاتف الخاص بك قد زودنا
                    ببعض أو كل البيانات المذكورة أعلاه. نحن نحتفظ بهذه البيانات
                    بشكل آمن ونستخدمها فقط وفقًا لما هو مذكور في سياسة الخصوصية
                    هذه.
                </p>

                <p>
                    عند تنفيذ أنشطة مراقبة الاحتيال، والوقاية منه، والكشف عنه،
                    قد نتلقى أيضًا بيانات شخصية عنك من شركائنا التجاريين، ومزودي
                    الخدمات المالية، وخدمات التحقق من الهوية، والمصادر العامة
                    المتاحة، وذلك للتحقق من هويتك ومنع الاحتيال. قد تستخدم
                    خدماتنا الخاصة بالكشف عن الاحتيال تقنيات تساعدنا في تقييم
                    المخاطر المرتبطة بمحاولة إجراء معاملة على موقع التاجر أو
                    التطبيق.
                </p>

                <h2>جمع البيانات الفنية لأغراض الحماية والكشف عن الاحتيال</h2>
                <p>
                    من أجل حماية خدماتنا من الإساءة أو الاحتيال (مثل إرسال
                    النماذج المزيفة، أو السكربتات الآلية، أو السلوك الضار)، نقوم
                    بجمع بيانات فنية محدودة من جهازك عند زيارتك لموقعنا.
                </p>
                <p>تشمل هذه البيانات:</p>
                <ul>
                    <li>دقة الشاشة</li>
                    <li>إعدادات لغة المتصفح</li>
                    <li>منصة الجهاز</li>
                    <li>مقدار الذاكرة المتاحة للجهاز</li>
                </ul>
                <p>
                    يتم جمع هذه المعلومات حصريًا لأغراض الوقاية من الاحتيال
                    والتشخيص الفني، ولا تُستخدم لتحديد هويتك أو تتبع سلوكك أو
                    تخصيص الإعلانات. نحن لا نستخدم هذه البيانات لأغراض تسويقية
                    أو لإنشاء ملفات تعريفية، ولا نشاركها مع المعلنين أو خدمات
                    التحليل الخارجية.
                </p>

                <h2>كيفية استخدام البيانات الشخصية</h2>
                <p>
                    تلتزم Olympus Digital بضمان أن تتم معالجة المعلومات التي
                    نحصل عليها عنك واستخدامها وفقًا للغرض المقصود منها.
                </p>

                <p>نستخدم معلوماتك للأغراض التالية:</p>
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

                <h2>متى نشارك البيانات الشخصية</h2>
                <p>
                    تشارك Olympus Digital البيانات الشخصية لأسباب متعددة، لكننا
                    لا نبيع أو نؤجر أو نمنح ترخيصًا باستخدام بياناتك. ومع ذلك،
                    قد نشارك بياناتك مع:
                </p>
                <ul>
                    <li>
                        مزودي خدمة الهاتف المحمول الذين تربطك بهم علاقة تعاقدية
                    </li>
                    <li>موظفينا، المتعاقدين، المستشارين والوكلاء</li>
                    <li>
                        الجهات الرسمية والسلطات القانونية عند الضرورة بموجب
                        القانون
                    </li>
                </ul>

                <p>
                    نطلب من جميع الأطراف التي نتشارك معها البيانات أن تلتزم
                    بسياسة الخصوصية هذه أو ما يعادلها في الحماية.
                </p>

                <h2>حقوقك</h2>
                <p>بموجب قانون حماية البيانات، لديك الحقوق التالية:</p>
                <ul>
                    <li>الحق في الوصول إلى بياناتك</li>
                    <li>الحق في تصحيح البيانات غير الدقيقة</li>
                    <li>الحق في حذف البيانات</li>
                    <li>الحق في تقييد المعالجة</li>
                    <li>الحق في الاعتراض على المعالجة</li>
                    <li>الحق في نقل البيانات</li>
                    <li>الحق في تقديم شكوى لهيئة رقابية</li>
                    <li>الحق في سحب الموافقة</li>
                </ul>

                <p>
                    لديك الحق في طلب نسخة من بياناتك الشخصية (أول نسخة مجانية)،
                    أو تصحيحها، أو حذفها في بعض الحالات، أو الاعتراض على
                    معالجتها. يمكنك التواصل معنا عبر البريد الإلكتروني: 📧
                    support@uae-e1prime.tv أو عن طريق البريد إلى مسؤول حماية
                    البيانات:
                    <strong>
                        Olympus Digital, صندوق بريد 342001، دبي، الإمارات
                        العربية المتحدة.
                    </strong>
                </p>

                <h2>الأمان وفترة الاحتفاظ بالبيانات</h2>
                <p>
                    نحتفظ بالبيانات فقط للمدة اللازمة والمحددة قانونًا
                    وتنظيميًا. لدينا أنظمة وإجراءات فنية وتنظيمية لضمان ذلك.
                </p>

                <h2>نقل البيانات دوليًا</h2>
                <p>
                    تعمل Olympus Digital في عدة دول، وقد يتم نقل بياناتك خارج
                    الإمارات. نقوم بذلك وفقًا للقوانين المحلية وباستخدام آليات
                    حماية مناسبة.
                </p>

                <h2>استخدام الخدمة من قبل القُصَّر</h2>
                <p>
                    نبذل كل الجهود اللازمة لضمان عدم جمع أو معالجة بيانات
                    الأطفال. إذا كنت تعتقد أننا نحتفظ ببيانات لطفل، يرجى التواصل
                    معنا فورًا عبر البريد الإلكتروني.
                </p>

                <h2>التحديثات والإشعارات</h2>
                <p>
                    قد نقوم بتحديث هذه السياسة من حين لآخر وسنقوم بنشر التعديلات
                    على موقعنا.
                </p>

                <h2>روابط لمواقع وخدمات أخرى</h2>
                <p>
                    قد تحتوي الخدمة على روابط لمواقع خارجية لا تخضع لسيطرتنا.
                    لسنا مسؤولين عن سياسات الخصوصية أو المحتوى الخاص بها.
                </p>

                <h2>سياسة ملفات تعريف الارتباط (Cookies)</h2>
                <p>
                    نستخدم ملفات تعريف الارتباط لتشغيل وتحسين خدماتنا. بعض ملفات
                    تعريف الارتباط ضرورية للتحقق من الهوية، الكشف عن الاحتيال،
                    وتخصيص تجربتك. لا تحتوي ملفات تعريف الارتباط على معلومات
                    تعريف شخصية.
                </p>

                <p>
                    نستخدم أيضًا أدوات تحليل مثل Google Analytics. يمكنك رفض
                    ملفات تعريف الارتباط غير الأساسية من خلال خيارات الإعداد عند
                    زيارة الموقع أو من خلال إعدادات المتصفح.
                </p>

                <p>روابط إعدادات المتصفحات لتعطيل الكوكيز:</p>
                <ul>
                    <li>
                        <a href="https://support.google.com/chrome/answer/95647?hl=ar">
                            Chrome
                        </a>
                    </li>
                    <li>
                        <a href="https://support.microsoft.com/ar-sa/products/windows?os=windows-10">
                            Explorer
                        </a>
                    </li>
                    <li>
                        <a href="https://support.apple.com/ar-ae/HT201265">
                            Safari
                        </a>
                    </li>
                    <li>
                        <a href="https://support.mozilla.org/ar/kb/">Firefox</a>
                    </li>
                    <li>
                        <a href="http://www.opera.com/help/tutorials/security/cookies/">
                            Opera
                        </a>
                    </li>
                </ul>

                <h2>المعالجات الفرعية</h2>
                <p>
                    نستخدم عددًا محدودًا من مقدمي الخدمات الخارجيين (المعالجات
                    الفرعية) للمساعدة في معالجة البيانات. لا نعمل مع أي معالج
                    فرعي دون التحقق من توافقه مع معايير الأمان والقانون
                    المطلوبة.
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
