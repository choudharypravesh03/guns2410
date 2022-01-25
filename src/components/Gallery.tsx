import React from 'react'
import styled from 'styled-components'
import { PhotosType } from '../services/photoService';

type GalleryProps = {
	photos: PhotosType[]
}

type GalleryTileProp = {
	photo: PhotosType,
	key: string
}

const Gallery = ({ photos }: GalleryProps) => {
    return (
        <GalleryContainer className="tiles">
            {photos.map((item: any) => {
                return <Tile photo={item} key={item.id} />
            })}
        </GalleryContainer>
    );
} 

const Tile = ({ photo, key }: GalleryTileProp) => {
		let tileStyle = {
            width: '18vw',
            height: '18vw'
        };

		const redirectToOriginal = (item: PhotosType) => {
			window.location.href = item.link
		}

		return (
			<div onClick={() => redirectToOriginal(photo)} className="tile">
				<img
					src={photo.url}
					alt={photo.description}
					style={tileStyle}
				/>
				<div className="user">{photo.user}</div>
				<div className="description">{photo.description}</div>
			</div>
		)
}

const GalleryContainer = styled.div`
    padding: 6vh 6vw;
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
        height: 21vw;
    	text-align: left;
		transition: transform 500ms ease;
		img {
			width: 100%;
    	}
		.user {
			margin-top: 10px;
		}
		.description {
			margin-top: 5px;
			font-size: 12px;
			text-transform: 'capitalize'
		}
		:hover {
			transform: scale(1.1);
		}
    }
`

export default Gallery