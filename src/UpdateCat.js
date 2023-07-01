import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link,useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleUser,faAngleDown} from '@fortawesome/free-solid-svg-icons';
import { Icon } from 'react-icons-kit';
import {home} from 'react-icons-kit/fa/home';
import {logout} from 'react-icons-kit/iconic/logout';
import {angleDown} from 'react-icons-kit/fa/angleDown';
import {angleUp} from 'react-icons-kit/fa/angleUp';

function UpdateCat(){
    const {catID} = useParams();
    const [cat_ID, setCatID] = useState("");
    const [catName, setCatName] = useState("");
    const [catType, setCatType] = useState("");
    const [countryOfOrigin, setCountryOfOrigin] = useState("");
    const [origin, setOrigin] = useState("");
    const [size, setSize] = useState("");
    const [hairType, setHairType] = useState("");
    const [color_pattern, setColorPattern] = useState("");
    const [shelter_center, setShelterCenter] = useState("");
    const [image, setImage] = useState("");
    const [address, setAddress] = useState("");
    const [businessHours, setBusinessHours] = useState("");
    const [contactNum, setContactNum] = useState("");
    const [mapLink, setMapLink] = useState("");
    const [officialWebsiteURL, setOfficialWebsiteURL] = useState("");

    const [open, setOpen] = useState(false);
    const [icon, setIcon] = useState(angleDown);

    useEffect(()=>{
        axios.get('http://localhost:4000/cat/' + catID)
        .then(res => {
            setCatID(res.data[0].cat_ID);
            setCatName(res.data[0].cat_name);
            setCatType(res.data[0].cat_type);
            setCountryOfOrigin(res.data[0].country_of_origin);
            setOrigin(res.data[0].origin);
            setSize(res.data[0].size);
            setHairType(res.data[0].hair_type);
            setColorPattern(res.data[0].color_pattern);
            setShelterCenter(res.data[0].shelter_center);
            setImage(res.data[0].cat_image);
            setAddress(res.data[0].address);
            setBusinessHours(res.data[0].business_hours);
            setContactNum(res.data[0].contact_number);
            setMapLink(res.data[0].map_link);
            setOfficialWebsiteURL(res.data[0].official_website_url);
        })
        .catch(err => console.log(err));
    },[])

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(officialWebsiteURL);
        axios.post("http://localhost:4000/editCat/" + catID, {cat_ID,catName,catType,countryOfOrigin,origin,size,hairType,color_pattern,shelter_center,address,businessHours,contactNum,mapLink,officialWebsiteURL})
            .then(res => {
                if(res.data.updated){
                    navigate("/home");
                }else{
                    alert("not updated");
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
                <li className='homelogo'><Link to="/home" className='dropdownlink'><Icon icon={home} className="homeicon" size={28}/></Link></li>
                <li className='personinfo' onClick={handleOpen}>
                    <FontAwesomeIcon icon={faCircleUser} className='circleuser'/> <span className='username'>Henry</span> <Icon icon={icon} size={25} className='angledown'/>
                </li>
            </ul>
            <div className={`dropdown-menu ${open? 'active': 'inactive'}`}>
                <ul>
                    <li className='dropdownItem'>
                        <Link to="/" className='dropdownlink'><Icon icon={logout} size={25} className='dropdownicon'/><span className='dropdowntext'>Sign Out</span></Link>
                    </li>
                </ul>
            </div>
            <div className="form_title">Cat Information</div>
            <center>
                <div className="editCat">
                    <form onSubmit={handleSubmit}>
                        <table className="catInfo_form">
                            <tr>
                                <td className="catlabel"><label htmlFor='catID'>Cat ID</label></td>
                                <td className="catInfoInputField"> 
                                    <input type="text" placeholder="Enter cat ID" name="catID" value={cat_ID} onChange={ e => setCatID(e.target.value)} className="catInfo"/>
                                </td>
                            </tr>
                            <tr >
                                <td className="catlabel"> <label htmlFor='catName'>Cat name</label></td>
                                <td className="catInfoInputField"> <input type="text" placeholder="Enter the name of cat" name="catName" value={catName} onChange={e => setCatName(e.target.value)} className="catInfo"/></td>
                            </tr>
                            <tr>
                                <td className="catlabel"><label htmlFor='catType'>Cat type</label></td>
                                <td className="catInfoInputField">
                                    <input type="text" placeholder="Enter cat type" name="catType" value={catType} onChange={e => setCatType(e.target.value)} className="catInfo"/>
                                 </td>
                            </tr>
                            <tr>
                                <td className="catlabel"><label htmlFor='countryOfOrigin'>Country of origin</label></td>
                                <td className="catInfoInputField">
                                    <input type="text" placeholder="Enter country of origin" name="countryOfOrigin"  value={countryOfOrigin} onChange={e => setCountryOfOrigin(e.target.value)} className="catInfo"/>
                                </td>
                            </tr>
                            <tr>
                                <td className="catlabel"><label htmlFor='Origin' >Origin</label></td>
                                <td className="catInfoInputField"><input type="text" placeholder="Enter origin" name="origin"  value={origin} onChange={e => setOrigin(e.target.value)} className="catInfo"/></td>
                            </tr>
                            <tr>
                                <td className="catlabel"><label htmlFor='size'>Size</label></td>
                                <td className="catInfoInputField"><input type="text" placeholder="Enter size" name="size"  value={size} onChange={e => setSize(e.target.value)} className="catInfo"/></td>
                            </tr>
                            <tr>
                                <td className="catlabel"><label htmlFor='hairType'>Hair type</label></td>
                                <td className="catInfoInputField">
                                    <select name="hairType"  value={hairType} onChange={e => setHairType(e.target.value)} className="catInfo">
                                    <option value={"short"}>short</option>
                                    <option value={"short/long"}>short/long</option>
                                    <option value={"long"}>long</option>
                                    <option value={"middle"}>middle</option>
                                    <option value={"curly hair"}>curly hair</option>
                                    <option value={"half length"}>half length</option>
                                    <option value={"hairless or with fuzzy down"}>hairless or with fuzzy down</option>
                                    <option value={"hairless or with fuzzy down"}>hairless or with fuzzy down</option>
                                    <option value={"hairless"}>hairless</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="catlabel"><label htmlFor='color_pattern'>Color/pattern</label></td>
                                <td className="catInfoInputField"><input type="text" placeholder="Enter color" name="color_pattern"  value={color_pattern} onChange={e => setColorPattern(e.target.value)} className="catInfo"/></td>
                            </tr>
                            <tr>
                                <td className="catlabel"><label htmlFor='shelter_center' >shelter_center</label></td>
                                <td className="catInfoInputField">
                                    <select name="shelter_center"  value={shelter_center} onChange={e => setShelterCenter(e.target.value)} className="catInfo">
                                        <option value={"Cat Society (Hong Kong) Limited"}>Cat Society (Hong Kong) Limited</option>
                                        <option value={"Hong Kong Animal Adoption Center"}>Hong Kong Animal Adoption Center</option>
                                    </select>            
                                </td>
                            </tr>
                            <tr>
                                <td className="catlabel"><label htmlFor="address">Address</label></td>
                                <td className="catInfoInputField"><input type="text" name="address" className="catInfo" value={address} onChange={e => setAddress(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td className="catlabel"><label htmlFor="businessHours">Business Hours</label></td>
                                <td className="catInfoInputField"><input type="text" name="businessHours" className="catInfo" value={businessHours} onChange={e => setBusinessHours(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td className="catlabel"><label htmlFor="contactNum">Contact Number</label></td>
                                <td className="catInfoInputField"><input type="text" name="contactNum"  className="catInfo" value={contactNum} onChange={e => setContactNum(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td className="catlabel"><label htmlFor="mapURL">the URL of position of the shelter center</label></td>
                                <td className="catInfoInputField"><input type="url" name="mapURL"  className="catInfo" value={mapLink} onChange={e => setMapLink(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td className="catlabel"><label htmlFor="offcialWebsiteURL">the URL of offcial website of the shelter center</label></td>
                                <td className="catInfoInputField"><input type="url" name="offcialWebsiteURL"  className="catInfo" value={officialWebsiteURL} onChange={e => setOfficialWebsiteURL(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td className="catlabel"><label htmlFor="image">Image</label></td>
                                <td className="catInfoInputField"><input type="file"  /><button >Upload</button></td>
                                <td><img src={"http://localhost:4000/images/" + image} alt="" /></td>
                            </tr>
                        </table>
                        <p><button type="submit" className="btn_submit">submit</button></p>
                    </form>
                </div>
            </center>
    </div>
    )
}

export default UpdateCat;