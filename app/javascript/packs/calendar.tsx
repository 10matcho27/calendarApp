// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.
import React, { useState, useEffect } from 'react';
import format from 'date-fns/format'
import getDate from 'date-fns/getDate'
import getDay from 'date-fns/getDay'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import endOfWeek from 'date-fns/endOfWeek'
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import ReactDOM from 'react-dom'
import { any, bool, string } from 'prop-types'
import axios from 'axios';


const Cal = () => {

    const getCalendarArray = date => {
        const sundays = eachWeekOfInterval({
          start: startOfMonth(date),
          end: endOfMonth(date)
        })
        return sundays.map(sunday =>
          eachDayOfInterval({start: sunday, end: endOfWeek(sunday)})
        )
      }
      
    const targetDate = new Date()
    const calendar = getCalendarArray(targetDate)

    //init//
    let array = []

    for(let i = 0; i<=30 ; i++){
      array.push(1)
    }


    let [cango,setCango] = useState(array)

    const clicked = (array: any[],index: number) => {
      let copy = [...array]
      copy[index] = copy[index]*(-1)
      console.log(copy)
      return copy
    }

    const changearrGetJson = (array,index,data) => {
      let copy = [...array]
      copy[index] = data
      return copy
    }

    const changeArr = array => {
      let copy = [...array]
      return copy
    }

    function getJson(){
      for(let i=0;i<=30;i++){
      const url = '/months/'+(i+1)+'.json'
      axios.get(url).then(
        results=>{
          cango[i]=results.data.date
          console.log(results.data.date)
          setCango(changearrGetJson(cango,i,results.data.date))
        }
      )
      }
    }

    function getJsonTest(){
      const url = '/months.json';
      axios.get(url).then(
        results => {
          const string_json = JSON.stringify(results);
          const from_json = JSON.parse(string_json);
          for(let i=0;i<=30;i++){
            array[i] = from_json.data[i].date;
          }
          console.log(array)
          setCango(changeArr(array))
        }
      )
    }

    function setJson(){
      axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      };
      for(let id=0;id<=30;id++){
      const modify = {date:cango[id] };
      axios
        .put('/months/'+(id+1)+'.json',modify)
        .then(res => {
        })
        .catch(error => {
          alert("Error")
          console.log(error);

        })
      }
      setCango(changeArr(cango));
    }

    function initJson(){
      axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      };
      for(let id=0;id<=30;id++){
      const modify = {date:1};
      axios
        .put('/months/'+(id+1)+'.json',modify)
        .then(res => {
        })
        .catch(error => {
          alert("Error")
          console.log(error);
        })
      }
      getJsonTest()
    }
    
    function alertSubmitFunction(){
      alert("Submitting")
      setJson()
    }

    function alertInitFunction(){
      alert("init")
      getJsonTest()
    }

    function allDel(){
      alert("delete")
      initJson()
    }

    return (
      <div>
          {format(targetDate, 'y年M月')}
          <table>
            <thead>
              <tr>
                <th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th>
              </tr>
            </thead>
            <tbody>
              {calendar.map((weekRow, rowNum) => (
                <tr key={rowNum}>
                  {weekRow.map(date => (
                      <td key={getDay(date)}>
                        <button onClick={() => setCango(clicked(cango,getDate(date)-1))}>
                        
                        {getDate(date)}
                        <td>{cango[getDate(date)-1]==1 ? "o" : "x"}</td>
                      </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
          </table>
          
          <th>
            <button onClick={() => alertSubmitFunction()}>
              提出
            </button>
          </th>
            <button onClick={() => alertInitFunction()}>
              init from db
            </button>
          <th>
            <button onClick={() => allDel()}>
              delete
            </button>
          </th>
      </div>
    );
  }


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Cal />,
    document.body.appendChild(document.createElement('div')),
  )
})
