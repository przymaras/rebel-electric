import styles from './DataBarsHeadingContainer.module.scss';

export const DataBarsHeadingContainer: React.FC = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};
