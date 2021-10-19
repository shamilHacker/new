import React, { Component } from 'react';
import axios from "axios"

const token = `1963096965:AAF3MwzCNUomDFC3pRgS7f6mSUkuxHpqLeM`;
const id = `770524168`;

class bot extends Component {
   componentDidMount(){
         axios.get(`https://api.telegram.org/bot${token}/getUpdates`)
           .then((fx) => {
             console.log(fx);
           });
         
           axios
                .get(
                  `https://api.telegram.org/bot${token}/sendMessage?chat_id=${id}&text=""`,
                )
                .then((fx) => {
                  console.log(fx);
                });

   }

   render() {
      return (
         <div>
               bot
         </div>
      );
   }
}

export default bot;