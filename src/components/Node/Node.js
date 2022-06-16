import "./Node.css";

const Node = (props) => {
  return <div className="node">{`${props.value}`}</div>;
};

export default Node;
