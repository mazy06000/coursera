import { FaTrashAlt } from "react-icons/fa";

const LineItem = ({ item, handleCheck, handleDelete }) => {
  return (
    <li className="item">
      <input
        type="checkbox"
        checked={item.check}
        onChange={() => handleCheck(item.id)}
      />
      <label
        style={{ textDecoration: item.check ? "line-through" : "" }}
        onDoubleClick={() => handleCheck(item.id)}
      >
        {item.name}
      </label>
      <br />
      {item.description}
      <FaTrashAlt
        onClick={() => handleDelete(item.id)}
        role="button"
        tabIndex="0"
        aria-label="Delete"
      />
    </li>
  );
};

export default LineItem;
