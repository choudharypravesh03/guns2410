import React from 'react'
import styled from 'styled-components'

export type CategoryProps = {
    categories: string[];
    selectedCategory: string;
    onFilterSelect: (filter: string) => void;
}

const CategoryChips = ({ categories, selectedCategory, onFilterSelect }: CategoryProps) => {

    const selectFilter = (item: string) => {
        onFilterSelect(item)
    }

    const listTitles = categories.map((item: any) => 
        <li 
            onClick={() => selectFilter(item)} 
            className={selectedCategory === item ? "tab-title tab-title--active" : "tab-title"}
        >
            {item}
        </li>
    )       
                                     
    const listContent = categories.map((item: string) => 
        <p style={selectedCategory === item ? {} : {display: 'none'}}>{item}</p>
    )
    
    return(
        <CategoryChipsContainer>
          <ul className="tabs-titles">
            {listTitles}
          </ul>
        </CategoryChipsContainer>
      )
}


const CategoryChipsContainer = styled.div`
  .tabs-titles{
    list-style: none;
    padding: 0px;
    margin: 0;
    overflow: scroll;
    white-space: nowrap;
    height: 50px;
  }
  .tab-title{
    background-color: #fff;
    display: inline-block;
    padding: 10px 15px;
    color: #c7c6c2;
    cursor: pointer;
    margin-left:1px;
    text-transform: capitalize;
  }
  .tab-title--active {
    background-color: #ddd;
    color: #00070a;
    border-radius: 20px;
  }
  .tab-content{
    background-color: #f5f5f5;
    padding: 5px;
    margin: 0;
  }
`


export default CategoryChips