import { useState } from "react";

export default function Test() {
  const [count, setCount] = useState(0);

  const data = [
    { id: 1, type: "expense", name: "Grocery", price: 1000 },
    { id: 2, type: "Income", name: "Salary", price: 150000 },
  ];
  const [dataToUpdate, setDataToUpdate] = useState(null);

  function handleDataToUpdate(data) {
    setDataToUpdate(data);
  }

  return (
    <div>
      <button onClick={() => setCount((v) => v + 1)}>learn {count}</button>
      <ExpenseIncomeList data={data} onDataUpdate={handleDataToUpdate} />
      <Form dataToUpdate={dataToUpdate} />
      {/* <Form dataToUpdate={dataToUpdate} key={dataToUpdate?.id} /> */}
    </div>
  );
}

// null - 1 - 2
function Form({ dataToUpdate }) {
  console.log("one");

  const [id, setId] = useState(dataToUpdate?.id);
  const [state, setState] = useState(
    dataToUpdate ?? {
      name: "",
      price: "",
    }
  );
  if (dataToUpdate?.id && id !== dataToUpdate?.id) {
    setState(dataToUpdate);
    setId(dataToUpdate.id);
    return;
  }

  console.log("two");

  return (
    <form>
      <div>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={(e) =>
            setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />
      </div>

      <div>
        <input
          type="number"
          name="price"
          value={state.price}
          onChange={(e) =>
            setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />
      </div>
    </form>
  );
}

function ExpenseIncomeList({ data, onDataUpdate }) {
  return (
    <div>
      {data.map((el) => (
        <div key={el.id} onClick={() => onDataUpdate(el)}>
          <h3>
            {el.type} {el.name}
          </h3>
          <p>{el.price}</p>
        </div>
      ))}
    </div>
  );
}
