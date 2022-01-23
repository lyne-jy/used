import React from 'react';
import { Dropdown } from "react-bootstrap";

const Sorting = ({onSortingChange}) => {
    return (
        <Dropdown>
            <Dropdown.Toggle>
                Sort by
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => onSortingChange(0)}>New Posting</Dropdown.Item>
                <Dropdown.Item onClick={() => onSortingChange(1)}>Lowest Price</Dropdown.Item>
                <Dropdown.Item onClick={() => onSortingChange(2)}>Highest Price</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Sorting;