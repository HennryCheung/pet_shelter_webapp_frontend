import React, {useState}from "react";
import { Link, useNavigate } from 'react-router-dom';
import validation from "./CatInfoValidation";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons';
import {ic_file_upload} from 'react-icons-kit/md/ic_file_upload';
import "./addCat.css";
import { Icon } from 'react-icons-kit';
import {home} from 'react-icons-kit/fa/home';
import {logout} from 'react-icons-kit/iconic/logout';
import {angleDown} from 'react-icons-kit/fa/angleDown';
import {angleUp} from 'react-icons-kit/fa/angleUp';

function AddCat(){

    const [values, setValues] = useState({
        catID: '',
        catName: '',
        catType: '',
        countryOfOrigin: '',
        origin: '',
        size: '',
        hairType: '',
        color_pattern: '',
        shelter_center: '',
        cat_image: '',
        address: '',
        businessHours: '',
        contactNum: '',
        mapURL: '',
        offcialWebsiteURL: ''
    })

    const [file, setFile] = useState();
    const [file_name, setFileName] = useState("");

    const [open, setOpen] = useState(false);
    const [icon, setIcon] = useState(angleDown);

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const formdata = new FormData();

    const handleInput = (event) => {
        setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
    }

    const handleSubmit =(event) => {
        event.preventDefault();
        setErrors(validation(values));
        if(errors.catID === "" && errors.catType === "" && errors.countryOfOrigin === "" && errors.hairType === "" && errors.shelter_center === ""){
            axios.post("http://localhost:4000/cat",values)
            .then(res => {
                axios.post("http://localhost:4000/uploadCatImage",[values.catID,file_name])
                    .then(res => {
                        if(res.data.uploaded){
                            navigate("/home");
                        }else{
                            alert("upload fail");
                        }
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        }
    }

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const handleUpload = () => {
        formdata.append('image',file);
        axios.post("http://localhost:4000/upload", formdata)
            .then(res => {
                setFileName(res.data.filename);         
                if(file_name === ""){
                    console.log("no value");
                }else{
                    console.log('image file:' + file_name);
                }
                console.log('image file:' + res.data.filename);
            })
            .catch(err => console.log(err));
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
            <center><div className="addCat">
            <form action="" onSubmit={handleSubmit}>
                <table className="catInfo_form">
                    <tr >
                        <td className="catlabel"><label htmlFor='catID'>Cat ID</label></td>
                        <td className="catInfoInputField"> 
                            <input type="text" placeholder="Enter cat ID" name="catID"  id="catID" onChange={handleInput} className="catInfo"/>
                            <p className="errorMsg">{errors.catID && <span className='text-danger'>{errors.catID}</span>}</p>
                        </td>
                    </tr>
                    <tr >
                        <td className="catlabel"> <label htmlFor='catName'>Cat name</label></td>
                        <td className="catInfoInputField"> <input type="text" placeholder="Enter the name of cat" name="catName" id="catName" onChange={handleInput} className="catInfo"/></td>
                    </tr>
                    <tr>
                        <td className="catlabel"><label htmlFor='catType'>Cat type</label></td>
                        <td className="catInfoInputField">
                            <input type="text" placeholder="Enter cat type" name="catType" id="catType" onChange={handleInput} className="catInfo"/>
                            <p  className="errorMsg">{errors.catType && <span className='text-danger'>{errors.catType}</span>}</p>
                        </td>
                    </tr>
                    <tr>
                        <td className="catlabel"><label htmlFor='countryOfOrigin'>Country of origin</label></td>
                        <td className="catInfoInputField">
                            <input type="text" placeholder="Enter country of origin" name="countryOfOrigin" id="countryOfOrigin" onChange={handleInput} className="catInfo"/>
                            <p className="errorMsg">{errors.countryOfOrigin && <span className='text-danger'>{errors.countryOfOrigin}</span>}</p>
                        </td>
                    </tr>
                    <tr>
                        <td className="catlabel"><label htmlFor='origin' >Origin</label></td>
                        <td className="catInfoInputField"><input type="text" placeholder="Enter origin" name="origin" id="origin" onChange={handleInput} className="catInfo"/></td>
                    </tr>
                    <tr>
                        <td className="catlabel"><label htmlFor='size'>Size</label></td>
                        <td className="catInfoInputField"><input type="text" placeholder="Enter size" name="size" id="size" onChange={handleInput} className="catInfo"/></td>
                    </tr>
                    <tr>
                        <td className="catlabel"><label htmlFor='hairType'>Hair type</label></td>
                        <td className="catInfoInputField">
                        <select name="hairType"  onChange={handleInput} className="catInfo" id="hairType">
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
                        <p className="errorMsg">{errors.hairType && <span className='text-danger'>{errors.hairType}</span>}</p>
                        </td>
                    </tr>
                    <tr>
                        <td className="catlabel"><label htmlFor='color_pattern'>Color/pattern</label></td>
                        <td className="catInfoInputField"><input type="text" placeholder="Enter color" name="color_pattern" id="color_pattern" onChange={handleInput} className="catInfo"/></td>
                    </tr>
                    <tr>
                        <td className="catlabel"><label htmlFor='shelter_center' >shelter_center</label></td>
                        <td className="catInfoInputField">
                        <select name="shelter_center"  onChange={handleInput} className="catInfo" id="shelter_center">
                        <option value={"Cat Society (Hong Kong) Limited"}>Cat Society (Hong Kong) Limited</option>
                        <option value={"Hong Kong Animal Adoption Center"}>Hong Kong Animal Adoption Center</option>
                        </select>
                        <p className="errorMsg">{errors.shelter_center && <span className='text-danger'>{errors.shelter_center}</span>}</p>
                        </td>
                    </tr>
                    <tr>
                        <td className="catlabel"><label htmlFor="address">Address</label></td>
                        <td className="catInfoInputField"><input type="text" name="address" id="address" onChange={handleInput} className="catInfo"/></td>
                    </tr>
                    <tr>
                        <td className="catlabel"><label htmlFor="businessHours">Business Hours</label></td>
                        <td className="catInfoInputField"><input type="text" name="businessHours" id="businessHours" onChange={handleInput} className="catInfo"/></td>
                    </tr>
                    <tr>
                        <td className="catlabel"><label htmlFor="contactNum">Contact Number</label></td>
                        <td className="catInfoInputField"><input type="text" name="contactNum" id="contactNum" onChange={handleInput} className="catInfo"/></td>
                    </tr>
                    <tr>
                        <td className="catlabel"><label htmlFor="mapURL">the URL of position of the shelter center</label></td>
                        <td className="catInfoInputField"><input type="url" name="mapURL" id="mapURL" onChange={handleInput} className="catInfo"/></td>
                    </tr>
                    <tr>
                        <td className="catlabel"><label htmlFor="offcialWebsiteURL">the URL of offcial website of the shelter center</label></td>
                        <td className="catInfoInputField"><input type="url" name="offcialWebsiteURL" id="offcialWebsiteURL" onChange={handleInput} className="catInfo"/></td>
                    </tr>
                    <tr>
                        <td className="catlabel"><label htmlFor="image">Image</label></td>
                        <td className="catInfoInputField"><input type="file" id="image" onChange={handleFile} className="fileInput"/><button onClick={handleUpload}><Icon icon={ic_file_upload} size={25} /></button></td>
                        <td><img src={"http://localhost:4000/images/" + file_name} alt="" /></td>
                    </tr>
                </table>
                <p><button type="submit" className="btn_submit">submit</button></p>
            </form>
            </div></center>
        </div>
    )
}

export default AddCat;