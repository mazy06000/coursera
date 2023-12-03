import ItemList from "./ItemList";

const Content = ({ items, handleCheck, handleDelete}) => {

  return (
    <>
      {items.length === 0 && <p>No items to show</p>}
      <ItemList items={items} handleCheck={handleCheck} handleDelete={handleDelete} />
    </>
  );
};

export default Content;
