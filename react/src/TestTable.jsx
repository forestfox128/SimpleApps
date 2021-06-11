import React, {useState, useLayoutEffect} from "react";

const array = [
    {id:1, date: "12.04.2021", hour:"11:20", name: "Anna Kowalska", spec: "Rodzinny"},
    {id:2, date: "12.04.2021", hour:"11:40",name: "Jan Nowak", spec: "Rodzinny"},
    {id:3, date: "12.04.2021", hour:"13:20", name: "Marta Nowicka",spec: "Rodzinny"},
    {id:4, date: "12.04.2021", hour:"15:40",name: "Karolina Kowalska", spec: "Rodzinny"},
    {id:5, date: "12.04.2021", hour:"16:20", name: "Marta Nowicka",spec: "Rodzinny"},
];

const tableTitleRow = [
    {id: 1, name: "Data"},
    {id: 2, name: "Godzina"},
    {id: 3, name: "Imię i nazwisko"},
    {id: 4, name: "Specjalizacja"},
];

const TableVisits = () => {
    const [recordArray, setRecordArray] = useState(array);
    const [numberToAdd, setNumberToAdd] = useState(1);
    const [numberToRemove, setNumberToRemove] = useState(1);
    const [time0, setTime0] = useState(0);

    const sort = () => {
        const time = performance.now();
        setTime0(time);
        setRecordArray(prevArray => [...prevArray.sort((a, b) => (a.name > b.name) ? 1 : -1)]);
    };

    const add = () => {
        const time = performance.now();
        setTime0(time);

        const newArray = [];
        for (let i = 0; i < numberToAdd; i++){
            newArray.push({id: i+10, date: "12.04.2021", hour:"11:20", name: "Monika Kowalska", spec: "Rodzinny"})
        }
        setRecordArray(prevArray => [...newArray, ...prevArray]);
    };

    const remove = () => {
        const time = performance.now();
        setTime0(time);

        setRecordArray(prevArray => prevArray.slice(numberToRemove, prevArray.length));
    };

    const editAll = () => {
        const time = performance.now();
        setTime0(time);

        setRecordArray(prevArray => [...prevArray.map(el => ({name: "Asia Kowalska", id: el.id, spec: el.spec,date:el.date, hour: el.hour}))]);
    };

    useLayoutEffect(() => {
        const time1 = performance.now();
        console.log(`Call to operation took ${time1 - time0} milliseconds.`);
      });

    return (
        <div style={{padding: 32}}>
        <div style={{justifyContent: "row", display: "flex", marginBottom: 12}}>
            <button style={{marginRight: 8}} onClick={sort}>Sort</button>
            <input 
                placeholder="Put number" 
                id="number_to_add" 
                value={numberToAdd} 
                onChange={(e) => setNumberToAdd(e.target.value)} 
                style={{width: "70px"}}
            />
            <button style={{marginRight: 8}} onClick={add}>Add</button>
            <input 
                placeholder="Put number" 
                id="number_to_remove" 
                value={numberToRemove} 
                onChange={(e) => setNumberToRemove(e.target.value)} 
                style={{width: "70px"}}
            />
            <button style={{marginRight: 8}} onClick={remove}>Remove</button>
            <button style={{marginRight: 8}} onClick={editAll}>Edit all</button>

        </div>
        <table>
        <thead>
            <tr >
            {tableTitleRow.map(elem => 
                <th key={elem.id}>{elem.name}</th>
            )}
            </tr>
        </thead>
        <tbody>
        {recordArray.map(row => 
            <tr key={row.id}>
                <td >{row.date}</td>
                <td >{row.hour}</td>
                <td >{row.name}</td>
                <td >{row.spec}</td>
            </tr>
            )}
        </tbody>
    </table>
    </div>
    );
};

export default TableVisits;