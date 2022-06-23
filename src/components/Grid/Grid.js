import Node from "../Node/Node";
import React from "react";

const Grid = () => {
  const [nodes, setNodes] = React.useState([]);
  const [field, setField] = React.useState([]);
  const [currentPlayerX, setCurrentPlayerX] = React.useState(true);
  const [moves, setMoves] = React.useState(0);
  const [playingGame, setPlayingGame] = React.useState(true);

  React.useEffect(() => {
    setNodes(initialArray());
  }, []);

  React.useEffect(() => {
    setField(createField(nodes));
  }, [nodes]);

  React.useEffect(() => {
    let rowValue = checkRows();
    let colValue = checkCols();
    if (rowValue !== undefined || colValue !== undefined) {
      console.log(`Winner is: `, rowValue === 3 || colValue === 3 ? "X" : "O");
      setPlayingGame(false);
    } else if (moves === 9) {
      console.log("Game is a draw!");
      setPlayingGame(false);
    }
    setMoves(moves + 1);
  }, [currentPlayerX]);

  function checkCols() {
    for (let i = 0; i < nodes.length; i++) {
      let colValue = 0;
      for (let j = 0; j < nodes.length; j++) {
        if (nodes[j][i].value === "X") {
          colValue++;
        } else if (nodes[j][i].value === "O") {
          colValue--;
        }
      }

      if (colValue === 3 || colValue === -3) {
        return colValue;
      }
    }
  }
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
    if (playingGame) {
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
  }

  function resetGame() {
    setNodes(initialArray());
    setCurrentPlayerX(true);
    setMoves(0);
    setPlayingGame(true);
  }

  return (
    <div>
      {field}
      <h3>{`?Current Player: ${currentPlayerX ? "X" : "O"}`}</h3>
      <h3>{`${playingGame ? "" : "Winner is X"}`}</h3>
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default Grid;
