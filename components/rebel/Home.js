import useTranslation from "next-translate/useTranslation";
import Logo from "../../public/img/rebel-electric-logo.svg";
import Image from "next/image";
import styles from "./Home.module.css";
import BtnLink from "../layout/BtnLink";
import { IconAcademy } from "../icons/IconAcademy";
import InfoBox from "../layout/InfoBox";
import HomeRecentBox from "./HomeRecentBox";

function Home(props) {
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.btnInfo}>
        <div className={styles.logo}>
          <Image src={Logo} alt="Rebel Electric Logo" layout="fill" />
        </div>
        <div>
          <p className={styles.p}>
            {t("home:intro-1")}
            <em>{t("home:intro-2")}</em>
            {t("home:intro-3")}
          </p>
          <p className={styles.p}>
            {t("home:intro-4")}
            <strong>{t("home:intro-5")}</strong>
            {t("home:intro-6")}
          </p>
        </div>
      </div>
      <div className={styles.btnInfo}>
        <BtnLink
          href="/hangar"
          icon={<IconAcademy />}
          text={t("common:navHangar")}
        />
        <InfoBox>
          <p>{t("home:hangar-info-1")}</p>
          <p>{t("home:hangar-info-2")}</p>
        </InfoBox>
      </div>

      <HomeRecentBox recentVehicles={props.recentVehicles} />
      <div className={styles.btnInfo}>
        <BtnLink
          href="/knowledge"
          icon={<IconAcademy />}
          text={t("common:navKnowledgeBase")}
        />
        <InfoBox>
          <p>{t("home:knowledge-info-1")}</p>
          <p>{t("home:knowledge-info-2")}</p>
        </InfoBox>
      </div>

      <div className={styles.call}>
        <div className={styles.callContainer}>
          <p>
            {t("home:call-1")}
            <br />
            {t("home:call-2")}
          </p>
          <p>{t("home:call-3")}</p>
          <p>
            {t("home:call-4")}
            <br />
            {t("home:call-5")}
            <br />
            {t("home:call-6")}
            <br />
            {t("home:call-7")}
          </p>
          <p>
            {t("home:call-8")}
            <br />
            {t("home:call-9")}
            <br />
            {t("home:call-10")}
          </p>
        </div>
      </div>
      <div className={styles.btnInfo}>
        <BtnLink
          href="/users/add"
          icon={<IconAcademy />}
          text={t("common:register")}
        />
        <InfoBox>
          <p>{t("home:register-info-1")}</p>
          <p>{t("home:register-info-2")}</p>
        </InfoBox>
      </div>
    </>
  );
}

export default Home;
