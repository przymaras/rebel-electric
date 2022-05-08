import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';

import { IconAcademy } from 'src/assets/icons/IconAcademy';
import { IconHangar } from 'src/assets/icons/IconHangar';
import { IconUser } from 'src/assets/icons/IconUser';
import { Vehicle } from 'src/modules/hangar/types/hangar';
import { RecentBox } from 'src/modules/home/components/RecentBox';
import { BtnLink } from 'src/modules/layout/components/BtnLink';
import { InfoBox } from 'src/modules/layout/components/InfoBox';

import Logo from 'public/img/rebel-electric-logo.svg';

import styles from './Home.module.scss';

export const Home: React.FC<{ vehicles: Vehicle[] }> = (props) => {
  const { t } = useTranslation();
  const recentVehicles = props.vehicles;

  return (
    <>
      <div className={styles.sectionWrapper}>
        <div className={styles.logo}>
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <Image src={Logo} alt='Rebel Electric Logo' layout='fill' />
        </div>
        <div>
          <p className={styles.p}>
            {t('home:intro-1')}
            <em>{t('home:intro-2')}</em>
            {t('home:intro-3')}
          </p>
          <p className={styles.p}>
            {t('home:intro-4')}
            <strong>{t('home:intro-5')}</strong>
            {t('home:intro-6')}
          </p>
        </div>
      </div>
      <div className={styles.sectionWrapper}>
        <BtnLink href='/hangar' icon={<IconHangar />} text={t('common:navHangar')} />
        <InfoBox>
          <p>{t('home:hangar-info-1')}</p>
          <p>{t('home:hangar-info-2')}</p>
        </InfoBox>
      </div>

      <RecentBox vehicles={recentVehicles} />
      <div className={styles.sectionWrapper}>
        <BtnLink href='/knowledge' icon={<IconAcademy />} text={t('common:navKnowledgeBase')} />
        <InfoBox>
          <p>{t('home:knowledge-info-1')}</p>
          <p>{t('home:knowledge-info-2')}</p>
        </InfoBox>
      </div>

      <div className={styles.call}>
        <div className={styles.callContainer}>
          <p>
            {t('home:call-1')}
            <br />
            {t('home:call-2')}
          </p>
          <p>{t('home:call-3')}</p>
          <p>
            {t('home:call-4')}
            <br />
            {t('home:call-5')}
            <br />
            {t('home:call-6')}
            <br />
            {t('home:call-7')}
          </p>
          <p>
            {t('home:call-8')}
            <br />
            {t('home:call-9')}
            <br />
            {t('home:call-10')}
          </p>
        </div>
      </div>
      <div className={styles.sectionWrapper}>
        <BtnLink href='/users/add' icon={<IconUser />} text={t('common:register')} />
        <InfoBox>
          <p>{t('home:register-info-1')}</p>
          <p>{t('home:register-info-2')}</p>
        </InfoBox>
      </div>
    </>
  );
};
