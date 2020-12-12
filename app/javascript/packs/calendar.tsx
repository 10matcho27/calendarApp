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
import { any, bool } from 'prop-types'

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
    let canGo = []
    const changebool = (boole,index) => {
        if(boole==true){
            canGo[index] = false
            console.log("t")
        }else{
            canGo[index] = true
            console.log("f")
        }

        return canGo
    }

    let [cango,setCango] = useState([])

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
                        <button onClick={() => setCango(changebool(cango[getDate(date)],getDate(date)))}>
                        {getDate(date)}
                        <td>{cango[getDate(date)]==true? "o" : "x"}</td>
                      </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
          </table>
      </div>
    );
  }


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Cal />,
    document.body.appendChild(document.createElement('div')),
  )
})
