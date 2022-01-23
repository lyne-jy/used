import React from 'react';
import { Card, Form, ListGroup } from "react-bootstrap";

const ItemFilter = ({filter, onFilterChange, search, onSearchChange, attributes}) => {
    const {categories, locations, conditions} = attributes;
    return (
        <Card style={{width: '18rem'}}>
            <Card.Body>
                <b>Search</b>
                <Form.Control type="search"
                              placeholder="Search..."
                              className="mb-3 mt-1"
                              onChange={e => onSearchChange(e.currentTarget.value)}
                              value={search}/>
                <b>Category</b>
                <ListGroup variant="flush">
                    <ListGroup.Item key={"all"}
                                    onClick={() => onFilterChange({...filter, category: ""})}
                                    active={!filter.category}
                                    action>
                        All Categories
                    </ListGroup.Item>
                    {categories.map(category =>
                        <ListGroup.Item key={category}
                                        onClick={() => onFilterChange({...filter, category})}
                                        active={filter.category === category}
                                        action>
                            {category}
                        </ListGroup.Item>
                    )}
                </ListGroup>
                <br/>
                <b>Location</b>
                <ListGroup variant="flush">
                    <ListGroup.Item onClick={() => onFilterChange({...filter, location: ""})}
                                    active={!filter.location}
                                    action>
                        All Locations
                    </ListGroup.Item>
                    {locations.map(location =>
                        <ListGroup.Item key={location}
                                        onClick={() => onFilterChange({...filter, location})}
                                        active={filter.location === location}
                                        action>
                            {location}
                        </ListGroup.Item>)}
                </ListGroup>
                <br/>
                <b>Condition</b>

                <ListGroup variant="flush">
                    <ListGroup.Item onClick={() => onFilterChange({...filter, condition: ""})}
                                    active={!filter.condition}
                                    action>
                        All Conditions
                    </ListGroup.Item>
                    {conditions.map(condition =>
                        <ListGroup.Item key={condition}
                                        onClick={() => {onFilterChange({...filter, condition})}}
                                        active={filter.condition === condition}
                                        action>
                            {condition}
                        </ListGroup.Item>)}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default ItemFilter;