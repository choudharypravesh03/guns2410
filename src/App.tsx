import React, { useEffect, useState } from 'react';
import './App.css';
import Gallery from './components/Gallery';
import Loader from './components/Loader';
import { getPhotos, PhotosType } from './services/photoService';

const App = () => {

  const [ photos, setPhotos ] = useState<PhotosType[]>()
  const [ isLoading, setIsLoading ] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      await fetchPhotos()
    })();
  }, [])


  const fetchPhotos = async () => {
    try {
      const photos = await getPhotos()
      setPhotos(photos)
    } catch(err) {
      alert("Some error occured. We are working on it!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="App">
      {isLoading && <Loader />}
      {photos && <Gallery photos={photos} />}
    </div>
  );
}

export default App;
