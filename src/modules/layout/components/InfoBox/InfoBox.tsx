import styles from './InfoBox.module.scss';

interface InfoBoxProps {
  testId?: string;
}

export const InfoBox: React.FC<InfoBoxProps> = ({ testId = '', children }) => {
  return (
    <div className={styles.container} data-testid={`InfoBox${testId}`}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
