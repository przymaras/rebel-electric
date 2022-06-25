import styles from './TitleBox.module.scss';

export const TitleBox: React.FC = (props) => {
  return (
    <div data-testid='TitleBox' className={styles.container}>
      {props.children}
    </div>
  );
};
