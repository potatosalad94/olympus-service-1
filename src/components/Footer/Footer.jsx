import { languages } from "@/utils/languages-dictionnary";
import styles from "./Footer.module.scss";
import e1Hero from "@images/e1-hero.png";
import inside1 from "@images/inside1.png";
import inside2 from "@images/inside2.png";
import inside3 from "@images/inside3.png";
import champ1 from "@images/champ1.png";
import champ2 from "@images/champ2.png";
import champ3 from "@images/champ3.png";

const Footer = ({ content, additionalInformation, lang }) => {
	if (!content && !additionalInformation) return null;

	const renderContent = () => {
		if (!content) return null;

		return Object.values(content).map((item, index) => {
			if (typeof item === "string") {
				return <p key={index}>{item}</p>;
			} else if (Array.isArray(item)) {
				return (
					<ul key={index} className={styles.bulletList}>
						{item.map((bulletPoint, bulletIndex) => (
							<li key={bulletIndex} className={styles.bulletItem}>
								{bulletPoint}
							</li>
						))}
					</ul>
				);
			}
			return null;
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
							Discover E1 The World’s First All-Electric{" "}
							<span className="underline">Raceboat</span>{" "}
							Championship
						</p>
						<p className={styles.paragraph}>
							The championship was established to create an
							exciting, competitive on-water racing platform based
							on electric technologies to protect and restore our
							waters and coastal areas and will see up to 12 teams
							and 24 pilots racing on the water in iconic cities
							around the world.
						</p>
					</section>

					{/* Inside E1 Section */}
					<section className={styles.section}>
						<h2 className={styles.sectionTitle}>
							What’s on UAE E1 Prime
						</h2>
						<h3 className={styles.subTitle}>Inside E1</h3>
						<div
							className={`${styles.grid} ${styles.gridCols1} ${styles.gridCols2} ${styles.gridCols3}`}
						>
							<div>
								<img
									src={inside1}
									alt="Episode 3"
									className={styles.imageThumb}
								/>
								<p className={styles.videoTime}>00:07:06</p>
								<p className={styles.videoTitle}>
									Inside E1 | Episode 3
								</p>
							</div>
							<div>
								<img
									src={inside2}
									alt="Episode 2"
									className={styles.imageThumb}
								/>
								<p className={styles.videoTime}>00:08:35</p>
								<p className={styles.videoTitle}>
									Inside E1 | Episode 2
								</p>
							</div>
							<div>
								<img
									src={inside3}
									alt="Episode 1"
									className={styles.imageThumb}
								/>
								<p className={styles.videoTime}>00:10:02</p>
								<p className={styles.videoTitle}>
									Inside E1 | Episode 1
								</p>
							</div>
						</div>
						<p className={styles.highlightText}>
							Go on an adventure with the team as they go in
							search of race locations in some of the most iconic
							cities in the world
						</p>
					</section>

					{/* Champions Section */}
					<section className={styles.section}>
						<h3 className={styles.subTitle}>
							Champions of the Water
						</h3>
						<p className={styles.paragraph}>
							Go behind the scenes and get the full story from
							those involved in the world's first ever electric
							raceboat championship
						</p>
						<div
							className={`${styles.grid} ${styles.gridCols1} ${styles.gridCols2} ${styles.gridCols3}`}
						>
							<div>
								<img
									src={champ3}
									alt="Champions Episode 3"
									className={styles.imageThumb}
								/>
								<p className={styles.videoTime}>00:25:17</p>
								<p className={styles.videoTitle}>
									Champions of the Water | Episode 3
								</p>
							</div>
							<div>
								<img
									src={champ2}
									alt="Champions Episode 2"
									className={styles.imageThumb}
								/>
								<p className={styles.videoTime}>00:25:21</p>
								<p className={styles.videoTitle}>
									Champions of the Water | Episode 2
								</p>
							</div>
							<div>
								<img
									src={champ1}
									alt="Champions Episode 1"
									className={styles.imageThumb}
								/>
								<p className={styles.videoTime}>00:25:32</p>
								<p className={styles.videoTitle}>
									Champions of the Water | Episode 1
								</p>
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
							Free for 24h then 3.25AED Daily (VAT inclusive)
						</p>
						<ul className={styles.list}>
							<li>Automatic renewal for uninterrupted service</li>
							<li>All taxes included. No surprise fees</li>
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
						<h3 className={styles.sectionTitle}>Testimonials</h3>
						<div className={styles.testimonials}>
							<div>
								<p className={styles.testimonialName}>
									Nour A. – Abu Dhabi 🇦🇪
								</p>
								<p>
									"I've been a subscriber since day one and
									haven’t missed a single race! E1 Series is
									more than just a championship — it’s the
									future of water sports. The format is
									thrilling, the visuals are stunning, and you
									can really feel the environmental
									commitment. Proud to see this kind of
									innovation coming from our region."
								</p>
							</div>
							<div>
								<p className={styles.testimonialName}>
									Saeed M. – Dubai 🇦🇪
								</p>
								<p>
									"I’ve always loved high-speed sports, but
									this is something else. The E1 Series blends
									innovation, sustainability, and pure
									excitement. The subscription is super
									affordable, and I love following the teams
									and pilots through the service. It feels
									like Formula 1 — but on water."
								</p>
							</div>
							<div>
								<p className={styles.testimonialName}>
									Fatima R. – Sharjah 🇦🇪
								</p>
								<p>
									"It’s amazing to follow such a cutting-edge
									championship right from my phone. The videos
									are high quality, the exclusive content is
									engaging, and I’ve discovered a whole new
									world of racing. Huge respect to E1 Series
									for creating such a futuristic experience."
								</p>
							</div>
						</div>
					</section>
				</div>
			)}
		</div>
	);
};

export default Footer;
