import { Form, useFetcher, useLoaderData } from '@remix-run/react';
import Header from '../navigation/Header';

interface RoomImagesInterface {
  id: number;
  image?: string;
  room_id?: number;
}

const EditImages = () => {
  const roomImages = useLoaderData();
  const fetcher = useFetcher();

  const handleDelete = (e: any, imageID: number) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('imageID', String(imageID));

    const confirmed = confirm('Click OK to delete photo');

    if (roomImages.length === 1)
      return alert('You need to have at least one image uploaded.');

    if (confirmed)
      fetcher.submit(formData, {
        method: 'delete',
      });
  };

  const images = roomImages.map((el: RoomImagesInterface) => {
    return (
      <div key={el.id} className="edit-images">
        <img src={`${el.image}`} alt={el.image} />
        <Form onSubmit={(e) => handleDelete(e, el.id)}>
          <button type="submit">Delete Image</button>
        </Form>
      </div>
    );
  });

  return (
    <div>
      <Header />
      {images};
    </div>
  );
};

export default EditImages;
