import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import "./publichome.css";

function PublicHome(){
    const [catData, setCatdata] = useState([]);
    const [query, setQuery] = useState("");

    axios.defaults.withCredentials = true;

    useEffect( ()=>{
        const getCatdata = async()=>{
            const reqData = await fetch("http://localhost:4000/cats");
            const resData = await reqData.json();
            setCatdata(resData);
            //console.log(resData);
        }
        getCatdata();
    },[]);

    const searchedCatData = (data)=>{
        return data.filter(item=>item.cat_ID.includes(query) || 
                           item.cat_name.includes(query) || 
                           item.cat_type.includes(query) || 
                           item.country_of_origin.includes(query) || 
                           item.origin.includes(query) ||
                           item.size.includes(query) ||
                           item.hair_type.includes(query) ||
                           item.color_pattern.includes(query) ||
                           item.shelter_center.includes(query)
                          );
    }

    return (
        <div>
            <ul>
                <li className='logo'>
                    <img src='/images/cat_shelter_logo.png' alt=''/>
                </li>
                <li className='title'>CAT  SHELTER</li>
            </ul>
            <div className='searchAndAdd'>
                <div className='publicSearchInput'>
                    <input type='text' placeholder='search...' onChange={(event) => setQuery(event.target.value)}/>
                </div>
            </div>
            {searchedCatData(catData).map((item,index) => (
                 <table key={index} className='cat'>
                  <tr>
                    <td colSpan={2} className='cat_image'><img src={"http://localhost:4000/images/" + item.cat_image} alt='' style={{width: '311px', height: '210px'}}/></td>
                 </tr>
                 <tr>
                     <td className='attribute'>ID</td>
                     <td className='data'>{item.cat_ID}</td>
                 </tr>
                 <tr>
                     <td className='attribute'>Name</td>
                     <td className='data'>{item.cat_name}</td>
                 </tr>
                 <tr>
                     <td className='attribute'>Type</td>
                     <td className='data'>{item.cat_type}</td>
                 </tr>
                 <tr>
                     <td className='attribute'>Country of origin</td>
                     <td className='data'>{item.country_of_origin}</td>
                 </tr>
                 <tr>
                     <td className='attribute'>Origin</td>
                     <td className='data'>{item.origin}</td>
                 </tr>
                 <tr>
                     <td className='attribute'>Size</td>
                     <td className='data'>{item.size}</td>
                 </tr>
                 <tr>
                     <td className='attribute'>Hair type</td>
                     <td className='data'>{item.hair_type}</td>
                 </tr>
                 <tr>
                     <td className='attribute'>Color/pattern</td>
                     <td className='data'>{item.color_pattern}</td>
                 </tr>
                 <tr>
                     <td className='attribute'>Shelter center</td>
                     <td className='data'><Link to={''+item.official_website_url	+''}>{item.shelter_center} </Link></td>
                 </tr>
                 <tr>
                     <td className='attribute'>Address</td>
                     <td className='data'><Link to={''+item.map_link+''}>{item.address}</Link></td>
                 </tr>
                 <tr>
                     <td className='attribute'>Business Hours</td>
                     <td className='data'>{item.business_hours}</td>
                 </tr>
                 <tr>
                     <td className='attribute'>Contact Number</td>
                     <td className='data'>{item.contact_number}</td>
                 </tr>
             </table>
            )
            )}
        </div>
    )
}

export default PublicHome;