import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons';
import "./memberhome.css";
import { Icon } from 'react-icons-kit';
import {home} from 'react-icons-kit/fa/home';
import {bookmark} from 'react-icons-kit/fa/bookmark';
import {logout} from 'react-icons-kit/iconic/logout';
import {angleDown} from 'react-icons-kit/fa/angleDown';
import {angleUp} from 'react-icons-kit/fa/angleUp';
import {plus} from 'react-icons-kit/feather/plus'

function MemberHome(){
   
    const [catData, setCatdata] = useState([]);
    const [query, setQuery] = useState("");

    const [open, setOpen] = useState(false);
    const [icon, setIcon] = useState(angleDown);

    const clientId = "698962701202-v9qqu7b05m7pdfg7e1gg2qst86hal169.apps.googleusercontent.com";
    //console.log(query);
    //console.log(catData.filter(cat=>cat.cat_name.includes("Ki")));
    //const [username, setUsername] = useState("");

    const navigate = useNavigate();

    var cat_ID = "";
    var member_username = "";
    var catName = "";
    var catType = "";
    var countryOfOrigin = "";
    var origin = "";
    var size = "";
    var hairType = "";
    var color_pattern = "";
    var shelter_center = "";
    var catImage = "";
    var address = "";
    var businessHours = "";
    var contactNum = "";
    var mapLink = "";
    var offcialWebsiteURL = "";
    //const [cat_ID, setCatID] = useState("");

    //const onSuccess = () => {
    //    console.log("Sign Out Success!");
    //}

    axios.defaults.withCredentials = true;

    useEffect(()=> {
        axios.get("http://localhost:4000/MemberSession")
            .then(res => {
                console.log(res);
                if(res.data === "Empty"){
                   alert("session is empty");
                }else{
                    console.log(res.data.username);
                }
            });
    }, []);

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

    const addFavourites = (catID) => {
        axios.get("http://localhost:4000/favourite/" + catID)
            .then(res => {
                //console.log(res);
                cat_ID = res.data[0].cat_ID;
                //setCatID(res.data[0].cat_ID);
                member_username = "Kenny";
                catName = res.data[0].cat_name;
                catType = res.data[0].cat_type;
                countryOfOrigin = res.data[0].country_of_origin;
                origin = res.data[0].origin;
                size = res.data[0].size;
                hairType = res.data[0].hair_type;
                color_pattern = res.data[0].color_pattern;
                shelter_center = res.data[0].shelter_center;
                catImage = res.data[0].cat_image;
                address = res.data[0].address;
                businessHours = res.data[0].business_hours;
                contactNum = res.data[0].contact_number;
                mapLink = res.data[0].map_link;
                offcialWebsiteURL = res.data[0].official_website_url;

                axios.post("http://localhost:4000/addFavourite",{cat_ID,member_username,catName,catType,countryOfOrigin,origin,size,hairType,color_pattern,shelter_center,catImage,address,businessHours,contactNum,mapLink,offcialWebsiteURL})
                    .then(res => {
                        if(res.data.added){
                           axios.get("http://localhost:4000/")
                           navigate("/favourites");
                        }else{
                            alert("not add");
                        }
                    })
                    .catch(err => console.log("not post"));
            })
            .catch(err => console.log("not get"));
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
                        <Link to="/favourites" className='dropdownlink'><Icon icon={bookmark} size={25} className='dropdownicon'/><span className='dropdowntext'>My Favourite</span></Link>
                    </li>
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
            <div className='searchAndAdd'>
                <center>
                    <div className='memberSearchInput'>
                        <input type='text' placeholder='search...' onChange={(event) => setQuery(event.target.value)}/>
                    </div>
                </center>
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
                 <tr className='bookmarkOicon_action'>
                    <button className='btn_bookmarkOicon' onClick={()=>addFavourites(item.cat_ID)}><Icon icon={plus} className="homeicon" size={28}/><span className='btn_text'>favourite</span></button>
                 </tr>
             </table>
            )
            )}
        </div>
    )
}

export default MemberHome;
