import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleUser,faTrashCan} from '@fortawesome/free-solid-svg-icons';
import "./favourites.css";
import { Icon } from 'react-icons-kit';
import {home} from 'react-icons-kit/fa/home';
import {logout} from 'react-icons-kit/iconic/logout';
import {angleDown} from 'react-icons-kit/fa/angleDown';
import {angleUp} from 'react-icons-kit/fa/angleUp';
import { GoogleLogout } from 'react-google-login';

function Favourites(){
    const [catData, setCatdata] = useState([]);
    const [query, setQuery] = useState("");

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [icon, setIcon] = useState(angleDown);

    const clientId = "698962701202-v9qqu7b05m7pdfg7e1gg2qst86hal169.apps.googleusercontent.com";
   
    const member_username = "Kenny";
    useEffect( ()=>{
      axios.get("http://localhost:4000/favourites/" + member_username)
        .then(res => {
            console.log(res.data);
            setCatdata(res.data);
        })
        .catch(err => console.log(err));
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

    const handleDelete = (catID) => {
        console.log(catID);
        axios.post("http://localhost:4000/deleteFavourite/" + catID )
        .then(res => {
            if(res.data.deleted){
                navigate("/favourites");
            }else{
                alert("not deleted");
            }
        })
        .catch(err => console.log(err));
    }

    const LogoutSuccess = () => {
        console.log("Sign Out Success!");
        navigate("/membersignin");
    }

    const handleOpen = () =>{
        setOpen(!open)
        if(open){
            setIcon(angleDown);
        }else{
            setIcon(angleUp);
        }
    }

    return(
        <div>
            <ul>
                <li className='logo'>
                    <img src='/images/cat_shelter_logo.png' alt=''/>
                </li>
                <li className='title'>CAT  SHELTER</li>
                <li className='homelogo'><Link to="/memberhome" className='dropdownlink'><Icon icon={home} className="homeicon" size={28}/></Link></li>
                <li className='personinfo' onClick={handleOpen}>
                    <FontAwesomeIcon icon={faCircleUser} className='circleuser'/> <span className='username'>Henry</span> <Icon icon={icon} size={25} className='angledown'/>
                </li>
            </ul>
            <div className={`dropdown-menu ${open? 'active': 'inactive'}`}>
                <ul>
                    <li className='dropdownItem'>
                        <Link to="/membersignin" className='dropdownlink'><Icon icon={logout} size={25} className='dropdownicon'/><span className='dropdowntext'>Sign Out</span></Link>
                    </li>
                    <li className='dropdownItem'>
                        <GoogleLogout
                            clientId={clientId}
                            buttonText={'Sign Out with Google'}
                            onLogoutSuccess={LogoutSuccess} 
                        />
                    </li>
                </ul>
            </div>
            <center>
                <div className='favouriteSearchInput'>
                    <input type='text' placeholder='search...' onChange={(event) => setQuery(event.target.value)}/>
                </div>
            </center>
            <center>
            <table className='favourites'>
                <tr>
                    <th className='table_header'>ID</th>
                    <th className='table_header'>Image</th>
                    <th className='table_header'>username</th>
                    <th className='table_header'>Name</th>
                    <th className='table_header'>Type</th>
                    <th className='table_header'>Country of origin</th>
                    <th className='table_header'>Origin</th>
                    <th className='table_header'>Size</th>
                    <th className='table_header'>Hair type</th>
                    <th className='table_header'>Color/Pattern</th>
                    <th className='table_header'>Shelter center</th>
                    <th className='table_header'>Address</th>
                    <th className='table_header'>Business Hours</th>
                </tr>
                {searchedCatData(catData).map((item,index) => (
                        <tr key={index}>
                            <td className='data'>{item.cat_ID}</td>
                            <td className='data'> <img src={"http://localhost:4000/images/" + item.cat_image} alt='' style={{width: '150px', height: '150px'}}/></td>
                            <td className='data'>{item.member_username}</td>
                            <td className='data'>{item.cat_name}</td>
                            <td className='data'>{item.cat_type}</td>
                            <td className='data'>{item.country_of_origin}</td>
                            <td className='data'>{item.origin}</td>
                            <td className='data'>{item.size}</td>
                            <td className='data'>{item.hair_type}</td>
                            <td className='data'>{item.color_pattern}</td>
                            <td className='data'><Link to={''+item.official_website_url	+''}>{item.shelter_center} </Link></td>
                            <td className='data'><Link to={''+item.map_link+''}>{item.address}</Link></td>
                            <td className='data'>{item.business_hours}</td>
                            <td className='data'><button onClick={()=>handleDelete(item.cat_ID)} className='btn_delete'><FontAwesomeIcon icon={faTrashCan} className='trashcan'/></button></td>
                        </tr>
                    )
                )}
            </table>
            </center>
        </div>
    )
}

export default Favourites;