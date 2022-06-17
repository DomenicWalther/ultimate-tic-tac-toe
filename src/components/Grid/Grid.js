import Node from "../Node/Node";
import React from "react";

const Grid = () => {
  const [nodes, setNodes] = React.useState([]);
  const [field, setField] = React.useState([]);
  const [currentPlayerX, setCurrentPlayerX] = React.useState(true);
  const [moves, setMoves] = React.useState(0);

  React.useEffect(() => {
    setNodes(initialArray());
  }, []);

  React.useEffect(() => {
    setField(createField(nodes));
  }, [nodes]);

  React.useEffect(() => {
    let value = checkRows();
    if (value !== undefined) {
      console.log(`Winner is: `, value === 3 ? "X" : "O");
    }
  }, [currentPlayerX]);

  function checkRows() {
    for (let i = 0; i < nodes.length; i++) {
      let rowValue = 0;
      nodes[i].forEach((item) => {
        if (item.value === "X") {
          rowValue++;
        } else if (item.value === "O") {
          rowValue--;
        }
      });
      if (rowValue === 3 || rowValue === -3) {
        return rowValue;
      }
    }
  }

  function initialArray() {
    const nodeArray = [];
    for (let row = 0; row < 3; row++) {
      const currentRow = [];
      for (let col = 0; col < 3; col++) {
        currentRow.push({ value: "", rowIndex: row, colIndex: col });
      }
      nodeArray.push(currentRow);
    }
    return nodeArray;
  }
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
    if (nodes[clickedRow][clickedCol].value.length === 0) {
      setNodes((prevNodes) => {
        return prevNodes.map((value, index) => {
          return value.map((element) => {
            if (
              element.rowIndex === clickedRow &&
              element.colIndex === clickedCol &&
              element.value.length === 0
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
  }

  function resetGame() {
    setNodes(initialArray());
    setCurrentPlayerX(true);
    setMoves(0);
  }

  return (
    <div>
      {field}
      <h3>{`Current Player: ${currentPlayerX ? "X" : "O"}`}</h3>
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default Grid;
