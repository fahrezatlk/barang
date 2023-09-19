import "./App.css";
import List from "./List";
import { useState, useEffect } from "react";
import { uid } from "uid";
import axios from "axios";

let api = axios.create({ baseURL: "http://localhost:3001" });

function App() {
  const [items, setItems] = useState([]);

  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });

  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  useEffect(() => {
    // fetch data dsini dan set contact

    api.get("/contacts").then((res) => {
      setItems(res.data);
    });
  }, []);

  function handleChange(e) {
    let newFormState = { ...formData };
    newFormState[e.target.name] = e.target.value;
    setFormData(newFormState);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let data = [...items];

    if (formData.name === "") {
      return false;
    }
    if (formData.price === "") {
      return false;
    }

    if (isUpdate.status) {
      data.forEach((item) => {
        if (item.id === isUpdate.id) {
          item.name = formData.name;
          item.price = formData.price;
        }
      });
      api
        .put("/items/" + isUpdate.id, {
          id: isUpdate.id,
          name: formData.name,
          price: formData.price,
        })
        .then(() => {
          alert("Data diupdate");
        });
      // update berdasarkan id
    } else {
      let toSave = {
        id: uid(),
        name: formData.name,
        price: formData.price,
      };
      data.push(toSave);

      // menambahkan data
      api.post("/items", toSave).then(() => {
        alert("Data ditambahkan");
      });
    }
    setItems(data);
    setIsUpdate(false);
    setFormData({ name: "", price: "" });
  }

  function handleEdit(id) {
    // cari data di state
    // isi data ke state form
    let data = [...items];
    let foundData = data.find((item) => item.id === id);
    setIsUpdate({ status: true, id: id });
    setFormData({ name: foundData.name, price: foundData.price });
  }

  function handleDelete(id) {
    let data = [...items];
    let filteredData = data.filter((item) => item.id !== id);

    // menghapus data
    api.delete("/items/" + id).then(() => alert("Data berhasil dihapus"));
    setItems(filteredData);
  }

  return (
    <div className="App">
      <div className="fixed-top bg-white pb-3 mx-auto" style={{ width: 250 }}>
        <h1 className="px-3 py-3 font-weight-bold">DATA BARANG</h1>
        <form onSubmit={handleSubmit} className="px-3 py-4">
          <div className="form-group">
            <label htmlFor="">Nama: </label>
            <input
              type="text"
              onChange={handleChange}
              className="form-control"
              value={formData.name}
              name="name"/>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="">Harga: </label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.price}
              className="form-control"
              name="price"/>
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Simpan
            </button>
          </div>
        </form>
      </div>
      <div style={{ marginTop: 200 }}>
        <List
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          data={items}
        />
      </div>
    </div>
  );
}

export default App;