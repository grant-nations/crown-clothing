import "./directory.styles.scss";
import CategoryItem from "../category-item/category-item.component";

const Directory = ({categories}) => {
    return (
        <div className="categories-container">
            {categories.map(({id, imageUrl, title}) => (
                <CategoryItem key={id} imageUrl={imageUrl} title={title}/>
            ))}
        </div>
    )
}

export default Directory;
