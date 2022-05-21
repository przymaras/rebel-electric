import useTranslation from 'next-translate/useTranslation';

import { IconAcademy } from 'src/assets/icons/IconAcademy';
import { IconHangar } from 'src/assets/icons/IconHangar';
import { IconUser } from 'src/assets/icons/IconUser';
import RebelLogo from 'src/assets/rebel-electric-logo.svg';
import { Vehicle } from 'src/modules/hangar/types/hangar';
import { RecentBox } from 'src/modules/home/components/RecentBox';
import { BtnLink } from 'src/modules/layout/components/BtnLink';
import { InfoBox } from 'src/modules/layout/components/InfoBox';

import styles from './Home.module.scss';

export const Home: React.FC<{ vehicles: Vehicle[] }> = (props) => {
  const { t } = useTranslation();
  const recentVehicles = props.vehicles;

  return (
    <>
      <div className={styles.sectionWrapper} data-testid='IntroSection'>
        <div className={styles.logo}>
          <RebelLogo title='Rebel Electric Logo' data-testid='IntroLogo' />
        </div>
        <div data-testid='IntroText'>
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
      <div className={styles.sectionWrapper} data-testid='HangarSection'>
        <BtnLink
          href='/hangar'
          icon={<IconHangar />}
          text={t('common:navHangar')}
          testId='Hangar'
        />
        <InfoBox testId='Hangar'>
          <p>{t('home:hangar-info-1')}</p>
          <p>{t('home:hangar-info-2')}</p>
        </InfoBox>
      </div>

      <RecentBox vehicles={recentVehicles} />

      <div className={styles.sectionWrapper} data-testid='KnowledgeBaseSection'>
        <BtnLink
          href='/knowledge'
          icon={<IconAcademy />}
          text={t('common:navKnowledgeBase')}
          testId='KnowledgeBase'
        />
        <InfoBox testId='KnowledgeBase'>
          <p>{t('home:knowledge-info-1')}</p>
          <p>{t('home:knowledge-info-2')}</p>
        </InfoBox>
      </div>
      {/* TODO: try use HTML in translations https://github.com/vinissimus/next-translate#6-use-html-inside-the-translation  */}
      <div className={styles.call} data-testid='AnnouncementSection'>
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

      <div className={styles.sectionWrapper} data-testid='RegisterSection'>
        <BtnLink
          href='/users/add'
          icon={<IconUser />}
          text={t('common:register')}
          testId='Register'
        />
        <InfoBox testId='Register'>
          <p>{t('home:register-info-1')}</p>
          <p>{t('home:register-info-2')}</p>
        </InfoBox>
      </div>
    </>
  );
};
