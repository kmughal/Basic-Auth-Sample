import React from "react"
import ProjectSetupModal from "./ProjectSetupModal"

export default function SideBar() {
  const [projects, setprojects] = React.useState(null)

  React.useEffect(() => {
    fetch("/api/projects", {
      credentials: "same-origin",
      method: "get",
    })
      .then((r) => r.json())
      .then(setprojects)
      .catch(console.error)
  }, [])

  return (
    <>
      <div className="main-page__side-menu">
        <ProjectSetupModal />
        {(!projects || projects.length === 0) && <p>No channel added yet!</p>}
        {projects && projects.length > 0 && (
          <ul className="projects-container">
            {projects.map((p) => (
              <li key={p._id}>{p.projectName}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
