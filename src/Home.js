import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleUser,faPenToSquare,faTrashCan} from '@fortawesome/free-solid-svg-icons';
import "./Home.css";
import { Icon } from 'react-icons-kit';
import {home} from 'react-icons-kit/fa/home';
import {logout} from 'react-icons-kit/iconic/logout';
import {angleDown} from 'react-icons-kit/fa/angleDown';
import {angleUp} from 'react-icons-kit/fa/angleUp';
import {plus} from 'react-icons-kit/feather/plus'
//import {decrypt} from 'n-krypta';

function Home(){
    const [catData, setCatdata] = useState([]);
    const [query, setQuery] = useState("");

    const [open, setOpen] = useState(false);
    const [icon, setIcon] = useState(angleDown);

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

    const navigate = useNavigate();

    const handleDelete = (catID) => {
        //console.log(catID);
        axios.post("http://localhost:4000/deleteCat/" + catID)
        .then(res => {
            if(res.data.deleted){
                navigate("/home");
            }else{
                alert("not deleted");
            }
        })
    }

    const handleOpen = () =>{
        setOpen(!open)
        if(open){
            setIcon(angleDown);
        }else{
            setIcon(angleUp);
        }
    }

    return (
        <div>
            <ul>
                <li className='logo'>
                    <img src='/images/cat_shelter_logo.png' alt=''/>
                </li>
                <li className='title'>CAT  SHELTER</li>
                <li className='homelogo'><Link className='dropdownlink'><Icon icon={home} className="homeicon" size={28}/></Link></li>
                <li className='personinfo' onClick={handleOpen}>
                    <FontAwesomeIcon icon={faCircleUser} className='circleuser'/> <span className='username'>Henry</span> <Icon icon={icon} size={25} className='angledown'/>
                </li>
            </ul>
            <div className={`dropdown-menu ${open? 'active': 'inactive'}`}>
                <ul>
                    <li className='dropdownItem'>
                        <Link to="/addCat" className='dropdownlink'><Icon icon={plus} size={25} className='dropdownicon'/><span className='dropdowntext'>Add Cat</span></Link>
                    </li>
                    <li className='dropdownItem'>
                        <Link to="/" className='dropdownlink'><Icon icon={logout} size={25} className='dropdownicon'/><span className='dropdowntext'>Sign Out</span></Link>
                    </li>
                </ul>
            </div>
            <div className='searchAndAdd'>
                <div className='searchInput'>
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
                 <tr className='action'>
                    <button className='edit'> <Link to={"/editCat/" + item.cat_ID}><FontAwesomeIcon icon={faPenToSquare} className='penToSquare'/></Link></button>
                     <button onClick={()=>handleDelete(item.cat_ID)} className="delete"><FontAwesomeIcon icon={faTrashCan} className='trashcan'/></button>
                 </tr>
             </table>
            )
            )}
        </div>
    )
}

export default Home;