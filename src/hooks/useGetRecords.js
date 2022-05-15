import React,{useEffect,useState} from 'react'
import Parse from 'parse';
const useGetRecords = () => {
    const[records, setRecords] = useState({
        results:null,
        count:0
    })
useEffect(()=>{
    const getRecords = () =>{
        const Test = Parse.Object.extend("Test");
        const query = new Parse.Query(Test);
        query.withCount();
        query.find().then((data)=>{
            setRecords((st)=>{
                return {...st, ...data}
            })
        }).catch((error)=>{
            console.log(error.message)
        })
    };
    getRecords();
},[])
  return records;
}

export default useGetRecords