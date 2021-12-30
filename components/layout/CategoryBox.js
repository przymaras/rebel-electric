import Image from "next/image";
import styles from "./CategoryBox.module.css";

function CategoryBox(props) {
  return (
    <div className={styles.container}>
      <div className={styles.categoryImg}>
        <Image
          src="https://rebel-electric.com/new/bike_kind/2/2/1/3.png"
          alt="Vehicle category"
          layout="fill"
        />
      </div>
      <p>SUBKATEGORIA</p>
    </div>
  );
}

export default CategoryBox;
