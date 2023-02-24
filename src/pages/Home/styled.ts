import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

export const Load = styled.h3`
  color: white;
`;

export const StarWarsPaginate = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  font-weight: bold;

  & > li {
    border: 1px solid black;
    background-color: #f4e426;
    color: black;
    border-radius: 7px;
    margin: 3px;
  }

  a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
  }
  & > li.selected > a {
    background-color: #ffffff;
    color: black;
    border-radius: 7px;
  }
`;

export const SearchDiv = styled.div`
  background-color: black;
  border-radius: 5px;
  margin-top: -1.3rem;
`;

export const SearchBtn = styled.button`
  background-color: #f4e426;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

export const ClearBtn = styled.button`
  background-color: #f4e426;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

export const SearchTxt = styled.input`
  border-radius: 5px;
  width: 100%;
`;
