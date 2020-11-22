import React from "react";

export default function App() {
  const [data, setData] = React.useState([]);

  const getClientDataHandler = async (e) => {
    const r = await fetch("http://localhost:5000/clients");
    const json = await r.json();
    setData(json);
  };

  return (
    <>
      <h1>Connected Clients</h1>
      <button onClick={getClientDataHandler}>Get Clients metadata</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
