import { Link, Outlet } from "@remix-run/react";

export default function News() {
  return (
    <div>
      <Outlet />
      <Link to={"/admin/news/1/edit"}>News 1</Link>
    </div>
  );
}
