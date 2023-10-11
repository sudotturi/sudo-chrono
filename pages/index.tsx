import Layout from "../components/layout";
import { useEffect, useState } from 'react'
import { ISudoTodo } from '../utils/constants'

export default function Home() {

  const [data, setData] = useState<Array<ISudoTodo>>([]);
  const [itemValue, setItemValue] = useState("");
  const [reload, setReload] = useState(true);
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {

  }, [reload]);

  useEffect(() => {
    var sData = localStorage.getItem("TODO_LIST");
    var pData = JSON.parse(sData || JSON.stringify([{ text: "Read a book", dateTime: new Date(), done: false }]));
    setData(pData);
    setMounted(true);
  }, [])

  const addData = () => {
    if (!!itemValue) {
      var dataDup = data;
      dataDup.push({ text: itemValue, dateTime: new Date(), done: false });
      setData(dataDup);
      localStorage.setItem("TODO_LIST", JSON.stringify(dataDup));
      setItemValue("");
      setReload(!reload)
    }
  }

  const onKey = (key: string) => {
    if (key == "Enter")
      addData();
  }


  const deleteItem = (ind: number) => {
    var dataDup = data;
    dataDup.splice(ind, 1);
    setData(dataDup);
    localStorage.setItem("TODO_LIST", JSON.stringify(dataDup));
    setReload(!reload);
  }
  
  const updateDone = (checked: any, index: number) => {
    var dataDup = data;
    if (checked.value) {
      dataDup[index].done = true;
      setData(dataDup);
      localStorage.setItem("TODO_LIST", JSON.stringify(dataDup));
      setReload(!reload);
    }
  }

  return (
    <Layout>
      <main className='todo-main'>
        <div className="container app-container bg-gray-200 dark:bg-gray-800" id="taskList">
          <h1 className="dark:text-gray-200 text-gray-900 text-xl">TO DO LIST</h1>
          <div className="add-task">
            <input
              type="text"
              autoComplete="off"
              placeholder="Add New Task"
              className="task-input text-blue-900 dark:text-gray-100"
              value={itemValue}
              onChange={(e) => setItemValue(e.target.value)}
              onKeyUp={(e) => onKey(e.code)}
            />
            <button
              type="button"
              defaultValue=""
              className="submit-task"
              title="Add Task"
              onClick={() => addData()}
            />
          </div>

          <ul className="task-list">
            {data?.map((item, index) => (
              <li className="task-list-item" v-for="task in tasks" key={index}>
                <label className="task-list-item-label">
                  <input type="checkbox" onChange={(e) => updateDone(e.target, index)} defaultChecked={item?.done} />
                  <span>{item?.text}</span>
                </label>
                <button className="delete-btn" title="Delete Task" onClick={() => deleteItem(index)} />
              </li>
            ))}
          </ul>
        </div>

      </main>
    </Layout>
  )
}
