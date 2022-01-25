import React from 'react'
import styled from 'styled-components'
import { PhotosType } from '../services/photoService';

type GalleryProps = {
	photos: PhotosType[]
}

const Gallery = ({ photos }: GalleryProps) => {
    return (
        <GalleryContainer className="tiles">
            {photos.map((item: any) => {
                return <Tile item={item} key={item.id} />
            })}
        </GalleryContainer>
    );
} 

const Tile = ({ item }: any) => {
		let tileStyle = {
            width: '18vw',
            height: '18vw'
        };

		return (
			<div className="tile">
				<img
					src={item.url}
					alt={item.description}
					style={tileStyle}
				/>
			</div>
		)
}

const GalleryContainer = styled.div`
    padding: 6vh 16vw;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    position: relative;
    .tile {
        margin: 15px;
        cursor: pointer;
        overflow: hidden;
        width: 18vw;
        height: 18vw;
    }
    .tile img {
        width: 100%;
        transition: transform 500ms ease;
    }
    .tile img:hover {
        transform: scale(1.1);
    }
`

export default Gallery