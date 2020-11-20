import React from "react";
import ProjectSetupModal from "./ProjectSetupModal";

export default function SideBar({
  channels: channelsProps,
  setSelectedChannel,
}) {
  const [channels, setChannels] = React.useState(channelsProps);

  React.useEffect(() => {
    if (!channels)
      fetch("/api/channels", {
        credentials: "same-origin",
        method: "get",
      })
        .then((r) => r.json())
        .then(setChannels)
        .catch(console.error);
  }, []);

  const setChannelId = (id, e) => {
    document
      .querySelectorAll(".projects-container li")
      .forEach((i) => i.classList.remove("selected"));
    e.target.classList.add("selected");

    setSelectedChannel(id);
  };

  return (
    <>
      <div className="main-page__side-menu">
        <ProjectSetupModal />
        {(!channels || channels.length === 0) && <p>No channel added yet!</p>}
        {channels && channels.length > 0 && (
          <ul className="projects-container">
            {channels.map((p) => (
              // <li onClick={(e) => setChannelId(p._id, e)} key={p._id}>
              //   {p.channelName}
              // </li>
              <li key={p._id}>
                <a href={`/channels/${p._id}`}> {p.channelName}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
