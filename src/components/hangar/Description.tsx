import styles from './Description.module.scss';

interface DescriptionProps {
  description: string;
}

const Description: React.FC<DescriptionProps> = (props) => {
  const markupToRender = (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p>Opis od autora</p>
      </div>
      <div className={styles.content}>
        <p>{props.description}</p>
      </div>
    </div>
  );

  return <div className={styles.container}>{props.description && markupToRender}</div>;
};

export default Description;
