import React from 'react';
import $ from 'jquery';

function CatForum(){
    $("button").on("click", function(){
        alert("hello");
    });
    
    return(
        <div><button>Test Button</button></div>
    )
}

export default CatForum;