import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={css.card}>
      {images.map(image => (
        <li
          className={css.galleryItem}
          key={image.id}
          onClick={() => onImageClick(image.urls.regular)}
        >
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
