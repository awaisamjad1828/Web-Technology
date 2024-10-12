import styles from "./styles.module.css";
import Navbar from './Navbar';
import Card from './BasicExample';

const Main = () => {
  return (
    <div className={styles.main_container}>
      <Navbar />
      <h1 className="text-center" style={{marginTop:'30px'}}>Computer Science Deparment</h1>
      <h2 className="text-center">5<sup>th</sup> Semester Subject </h2>
      <Card/>
    </div>
  );
};

export default Main;