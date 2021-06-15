import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import * as moment from "moment";


@Component({
  selector: 'app-appoinment',
  templateUrl: './appoinment.component.html',
  styleUrls: ['./appoinment.component.css']
})
export class AppoinmentComponent implements OnInit {
  public day=["Monday","Tuesday","Wensday","Thursday","Friday"];
  appoinmentform:FormGroup|any;
  schedule : FormArray|any;
  isdiasplay:boolean=true
 start_hours:any = [];
 end_hours:any = [];
 hours:any=[]
 data:any=[]
  constructor(public fb:FormBuilder) {
   
   }

  ngOnInit(): void {
    this.appoinmentform=this.fb.group({
     // day:this.day,
      schedule:new FormArray([])
    });
    

    for(let hour = 9; hour < 22; hour++) {  
      for(let mins=0 ;mins < 60; mins++){
         this.start_hours.push(moment({ hour,minutes:mins }).format('H:mm'));
      }
    }
    this.data[0]={
      start:this.start_hours,
      end:null,
      start_selected:null,
      end_selected:null
    }
  }
  createschedule():FormGroup|any{
    return this.fb.group({
      name:[''],
      start_time:this.patchDynamicFormBlockValue(),
      end_time:['']
    })
    
  }

  onselect(time: string,val:any,ind:any){
    console.log(val)
    if(time === "start_time"){
      console.log('ind', ind);
      console.log('', this.start_hours[ind]);
        let index = parseInt(val) + 30;
       // console.log('ew',val)
        this.end_hours = this.start_hours.slice(index);
        //console.log('this.end_hours', this.end_hours); 
        this.data[ind].end = this.end_hours;
        console.log('this.data[ind].id', this.data[ind].id);
        this.data[ind].start_selected = val;
        console.log('this.data[ind].start_selected', this.data[ind].start_selected);
        console.log(' this.data[ind].end',  this.data[ind].end);
    } 
    else if(time === "end_time"){ 
      console.log('ind', ind); 
      console.log('', this.end_hours[ind+1]);
        let  index = parseInt(val) + 15;
        this.start_hours= this.end_hours.slice(index);
        //console.log('this.start_hours', this.start_hours);
        console.log('this.data[ind+1]', this.data[ind+1]);
        
        if (this.data[ind+1]) {
          this.data[ind+1] = this.start_hours;
          console.log('this.data[ind+1]', this.data[ind+1]);
          console.log(' this.data[ind].start11',  this.data[ind].start);
          
         }else{
           this.data[ind+1] = {start: this.start_hours}
           console.log('this.data[ind+1]11', this.data[ind+1]);
           console.log(' this.data[ind].start1111',  this.data[ind].start);
         }
         this.data[ind].end_selected = val;
         console.log('this.data[ind].end_selected', this.data[ind].end_selected);
         //console.log(' this.data[ind].start11111',  this.data[ind].start);
      }
  }

  getControls() {
    return (<FormArray>this.appoinmentform.get('schedule')).controls;
  }

  

  addschedule(){
    this.schedule=this.appoinmentform.get('schedule') as FormArray;
    this.schedule.push(this.createschedule());
    //console.log('this.schedule', this.schedule);
   this.isdiasplay=true;
   
  //  if(this.schedule.length > 0 && !this.appoinmentform.value ){
  //    console.log('this.', this.schedule);
  //    //console.log('',this.schedule.get('end_time').value.length);
  //    var index=this.schedule.length;
  //    console.log('index', index-1);
  //     var time= this.schedule.get('end_time')[index-1]
  //     console.log('time', time);
  //      this.start_hours=this.schedule.get('start_time').of[index-1]
  //     this.schedule.get('start_time').patchValue(this.start_hours+15);
  //  }
  }

  
  

  onclick(){
    console.log('', this.appoinmentform.value);
  
    //JSON.parse(this.appoinmentform.value);
    //JSON.parse(JSON.stringify(this.appoinmentform.value))
     //this.appoinmentform.value 
  }
  patchDynamicFormBlockValue(){
    for (let i = 0; i < this.schedule.length; i++) {
   console.log('value',this.schedule.at(i).value);
  }
 }

  deleteScheduleGroup(index: number) {
    const add = this.appoinmentform.get('schedule') as FormArray;
    add.removeAt(index)
    //this.isdiasplay=false;
  }
}