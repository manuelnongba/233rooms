import { useLoaderData } from '@remix-run/react';

const EditImages = () => {
  const roomImages = useLoaderData();

  return <div>Hello world</div>;
};

export default EditImages;
