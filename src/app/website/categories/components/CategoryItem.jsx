import "./Category.css";
const CategoryItem = ({ category, windowWidth }) => {
  return (
    <div
      className="category-item-a "
      style={{ width: windowWidth < 607 ? "100%" : "200px" }}
    >
      <img
        src={category?.image}
        alt={category?.title}
        style={{ width: "150px", height: "150px" }}
      />
      <h4>{category?.title}</h4>
      <p>{category?.content}</p>
    </div>
  );
};

export default CategoryItem;
