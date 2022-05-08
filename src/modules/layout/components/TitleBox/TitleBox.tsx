import styles from './TitleBox.module.scss';

export const TitleBox: React.FC = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};
