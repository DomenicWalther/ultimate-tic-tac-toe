import Node from "../Node/Node";
import React from "react";

const Grid = () => {
  const [nodes, setNodes] = React.useState([]);
  const [field, setField] = React.useState([]);
  const [currentPlayerX, setCurrentPlayerX] = React.useState(true);

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
  }, []);

  React.useEffect(() => {
    setField(createField(nodes));
  }, [nodes]);

  function createField(array) {
    const field = array.map((row) => {
      return (
        <div>
          {row.map((col) => {
            return (
              <Node
                value={col.value}
                rowIndex={col.rowIndex}
                colIndex={col.colIndex}
                handleClick={changeField}
              />
            );
          })}
        </div>
      );
    });
    return field;
  }

  function changeField(clickedRow, clickedCol) {
    setNodes((prevNodes) => {
      return prevNodes.map((value, index) => {
        return value.map((element) => {
          if (
            element.rowIndex === clickedRow &&
            element.colIndex === clickedCol
          ) {
            return { ...element, value: currentPlayerX ? "X" : "O" };
          } else {
            return { ...element };
          }
        });
      });
    });
    setCurrentPlayerX(!currentPlayerX);
  }

  // changeField(0, 0, "O");

  return <div>{field}</div>;
};

export default Grid;
