import { Form, useFetcher, useLoaderData } from '@remix-run/react';
import Header from '../navigation/Header';
import { useEffect, useState } from 'react';
import { LoaderFunction } from '@remix-run/node';

interface RoomImagesInterface {
  id: number;
  image?: string;
  room_id?: number;
}

const EditImages = () => {
  const { roomImages } = useLoaderData<LoaderFunction>();
  const [images, setImages] = useState();
  const fetcher = useFetcher();

  const handleDelete = (
    e: React.FormEvent<HTMLFormElement>,
    imageID: number
  ) => {
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

  useEffect(() => {
    setImages(
      roomImages.map((el: RoomImagesInterface) => {
        return (
          <div key={el.id} className="edit-images">
            <img src={`${el.image}`} alt={el.image} />
            <Form onSubmit={(e) => handleDelete(e, el.id)}>
              <button type="submit">Delete Image</button>
            </Form>
          </div>
        );
      })
    );
  }, [roomImages]);

  return (
    <div>
      <Header />
      {images};
    </div>
  );
};

export default EditImages;
