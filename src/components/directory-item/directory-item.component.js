import "./directory-item.styles.scss";
import {Link} from "react-router-dom";

const CategoryItem = ({imageUrl, title}) => {
    return (
        <div className="directory-item-container">
            <div className="background-image"
                 style={{backgroundImage: `url(${imageUrl})`}}
            />
            <Link className="directory-item-body" to={`shop/${title}`}>
                <h2>{title.toUpperCase()}</h2>
                <p>Shop Now</p>
            </Link>
        </div>
    )
}

export default CategoryItem;
