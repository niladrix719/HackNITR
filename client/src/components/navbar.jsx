import React, { Component } from "react";

const Navbar = () => {
	return (
		<>
			<nav className='flex w-full h-16 bg-slate-800 text-white font-roboto text-xl'>
				<img src='' alt='' />
				<div></div>
				<ul className='flex justify-around items-center m-auto w-full'>
					<a href=''>
						<li>Home</li>
					</a>
					<a href=''>
						<li>About</li>
					</a>
					<a href=''>
						<li>Services</li>
					</a>
					<a href=''>
						<li>Contact</li>
					</a>
				</ul>
			</nav>
		</>
	);
};

export default Navbar;
