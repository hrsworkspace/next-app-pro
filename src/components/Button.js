export default function Button(props) {
  return (
    <button
      style={{
        cursor: "pointer",
        marginLeft: "0px",
        height: "30px",
        width: "70px",
        borderRadius: "20%",
      }}
      type={props.type}
      onClick={props.onClick}>
      {props.title}
    </button>
  );
}
