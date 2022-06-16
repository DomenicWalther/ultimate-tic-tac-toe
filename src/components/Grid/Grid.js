import Node from "../Node/Node";
import React from "react";

const Grid = () => {
  const [nodes, setNodes] = React.useState([]);
  const [field, setField] = React.useState([]);

  React.useEffect(() => {
    const nodeArray = [];
    for (let row = 0; row < 3; row++) {
      const currentRow = [];
      for (let col = 0; col < 3; col++) {
        currentRow.push({ value: "", rowIndex: row, colIndex: col });
      }
      nodeArray.push(currentRow);
    }
    setNodes(nodeArray);
    setField(createField(nodeArray));
  }, []);

  function createField(array) {
    const field = array.map((row) => {
      return (
        <div>
          {row.map((col) => {
            return (
              <Node
                value={col.value === "" ? "X" : col.value}
                rowIndex={col.rowIndex}
                colIndex={col.colIndex}
              />
            );
          })}
        </div>
      );
    });
    return field;
  }

  function changeField(clickedRow, clickedCol, currentPlayer) {
    const newNodes = nodes.map((value, index) => {
      return value.map((element) => {
        if (
          element.rowIndex === clickedRow &&
          element.colIndex === clickedCol
        ) {
          return { ...element, value: currentPlayer };
        } else {
          return { ...element };
        }
      });
    });
    console.log(newNodes);
    setNodes(newNodes);
    setField(createField(newNodes));
  }

  // changeField(0, 0, "O");

  return (
    <div>
      {field}{" "}
      <button className="changeValue" onClick={() => changeField(2, 2, "B")}>
        Change Value{" "}
      </button>
    </div>
  );
};

export default Grid;
