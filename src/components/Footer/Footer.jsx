import { languages } from "@/utils/languages-dictionnary";
import styles from "./Footer.module.scss";
import e1Hero from "@images/Hero.png";
import inside1 from "@images/Inside_1.png";
import inside2 from "@images/Inside_2.png";
import inside3 from "@images/Inside_3.png";
import champ1 from "@images/Champ_1.png";
import champ2 from "@images/Champ_2.png";
import champ3 from "@images/Champ_3.png";

const Footer = ({ content, additionalInformation, lang }) => {
    if (!content && !additionalInformation) return null;

    const renderContent = () => {
        if (!content) return null;

        return content.map((block, blockIndex) => {
            const contentSection = block.content;
            const bulletPoints = block.bulletPoints || [];

            return (
                <div key={blockIndex} className={styles.contentBlock}>
                    {/* Render the content section */}
                    {typeof contentSection === "string" ? (
                        <p>{contentSection}</p>
                    ) : contentSection ? (
                        <p>
                            {contentSection.text_before &&
                                contentSection.text_before}
                            {contentSection.link_url &&
                                contentSection.link_text && (
                                    <a
                                        href={contentSection.link_url}
                                        className={styles.link}
                                    >
                                        {contentSection.link_text}
                                    </a>
                                )}
                            {contentSection.text_after &&
                                contentSection.text_after}
                        </p>
                    ) : null}

                    {/* Render bulletpoints if they exist */}
                    {bulletPoints.length > 0 && (
                        <ul className={styles.bulletList}>
                            {bulletPoints.map((bulletPoint, bulletIndex) => (
                                <li
                                    key={bulletIndex}
                                    className={styles.bulletItem}
                                >
                                    {typeof bulletPoint === "string" ? (
                                        bulletPoint
                                    ) : Array.isArray(bulletPoint) ? (
                                        <span
                                            className={styles.inlineBulletItems}
                                        >
                                            {bulletPoint.map(
                                                (subItem, subIndex) => (
                                                    <span key={subIndex}>
                                                        {subIndex > 0 && " "}
                                                        {typeof subItem ===
                                                        "string" ? (
                                                            subItem
                                                        ) : (
                                                            <>
                                                                {subItem.text_before &&
                                                                    subItem.text_before}
                                                                {subItem.link_url &&
                                                                    subItem.link_text && (
                                                                        <a
                                                                            href={
                                                                                subItem.link_url
                                                                            }
                                                                            className={
                                                                                styles.link
                                                                            }
                                                                        >
                                                                            {
                                                                                subItem.link_text
                                                                            }
                                                                        </a>
                                                                    )}
                                                                {subItem.text_after &&
                                                                    subItem.text_after}
                                                            </>
                                                        )}
                                                    </span>
                                                )
                                            )}
                                        </span>
                                    ) : (
                                        <>
                                            {bulletPoint.text_before &&
                                                bulletPoint.text_before}
                                            {bulletPoint.link_url &&
                                                bulletPoint.link_text && (
                                                    <a
                                                        href={
                                                            bulletPoint.link_url
                                                        }
                                                        className={styles.link}
                                                    >
                                                        {bulletPoint.link_text}
                                                    </a>
                                                )}
                                            {bulletPoint.text_after &&
                                                bulletPoint.text_after}
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            );
        });
    };

    return (
        <div
            className={styles.container}
            style={{
                direction: lang?.code === languages.arabic ? "rtl" : "ltr",
            }}
        >
            {renderContent()}
            {additionalInformation && (
                <div className={styles.additionalInformationContainer}>
                    {lang?.code === languages.arabic ? (
                        <>
                            {/* Hero Section - Arabic */}
                            <section className={styles.textCenter}>
                                <h1 className={styles.heroTitle}>
                                    مرحبًا بكم في الإمارات E1 Prime
                                </h1>
                                <img
                                    src={e1Hero}
                                    alt="قوارب سباق E1"
                                    className={styles.heroImage}
                                />
                                <p className={styles.highlightText}>
                                    اكتشفوا E1، أول بطولة قوارب كهربائية بالكامل
                                    في العالم
                                </p>
                                <p className={styles.paragraph}>
                                    تم تأسيس هذه البطولة لإنشاء منصة سباقات
                                    مائية تنافسية ومثيرة تعتمد على التكنولوجيا
                                    الكهربائية لحماية مياهنا وسواحلنا وترميمها،
                                    حيث ستشارك ما يصل إلى 12 فريقًا و24 طيارًا
                                    في مدن أيقونية حول العالم.
                                </p>
                            </section>

                            {/* Inside E1 Section - Arabic */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>
                                    ماذا يوجد في الإمارات E1 Prime
                                </h2>
                                <h3 className={styles.subTitle}>داخل E1</h3>
                                <div
                                    className={`${styles.grid} ${styles.gridCols1} ${styles.gridCols2} ${styles.gridCols3}`}
                                >
                                    <div>
                                        <img
                                            src={inside1}
                                            alt="الحلقة 3"
                                            className={styles.imageThumbSmall}
                                        />
                                    </div>
                                    <div>
                                        <img
                                            src={inside2}
                                            alt="الحلقة 2"
                                            className={styles.imageThumbSmall}
                                        />
                                    </div>
                                    <div>
                                        <img
                                            src={inside3}
                                            alt="الحلقة 1"
                                            className={styles.imageThumbSmall}
                                        />
                                    </div>
                                </div>
                                <p className={styles.highlightText}>
                                    انطلقوا في مغامرة مع الفريق للبحث عن مواقع
                                    السباق في بعض من أشهر مدن العالم.
                                </p>
                            </section>

                            {/* Champions Section - Arabic */}
                            <section className={styles.section}>
                                <h3 className={styles.subTitle}>أبطال الماء</h3>
                                <p className={styles.highlightText}>
                                    تعرفوا على القصص الكاملة وراء الكواليس لأول
                                    بطولة قوارب كهربائية بالكامل في العالم.
                                </p>
                                <div
                                    className={`${styles.grid} ${styles.gridCols1} ${styles.gridCols2} ${styles.gridCols3}`}
                                >
                                    <div>
                                        <img
                                            src={champ3}
                                            alt="أبطال الحلقة 3"
                                            className={styles.imageThumbSmall}
                                        />
                                    </div>
                                    <div>
                                        <img
                                            src={champ2}
                                            alt="أبطال الحلقة 2"
                                            className={styles.imageThumbSmall}
                                        />
                                    </div>
                                    <div>
                                        <img
                                            src={champ1}
                                            alt="أبطال الحلقة 1"
                                            className={styles.imageThumbSmall}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Pricing Section - Arabic */}
                            <section
                                className={`${styles.section} ${styles.pricingBox}`}
                            >
                                <h3 className={styles.sectionTitle}>
                                    سياسة التسعير – مباشرة وشفافة
                                </h3>
                                <p className={styles.paragraph}>
                                    مجانًا لمدة 24 ساعة ثم 3.50 دراهم يوميًا
                                    (شامل ضريبة القيمة المضافة)
                                </p>
                                <ul className={styles.list}>
                                    <li>تجديد تلقائي لضمان خدمة مستمرة</li>
                                    <li>
                                        جميع الضرائب مشمولة. لا توجد رسوم مفاجئة
                                    </li>
                                    <li>سيتم خصم الرسوم يوميًا</li>
                                </ul>
                            </section>

                            {/* Unsubscribe Section - Arabic */}
                            <section className={styles.section}>
                                <h3 className={styles.sectionTitle}>
                                    كيف يمكن إلغاء الاشتراك أو إيقاف الخدمة؟
                                </h3>
                                <ul className={styles.list}>
                                    <li>الخيار الأول: أرسل Stop E1 إلى 1156</li>
                                    <li>
                                        الخيار الثاني: أرسل بريدًا إلكترونيًا
                                        إلى support@uae-E1prime.tv
                                    </li>
                                </ul>
                            </section>

                            {/* Testimonials - Arabic */}
                            <section className={styles.section}>
                                <h3 className={styles.sectionTitle}>
                                    شهادات المستخدمين
                                </h3>
                                <div className={styles.testimonials}>
                                    <div>
                                        <p className={styles.testimonialName}>
                                            نور أ. – أبوظبي 🇦🇪
                                        </p>
                                        <p>
                                            "أنا مشترك منذ اليوم الأول ولم أفوت
                                            سباقًا واحدًا! سلسلة E1 أكثر من مجرد
                                            بطولة — إنها مستقبل الرياضات
                                            المائية."
                                        </p>
                                    </div>
                                    <div>
                                        <p className={styles.testimonialName}>
                                            سعيد م. – دبي 🇦🇪
                                        </p>
                                        <p>
                                            "سلسلة E1 تجمع بين الابتكار
                                            والاستدامة والإثارة. أشعر وكأنني
                                            أتابع فورمولا 1 ولكن على الماء."
                                        </p>
                                    </div>
                                    <div>
                                        <p className={styles.testimonialName}>
                                            فاطمة ر. – الشارقة 🇦🇪
                                        </p>
                                        <p>
                                            "تجربة رائعة لمتابعة بطولة حديثة
                                            ومبتكرة مباشرة من الهاتف المحمول.
                                            شكراً E1!"
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </>
                    ) : (
                        <>
                            {/* Hero Section */}
                            <section className={styles.textCenter}>
                                <h1 className={styles.heroTitle}>
                                    Welcome to UAE E1 Prime
                                </h1>
                                <img
                                    src={e1Hero}
                                    alt="E1 Raceboats"
                                    className={styles.heroImage}
                                />
                                <p className={styles.highlightText}>
                                    Discover E1 The World's First All-Electric{" "}
                                    <span className="underline">Raceboat</span>{" "}
                                    Championship
                                </p>
                                <p className={styles.paragraph}>
                                    The championship was established to create
                                    an exciting, competitive on-water racing
                                    platform based on electric technologies to
                                    protect and restore our waters and coastal
                                    areas and will see up to 12 teams and 24
                                    pilots racing on the water in iconic cities
                                    around the world.
                                </p>
                            </section>

                            {/* Inside E1 Section */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>
                                    What's on UAE E1 Prime
                                </h2>
                                <h3 className={styles.subTitle}>Inside E1</h3>
                                <div
                                    className={`${styles.grid} ${styles.gridCols1} ${styles.gridCols2} ${styles.gridCols3}`}
                                >
                                    <div>
                                        <img
                                            src={inside1}
                                            alt="Episode 3"
                                            className={styles.imageThumbSmall}
                                        />
                                    </div>
                                    <div>
                                        <img
                                            src={inside2}
                                            alt="Episode 2"
                                            className={styles.imageThumbSmall}
                                        />
                                    </div>
                                    <div>
                                        <img
                                            src={inside3}
                                            alt="Episode 1"
                                            className={styles.imageThumbSmall}
                                        />
                                    </div>
                                </div>
                                <p className={styles.highlightText}>
                                    Go on an adventure with the team as they go
                                    in search of race locations in some of the
                                    most iconic cities in the world
                                </p>
                            </section>

                            {/* Champions Section */}
                            <section className={styles.section}>
                                <h3 className={styles.subTitle}>
                                    Champions of the Water
                                </h3>
                                <p className={styles.highlightText}>
                                    Go behind the scenes and get the full story
                                    from those involved in the world's first
                                    ever electric raceboat championship
                                </p>
                                <div
                                    className={`${styles.grid} ${styles.gridCols1} ${styles.gridCols2} ${styles.gridCols3}`}
                                >
                                    <div>
                                        <img
                                            src={champ3}
                                            alt="Champions Episode 3"
                                            className={styles.imageThumbSmall}
                                        />
                                    </div>
                                    <div>
                                        <img
                                            src={champ2}
                                            alt="Champions Episode 2"
                                            className={styles.imageThumbSmall}
                                        />
                                    </div>
                                    <div>
                                        <img
                                            src={champ1}
                                            alt="Champions Episode 1"
                                            className={styles.imageThumbSmall}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Pricing Section */}
                            <section
                                className={`${styles.section} ${styles.pricingBox}`}
                            >
                                <h3 className={styles.sectionTitle}>
                                    Pricing Policy – Direct and transparent
                                </h3>
                                <p className={styles.paragraph}>
                                    Free for 24h then 3.50AED Daily (VAT
                                    inclusive)
                                </p>
                                <ul className={styles.list}>
                                    <li>
                                        Automatic renewal for uninterrupted
                                        service
                                    </li>
                                    <li>
                                        All taxes included. No surprise fees
                                    </li>
                                    <li>You will be charged daily</li>
                                </ul>
                            </section>

                            {/* Unsubscribe Section */}
                            <section className={styles.section}>
                                <h3 className={styles.sectionTitle}>
                                    How to Unsubscribe or Cancel the service?
                                </h3>
                                <ul className={styles.list}>
                                    <li>Option 1: Send Stop E1 to 1156</li>
                                    <li>
                                        Option 2: Send us an email to
                                        support@uae-E1prime.tv
                                    </li>
                                </ul>
                            </section>

                            {/* Testimonials */}
                            <section className={styles.section}>
                                <h3 className={styles.sectionTitle}>
                                    Testimonials
                                </h3>
                                <div className={styles.testimonials}>
                                    <div>
                                        <p className={styles.testimonialName}>
                                            Nour A. – Abu Dhabi 🇦🇪
                                        </p>
                                        <p>
                                            "I've been a subscriber since day
                                            one and haven't missed a single
                                            race! E1 Series is more than just a
                                            championship — it's the future of
                                            water sports. The format is
                                            thrilling, the visuals are stunning,
                                            and you can really feel the
                                            environmental commitment. Proud to
                                            see this kind of innovation coming
                                            from our region."
                                        </p>
                                    </div>
                                    <div>
                                        <p className={styles.testimonialName}>
                                            Saeed M. – Dubai 🇦🇪
                                        </p>
                                        <p>
                                            "I've always loved high-speed
                                            sports, but this is something else.
                                            The E1 Series blends innovation,
                                            sustainability, and pure excitement.
                                            The subscription is super
                                            affordable, and I love following the
                                            teams and pilots through the
                                            service. It feels like Formula 1 —
                                            but on water."
                                        </p>
                                    </div>
                                    <div>
                                        <p className={styles.testimonialName}>
                                            Fatima R. – Sharjah 🇦🇪
                                        </p>
                                        <p>
                                            "It's amazing to follow such a
                                            cutting-edge championship right from
                                            my phone. The videos are high
                                            quality, the exclusive content is
                                            engaging, and I've discovered a
                                            whole new world of racing. Huge
                                            respect to E1 Series for creating
                                            such a futuristic experience."
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Footer;
