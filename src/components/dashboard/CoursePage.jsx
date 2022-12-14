import React from "react";
import { useState } from "react";
import { useParams,Link } from "react-router-dom";
import $ from 'jquery';
import { useEffect } from "react";
import {Loading} from './StudentProfile';
import NotAvailable from '../NotAvailable';
function CoursePage(){
    const params = useParams();
    const courseURL = '/api/mylearning/'+params.courseID;
    const [course_content,setCourseContent] = useState();
useEffect(()=>{
    $.get(courseURL,(data,err)=>{
        console.log(typeof(data.res));
        if(err==="success"){
           setCourseContent((prevData)=>prevData = data); 
        } else {
            alert('Something went wrong! Try again later.')
        }
    });
},[]);    

function CoursePageContainer(){
    return (
            <div className="mt-12">
                <div class="container3 h-60 w-5/6 mt-10 m-auto justify-center rounded-md bg-slate-200 shadow-2xl relative">
                <div class="container4 left-10 top-7 absolute">
                    <h2 class=" font-semibold text-2xl">{course_content.course_data.course_title}</h2>
                </div>
                <button class=" border-2 px-2 py-1 rounded-md top-20 left-12 capitalize border-emerald-400 absolute">{course_content.course_data.subscription_plan}</button>
                <Link to={`../../learn/${course_content.course_data._id}`}>
                        <button className=" absolute bottom-28 rounded-md right-12 py-2 px-4 text-3xl text-white bg-emerald-400 hover:shadow-sm hover:shadow-black  hover:scale-105">
                            Start Learning
                        </button>
                    </Link>
                </div>
                <div class="container w-5/6 mt-10 ">
                <h1 class="text-2xl font-thin ">Lessons</h1>
                <div class="container6 flex mt-10">
                    
                    <div class="left mx-10 w-4/5">
                        {course_content.course_data.modules.map(ModulesList)}
                    </div>
                </div>
                </div>
            </div>
        )
}

return (
        <div>
            {
                course_content!= undefined
                ?course_content.res ===true
                    ?course_content.access === true
                        ?<CoursePageContainer/>
                        :<NotAvailable res={true} message='Access denied from the server.' />
                    :<NotAvailable res={true} />  
                : <Loading/>
            }
        </div>
        
    );
}


function ModulesList(props){
    return(
        <div className="flex flex-row" key={props._id} >
        <div>
            <div class="rounded-full bg-emerald-400 h-3 w-3"></div>
            <div class="h-4/5 w-1 mx-1  mt-1 bg-emerald-400"></div>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg w-full mx-4 p-4 shadow-xl my-4 ">
            <h2>{props.title}</h2>
        </div>
        </div>
    )
}
export default CoursePage;