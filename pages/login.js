import React from "react";
export default function () {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3000/api/khurram/34")
    .then(r => r.json())
      .then(setData)
      .catch(console.trace);
  }, []);

  return (
    <div>
      <h1>Hello World</h1>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
}
