import React from "react"
import { signIn, signOut, useSession } from "next-auth/client"

import Modal from "react-modal"

export default function Page() {
  const [session, loading] = useSession()
  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session && (
        <>
          <div className="sign-out-container">
          Signed in as {session.user.name}
          {" "}<button onClick={signOut}>Sign out</button>
          </div>
          <MainPage></MainPage>
        </>
      )}
    </>
  )
}

function MainPage() {
  return (
    <section className="main-page">
      <Sidebar></Sidebar>
      <MainBody></MainBody>
    </section>
  )
}

function Sidebar() {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  }

  React.useEffect(() => {
    Modal.setAppElement("#__next")
  }, [])

  return (
    <>
      <div className="main-page__side-menu">
        <AddCreateProjectOption />
      </div>
    </>
  )
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}

function AddCreateProjectOption() {
  var subtitle
  const [modalIsOpen, setIsOpen] = React.useState(false)
  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00"
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Create new Project</h2>
        <form>
          <div>
            <label htmlFor="project-name">Project name:</label>
            <input
              type="text"
              id="project-name"
              name="project-name"
              placeholder="Test project"
            />
          </div>
          <div>
            <button onClick={closeModal}>Save</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

function MainBody() {
  return (
    <>
      <div className="main-page__main-body">Left Side</div>
    </>
  )
}
