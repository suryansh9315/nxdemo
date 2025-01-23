// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { AiFillPlusCircle } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoIosSave } from "react-icons/io";

const PackageTable = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      name: 'Anesthesia',
      itemType: 'Service',
      qty: 1,
      unitPrice: 150,
      subtotal: 150,
      notes: 'For general anesthesia use',
    },
    {
      id: 2,
      name: 'Surgical Pack',
      itemType: 'Medical Supplies',
      qty: 1,
      unitPrice: 50,
      subtotal: 50,
      notes: 'Sterilized kit for surgery',
    },
    {
      id: 3,
      name: 'Pain Medication',
      itemType: 'Medicine',
      qty: 3,
      unitPrice: 20,
      subtotal: 60,
      notes: 'Post-op pain management',
    },
  ]);

  const [editRowId, setEditRowId] = useState(null);

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      name: '',
      itemType: '',
      qty: 0,
      unitPrice: 0,
      subtotal: 0,
      notes: '',
    };
    setRows([...rows, newRow]);
    setEditRowId(newRow.id);
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? {
              ...row,
              [name]: name === 'qty' || name === 'unitPrice' ? Number(value) : value,
              subtotal:
                name === 'qty' || name === 'unitPrice'
                  ? name === 'qty'
                    ? Number(value) * row.unitPrice
                    : row.qty * Number(value)
                  : row.subtotal,
            }
          : row
      )
    );
  };

  const handleSaveRow = (id) => {
    setEditRowId(null);
  };

  const handleDeleteRow = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  return (
    <div className="PackageTableDiv">
      <div className="PackageHead">
        <h3>Package Items <span>(6)</span> </h3>
        <Button  onClick={handleAddRow}>
          <AiFillPlusCircle /> Add
        </Button>
      </div>
      <Table className="Packgetable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Item Type</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Subtotal</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {editRowId === row.id ? (
                <>
                  <td>
                    <Form.Control
                      type="text"
                      name="name"
                      value={row.name}
                      onChange={(e) => handleInputChange(e, row.id)}
                      placeholder="Enter name"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="itemType"
                      value={row.itemType}
                      onChange={(e) => handleInputChange(e, row.id)}
                      placeholder="Enter item type"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      name="qty"
                      value={row.qty}
                      onChange={(e) => handleInputChange(e, row.id)}
                      placeholder="Enter quantity"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      name="unitPrice"
                      value={row.unitPrice}
                      onChange={(e) => handleInputChange(e, row.id)}
                      placeholder="Enter unit price"
                    />
                  </td>
                  <td>USD {row.subtotal}</td>
                  <td>
                    <Form.Control
                      type="text"
                      name="notes"
                      value={row.notes}
                      onChange={(e) => handleInputChange(e, row.id)}
                      placeholder="Enter notes"
                    />
                  </td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => handleSaveRow(row.id)}
                    >
                      <IoIosSave />
                    </Button>{' '}
                    <Button variant="danger" onClick={() => handleDeleteRow(row.id)}>
                      <RiDeleteBin5Line />
                    </Button>
                  </td>
                </>
              ) : (
                <>
                  <td>{row.name}</td>
                  <td>{row.itemType}</td>
                  <td>{row.qty}</td>
                  <td>USD {row.unitPrice}</td>
                  <td>USD {row.subtotal}</td>
                  <td>{row.notes}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => setEditRowId(row.id)}
                    >
                      <FiEdit3 />
                    </Button>{' '}
                    <Button variant="danger" onClick={() => handleDeleteRow(row.id)}>
                      <RiDeleteBin5Line />
                    </Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PackageTable;
