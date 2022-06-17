import "./Node.css";

const Node = (props) => {
  return (
    <div
      className="node"
      onClick={() => props.handleClick(props.rowIndex, props.colIndex)}
    >{`${props.value}`}</div>
  );
};

export default Node;
