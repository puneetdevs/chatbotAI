import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./style/sidebar.css";
import "./style/style.css";

function Layout() {
	return (
		<>
			<div className="d-flex flex-column flex-lg-row">
				<Sidebar />
				<div className="main flex-1">
					<Outlet />
				</div>
			</div>
		</>
	);
}

export default Layout;
