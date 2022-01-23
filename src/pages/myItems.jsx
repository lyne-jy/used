import React, { useEffect, useState } from 'react';
import { getItemsByUser } from "../services/itemService";
import ItemList from "../components/itemList";
import { Modal } from "react-bootstrap";
import ItemModifyForms from "../components/itemModifyForms";

const MyItems = () => {
    const [items, setItems] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    useEffect(() => {
        async function getItems() {
            const items = await getItemsByUser();
            setItems(items.data);
        }
        getItems();
    }, [])
    const handleItemClick = (id) => {
        const item = items.find(item => item.id === id);
        setCurrentItem(item);
        setShowDetail(true);
    };

    const hideDetail = () => {
        setShowDetail(false);
    };
    return (
        <div className="container-sm">
            <div className="mb-2"><
                h4 className="pt-3">My Items</h4>
                <small>Click on item to modify or delete.</small>
            </div>
            <ItemList items={items} onItemClick={handleItemClick}/>
            <Modal show={showDetail} onHide={hideDetail} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Modify Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ItemModifyForms item={currentItem}/>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default MyItems;