import styles from './DataBarsHeadingContainer.module.scss';

export const DataBarsHeadingContainer: React.FC = (props) => {
  return (
    <div data-testid='DataBarsHeadingContainer' className={styles.container}>
      {props.children}
    </div>
  );
};
