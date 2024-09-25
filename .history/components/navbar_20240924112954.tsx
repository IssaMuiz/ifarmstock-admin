import Link from "next/link"
import React from "react"


const Navbar = () => {
  return (
    <nav className="flex justify-between fixed top-0 left-0 right-0 h-50 mx-">
      <div className="left-nav ">
<p>Admin</p>
      </div>
      <div className="flex gap-5">
        <Link href="/">
        <p>Dashboard</p>
        </Link>
        <Link href="/">
        <p>Products</p>
        </Link>
        <Link href="/">
        <p>Categories</p>
        </Link>
        <Link href="/">
        <p>Orders</p>
        </Link>
        <Link href="/">
        <p>Settings</p>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
