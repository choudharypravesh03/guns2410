import React, { useEffect, useState } from 'react';
import './App.css';
import CategoryChips from './components/CategoryChips';
import Gallery from './components/Gallery';
import Loader from './components/Loader';
import { getPhotos, PhotosType } from './services/photoService';

const App = () => {

  const [ allPhotos, setAllPhotos ] = useState<PhotosType[]>()
  const [ filteredPhotos, setFilteredPhotos ] = useState<PhotosType[]>()
  const [ isLoading, setIsLoading ] = useState<boolean>(true)
  const [ categories, setCategories ] = useState<string[]>()
  const [ selectedCategory, setSelectedCategory ] = useState<string>('all')

  useEffect(() => {
    (async () => {
      await fetchPhotos()
    })();
  }, [])


  const fetchPhotos = async () => {
    try {
      const photos = await getPhotos()
      setAllPhotos(photos)
      const categories = getCategories(photos)
      setCategories(categories)
      setSelectedCategory(categories[0])
      setFilteredPhotos(photos)
    } catch(err) {
      alert("Some error occured. We are working on it!")
    } finally {
      setIsLoading(false)
    }
  }

  const filterByTopics = (item: string) => {
    setSelectedCategory(item)
    if (allPhotos) {
      const photosByTopic = allPhotos.filter(photo => {
        if(item === 'all') { return true }
        return photo.topics.includes(item)
      })
      setFilteredPhotos(photosByTopic)
    }
  }

  const getCategories = (photos: PhotosType[]) => {
    const topicsNestedArray = photos.map(item => item.topics)
    const flatTopicsArray = Array.from(new Set(topicsNestedArray.flat(1)))
    return [ 'all', ...flatTopicsArray]
  }

  return (
    <div className="App">
      {isLoading && <Loader />}
      {categories && <CategoryChips 
        categories={categories} 
        onFilterSelect={filterByTopics} 
        selectedCategory={selectedCategory}
      />}
      {filteredPhotos && <Gallery photos={filteredPhotos} />}
    </div>
  );
}

export default App;
