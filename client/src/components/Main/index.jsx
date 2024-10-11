import styles from "./styles.module.css";
import Card from './Card';
const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>UET</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<h1 className="text-center">Computer Science Deparment</h1>
			<h2 className="text-center">5<sup>th</sup> Semester Subject </h2>
	
			<Card/>
		</div>
	);
};

export default Main;
