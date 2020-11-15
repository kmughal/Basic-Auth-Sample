import React from "react"
import Modal from "react-modal"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width : "300px"
  },
}

export default function ProjectSetupModal() {
  
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const channelNameRef = React.useRef(null)

  React.useEffect(() => {
    Modal.setAppElement("#__next")

  }, [])

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = "#f00"
  }

  function closeModal() {
    setIsOpen(false)
  }

  function saveHandler() {
    debugger;
    const body = JSON.stringify({
      channelName: channelNameRef.current.value,
    })
    fetch("/api/channels", {
      method: "POST",
      body,
      headers: { "content-type": "application/json" },
    })
      .then((r) => r.json())
      .then(console.log)
      .catch(console.error)
  }

  return (
    <div className="modal-container">
      <button className="modal-container__show-modal-button" onClick={openModal}>+</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Create a new text channel"
      >
        <h2>Create Text Channel</h2>
        <form>
          <div>
            <label htmlFor="project-name">Channel Name</label>
            # <input
              type="text"
              ref={channelNameRef}
              name="project-name"
              placeholder="Test project"
            />
          </div>
          <div className="modal-conainer__action-buttons">
          <button className="default" onClick={closeModal}>Close</button>
            <button onClick={saveHandler}>Save</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
