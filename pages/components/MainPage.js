import SideBar from "./SideBar"
import MainBody from "./MainBody"

export default function MainPage({ username }) {
  return (
    <section className="main-page">
      <SideBar username={username}></SideBar>
      <MainBody></MainBody>
    </section>
  )
}
