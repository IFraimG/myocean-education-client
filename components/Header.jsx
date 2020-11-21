import { useState, useEffect } from "react"
import { connect } from "react-redux"
import Link from "next/link";
import { thunkEditHeader } from "../store/reducers/app"

import "antd/dist/antd.css";
import styles from "../styles/layout.module.scss";
import { MenuOutlined } from "@ant-design/icons";

function MyHeader(props) {
	const [isMedia, setMedia] = useState(false)

	const checkWidth = () => {
		if (document.documentElement.clientWidth <= 652) setMedia(true)
		else setMedia(false)
	}
	useEffect(() => props.thunkEditHeader(false), [props.router.route])
	useEffect(() => checkWidth(), [])

	window.addEventListener('resize', checkWidth)

  return (
		<>
			<header className={styles.header}>
				<div className={styles.header__left}>
					<img className={styles.header__logo} src="/pupil/mshp.png" />
					<p>MyOceanEducation</p>
				</div>
				{ !isMedia ? 
					<div className={styles.header__right}>
						<Link className={styles.header__link} href="/">
							<a>Александр Кулагин</a>
						</Link>
						<img className={styles.header__profile__logo} src="/pupil/user.png" />
						<p className={"text-header " + styles.header__logout}>Выйти</p>
					</div>
					: 
					<div className={styles.menu}>
						<MenuOutlined onClick={() => props.thunkEditHeader(!props.isHeader)} className={styles.menu__logo} />
						{ props.isHeader ?
							<div className={styles.menu__content}>
								<div className={styles.menu__link}>
									<Link href="/profile/11">
										<p>Профиль</p>
									</Link>
								</div>
								<div className={styles.menu__link}>
									<p>Выйти</p>
								</div>
								<div className={styles.menu__link}>
									<p>Дополнительно</p>
								</div>
								<div className={styles.menu__link}>
									<p>Дополнительно</p>
								</div>
								<div className={styles.menu__link}>
									<p>MyOcean Education 2020</p>
								</div>
							</div>
						: ""}
					</div>
				}
    	</header>
		</>
  );
}

const HeaderContainer = (props) => {
	return <MyHeader {...props} />
}

const mapStateToProps = state => {
	return { isHeader: state.app.isEditHeader }
}

export default connect(mapStateToProps, { thunkEditHeader })(HeaderContainer)