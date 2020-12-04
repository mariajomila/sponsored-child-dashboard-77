import React, {  useEffect,useState } from 'react';

import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function App(){
  const [sponsoredChildren, setSponsoredChildren] = useState(null);
  const getSponsoredData=()=>{
    fetch('https://stg-svc.worldvision.ca/donorservice/api/profile/0c5cff858031433189bb6b392175e3ee/donor/children/en/NamedPrivate?svc=45507'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        setSponsoredChildren(myJson)
      });
  }
  useEffect(()=>{
    getSponsoredData()
  },[])
  const Loading=()=> {
    return (
      <>
        <div className="lds-ring">
            <div /><div /><div />
         </div>
       </>
    
        )
  }
  return (
    <div className="container">
    <div class="card">
  <div class="card-header">
    Sponsored Child Dashboard
  </div>
  <div class="card-body">
     
      {!sponsoredChildren && <center><Loading /> <br /> <span >Loading</span></center>}
      {sponsoredChildren && Object.entries(sponsoredChildren).map(function ([key, val]) {
      return (
        <div class="row row-cols-1 row-cols-md-3">
        {sponsoredChildren[key] && <ShowSponsoredData key={key} data={JSON.stringify(sponsoredChildren[key])} />}
        
        </div>
      )
    })
  }
   </div>
   </div>
   </div> 
  )
}

const ShowSponsoredData = (props) => {
    var dataString = props.data
    var sponsoredChildrenData = JSON.parse(dataString);
    return(
<> {

sponsoredChildrenData && sponsoredChildrenData.map((r,key)=>(
  <div class="col mb-4">
<Card>
  <Card.Img variant="top" src={r.imageLatestUrl} />
  <Card.Body>
    <Card.Title>{r.fullName}</Card.Title>
    <Card.Text>
      <div className="row">
        <div className="col-6">Gender:</div>
        <div className="col-6"> {r.gender}</div>
        </div>
        <div className="row">
        <div className="col-6">Country:</div>
        <div className="col-6"> {r.country}</div>
        </div>
        <div className="row">
        <div className="col-6">Gender:</div>
        <div className="col-6"> {r.favoriteSubject ? r.favoriteSubject : "None"}</div>
        </div>
      
    </Card.Text>
   
  </Card.Body>
</Card>
</div>

))
}</>
    )
  }