import { Outlet } from "@remix-run/react"
import styles from "./styles.module.css"
const Dashboard = () => {
	return (

		<div className={styles.container}>
			<header>Pages</header>
			<nav className={styles.sidebar}>
				<ul>
					<li>Posts</li>
					<li>Media</li>
				</ul>
			</nav>
			<section>
				<Outlet />
			</section>
		</div>
	)
}

export default Dashboard