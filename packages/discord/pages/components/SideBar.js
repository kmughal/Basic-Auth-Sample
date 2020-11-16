import React from "react"
import ProjectSetupModal from "./ProjectSetupModal"

export default function SideBar({ setSelectedChannel, getMessagesByChannel }) {
  const [channels, setChannels] = React.useState(null)

  React.useEffect(() => {
    fetch("/api/channels", {
      credentials: "same-origin",
      method: "get",
    })
      .then((r) => r.json())
      .then(setChannels)
      .catch(console.error)
  }, [])

  const setChannelId = (id, e) => {
    document
      .querySelectorAll(".projects-container li")
      .forEach((i) => i.classList.remove("selected"))
    e.target.classList.add("selected")
    setSelectedChannel(id)
    getMessagesByChannel(id)
  }

  return (
    <>
      <div className="main-page__side-menu">
        <ProjectSetupModal />
        {(!channels || channels.length === 0) && <p>No channel added yet!</p>}
        {channels && channels.length > 0 && (
          <ul className="projects-container">
            {channels.map((p) => (
              <li onClick={(e) => setChannelId(p._id, e)} key={p._id}>
                {p.channelName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
