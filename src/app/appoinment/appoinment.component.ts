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
  
  }
  createschedule():FormGroup|any{
    return this.fb.group({
      name:[''],
      start_time:this.patchDynamicFormBlockValue(),
      end_time:['']
    })
    
  }
  onselect(val:any){
    var selectedOptionIndex
    console.log(val)
        let index = parseInt(val) + 30;
       // console.log('ew',val)
        this.end_hours = this.start_hours.slice(index);

    //console.log('th1', this.end_hours);
    
  //   if(this.start_hours > this.end_hours){
  //    let ind=val+15;
  //    this.start_hours=this.end_hours.slice(ind)
  // }
    


  }

  getControls() {
    return (<FormArray>this.appoinmentform.get('schedule')).controls;
  }

  

  addschedule(){
    this.schedule=this.appoinmentform.get('schedule') as FormArray;
    this.schedule.push(this.createschedule());
    console.log('this.schedule', this.schedule);
   this.isdiasplay=true;
    //this.appoinmentform.setControl('start_time', this.fb.array(this.appoinmentform.start_time || []));
  
    // var findFirstInd = this.schedule.indexOf();
    // console.log('index', findFirstInd );
    
    //((this.schedule.get('controls') as FormArray).at(index) as FormGroup).get('start_time').patchValue(schedule.start_time);
    for (let i = 0; i < this.schedule.length; i++) {
      console.log(this.schedule.at(i).value);
      console.log('', );
      
      // var findFirstInd = this.schedule.indexOf(i);
      // console.log('dsfsz', findFirstInd);
      //this.schedule.get('start_time')[i]
      //this.appoinmentform.get('start_time')[i].patchValue(this.schedule.get('end_time')[i]+15)
    //  this.schedule.at(i).get('start_time').patchValue(this.schedule.at(i).get('end_time')[i]+15);
      //this.schedule.controls.start_time.value [i].controls['start_time'].patchValue(this.schedule.at(i).get('end_time')[i]+15)
         //console.log('thi', this.schedule[i].value);
        
        // this.schedule.get('start_time')[i].patchValue();
        // this.schedule.get('start_time')[i]=this.schedule.get('end_time')[i]+15;
      //console.log('ds', this.schedule.get('start_time'));
      
    }
  }

   patchDynamicFormBlockValue(){
     for (let i = 0; i < this.schedule.length; i++) {
    console.log(this.schedule.at(i).value);
    console.log('', );
   }
  }
  

  onclick(){
    console.log('', this.appoinmentform.value);
  
    //JSON.parse(this.appoinmentform.value);
    //JSON.parse(JSON.stringify(this.appoinmentform.value))
     //this.appoinmentform.value 
  }

  deleteScheduleGroup(index: number) {
    const add = this.appoinmentform.get('schedule') as FormArray;
    add.removeAt(index)
    this.isdiasplay=false;
  }

}
