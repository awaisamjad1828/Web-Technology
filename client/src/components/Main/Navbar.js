import styles from "./styles.module.css";

const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
};

const Navbar = () => {
    return ( <
        nav className = { styles.navbar } >
        <
        h1 >
        <
        a href = "/"
        className = { styles.navbar_brand }
        style = {
            { listStyle: 'none', color: 'white', textDecoration: 'none' }
        } > UET < /a> < /
        h1 > <
        button className = { styles.white_btn }
        onClick = { handleLogout } >
        Logout <
        /button> < /
        nav >
    );
};

export default Navbar;