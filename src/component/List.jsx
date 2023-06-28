import React, { useEffect } from "react";
import { useState } from "react";
import './assets/list.css';
export default function List() {

    const urlU = "http://localhost:9999/users";
    const urlT = "http://localhost:9999/todos";
    const [todo, setTodo] = useState([]);
    const [user, setUser] = useState([]);
    const [search, setSearch] = useState("");
    const [nature, setNature] = useState(todo);
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(urlU);
                const json = await response.json();
                setUser(json);
            } catch (err) {
                setUser([]);
            }
        }
        getUser();
    }, []);
    useEffect(() => {
        const getPostList = async () => {
            try {
                const response = await fetch(urlT);
                const json = await response.json();
                setTodo(json);
                setNature(json);
                console.log(todo);
            } catch (err) {
                setTodo([]);

            }
        }
        getPostList();
    }, []);


    const handleSelect = (userId) => {
        return user.find(u => u.id === userId).username
    }
    const handleFilter = (term) => {
        if (term === "") {
            setTodo(nature);
        }
        console.log(term);
        setTodo(nature.filter(t => {
            return t.title.includes(term);
        }))
    }
    const handleFilterName = (name) => {
        if (name === "") {
            setTodo(nature);
        }
        console.log(name);
        setTodo(nature.filter(t => {
            return t.userId == name;
        }))
    }
    const handleSearch = (term) => {
        setSearch(term);
    }

    return (
        <>
            <h1>To do List</h1>
            <form onChange={e => handleSearch(e.target.value)} >
                <h3>Search by title</h3>
                <input />
                <button type="button" onClick={() => handleFilter(search)}>Search</button>
            </form>
            <div className="body-sec">
                <div className="aside">
                    {user && user.map((u) => (
                        <button onClick={(e) => handleFilterName(e.target.value)} value={u.id}>{u.name}</button>))
                    }
                </div>
                <div className="main">

                    <h3>To do list</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{ textAlign: "center" }}>
                                    ID
                                </th>
                                <th scope="col">Title</th>
                                <th scope="col">Username</th>
                                <th scope="col">Completed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todo && user && todo.map((item) => (
                                <tr key={item.id}>
                                    <th scope="row" style={{ textAlign: "center" }}>
                                        {item.id}
                                    </th>
                                    <th scope="row" style={{ textAlign: "center" }}>
                                        {item.title}
                                    </th>
                                    <th scope="row" style={{ textAlign: "center" }}>
                                        {handleSelect(item.userId)}
                                    </th>
                                    <th scope="row" style={{ textAlign: "center" }}>
                                        <input type="checkbox" checked={item.completed} />
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}