import {BackgroundImage, Body, DirectoryItemContainer} from "./directory-item.styles";

const CategoryItem = ({imageUrl, title}) => {
    return (
        <DirectoryItemContainer>
            <BackgroundImage
                 imageUrl={imageUrl}
            />
            <Body to={`shop/${title}`}>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    )
}

export default CategoryItem;
