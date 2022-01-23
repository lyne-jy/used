import React, { useEffect, useState } from 'react';
import ItemList from "../components/itemList";
import ItemFilter from "../components/itemFilter";
import { Col, Row } from "react-bootstrap";
import ItemDetail from "../components/itemDetail";
import MyPagination from "../components/pagination";
import Sorting from "../components/sorting";
import { getItems } from "../services/itemService";


const Home = () => {
    const itemsPerPage = 5;
    const [showDetail, setShowDetail] = useState(false);
    const [currentItem, setCurrentItem] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sorting, setSorting] = useState(0);
    const [filter, setFilter] = useState({category: "", location: "", condition: ""})
    const [search, setSearch] = useState("")
    const [items, setItems] = useState([]);
    const [attributes, setAttributes] = useState({categories:[], locations:[], conditions:[]})
    useEffect(() => window.scrollTo(0, 0), [currentPage]);
    useEffect(() => setCurrentPage(1), [filter]);
    useEffect(() => {
        async function getData() {
            const items = await getItems();
            const attributes = {categories:[], locations:[], conditions:[]};
            for (const item of items.data) {
                if (!attributes.categories.includes(item.category)) attributes.categories.push(item.category);
                if (!attributes.locations.includes(item.location)) attributes.locations.push(item.location);
                if (!attributes.conditions.includes(item.condition)) attributes.conditions.push(item.condition);
            }
            setAttributes(attributes);
            setItems(items.data.reverse());
        }
        getData();
    }, [])

    const handleItemClick = (id) => {
        setShowDetail(true);
        setCurrentItem(items.find(item => item.id ===id));
    };

    const hideDetail = () => {
        setShowDetail(false);
    };

    const getFilteredItems = (items) => {
        let filteredItems = [...items];
        if (search) filteredItems =  filteredItems.filter(item =>
            (item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase())))
        for (const key in filter)
            if (filter[key]) filteredItems = filteredItems.filter(item => item[key] === filter[key])
        return filteredItems;
    };

    const getPagedItems = (items) => {
        return items.filter(item => (items.indexOf(item) >= (currentPage - 1) * itemsPerPage) && (items.indexOf(item) < currentPage * itemsPerPage));
    };

    const getSortedItems = (items) => {
        let sortedItems = [...items];
        if (sorting === 0) return sortedItems;
        if (sorting === 1) return sortedItems.sort((item1, item2) => item1.price - item2.price)
        if (sorting === 2) return sortedItems.sort((item1, item2) => item2.price - item1.price)
    };

    return (
        <div className="mx-5 mt-3">
            <Row className="mb-2">
                <h4>Browse</h4>
                <Col className="d-flex justify-content-between">
                    <small>Click on item to see details.</small>
                    <Sorting onSortingChange={id => setSorting(id)} /></Col>
                <Col md={{span: 3}}/>
            </Row>
            <Row>
                <Col>
                    <ItemList onItemClick={handleItemClick}
                              items={getPagedItems(getFilteredItems(getSortedItems(items)))}/>
                    <MyPagination itemsPerPage={itemsPerPage}
                                  onPageChange={page => setCurrentPage(page)}
                                  currentPage={currentPage}
                                  totalItems={getFilteredItems(items).length}/>
                </Col>
                <Col md={{span: 3}}>
                    <ItemFilter filter={filter}
                                onFilterChange={setFilter}
                                search={search}
                                onSearchChange={setSearch}
                                attributes={attributes}/>
                </Col>
            </Row>
            <ItemDetail onHide={hideDetail} show={showDetail} item={currentItem}/>
        </div>
    );
};

export default Home;