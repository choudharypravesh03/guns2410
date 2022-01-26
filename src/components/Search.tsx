import React from 'react'
import styled from 'styled-components';

type SearchProps = {
    onSearch: (text: string) => void
}

const Search = ({ onSearch }: SearchProps) => {

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        onSearch(value)
    }

    return(
        <SearchContainer>
            <form className="search-container">
                <input onChange={onChange} type="text" id="search-bar" placeholder="Search your images here..." />
                <a href="#"><img className="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png" /></a>
            </form>
        </SearchContainer>
    )
}


const SearchContainer = styled.div`
    width: 490px;
    display: block;
    margin: 5% auto;

    input#search-bar{
    margin: 0 auto;
    width: 100%;
    height: 45px;
    padding: 0 20px;
    font-size: 1rem;
    border: 1px solid #D0CFCE;
    outline: none;
    &:focus{
        transition: 0.35s ease;
        &::-webkit-input-placeholder{
        transition: opacity 0.45s ease; 
        opacity: 0;
        }
        &::-moz-placeholder {
        transition: opacity 0.45s ease; 
        opacity: 0;
        }
        &:-ms-placeholder {
        transition: opacity 0.45s ease; 
        opacity: 0;
        }    
    }
    }

    .search-icon{
        position: relative;
        float: right;
        width: 75px;
        height: 75px;
        top: -62px;
        right: -45px;
    }
`


export default Search;