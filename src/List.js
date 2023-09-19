import React from "react";

export default function List({ data, handleEdit, handleDelete }) {
  return (
    <div className="list-group">
      {data.map((item, index) => {
        return (
          <div key={index} className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{item.name}</h5>
              <div>
                <button
                  onClick={() => handleEdit(item.id)}
                  className="btn btn-sm btn-link">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn btn-sm btn-link"
                >
                  Hapus
                </button>
              </div>
            </div>
            <p className="mb-1">{item.price}</p>
          </div>
        );
      })}
    </div>
  );
}