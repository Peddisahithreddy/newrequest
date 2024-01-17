import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, inject, numberAttribute, ChangeDetectorRef, Inject } from '@angular/core';
import { MyserviceService } from '../myservice.service';

import { Observable, filter,forkJoin } from 'rxjs';


import { AttendanceService } from '../attendance.service';

import { DOCUMENT } from '@angular/common';
import { EmployeeserviceService } from '../employee.service';
import { RequestService } from '../request.service';
import { UserserviceService } from '../user.service';
import { AbsenceService } from '../absence.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  girl_icon = "../assets/girl-icon.png"
  boy_icon = "../assets/user-icon.png"
  users: string[] = [];
  admin!: string[];
  username!: string;
  employees!: any[]
  result!: string;
  leaves: any = [];
  datas: any = [];
  emp_id!: number;
  empId!: number;
  employeeName!: string;
  datefrom!: Date;
  dateto!: Date;
  email!: string;
  leave_status!: string;
  admin_username!: string;
  admin_email!: string;
  user_name!: string;



  //id: number = history.state.data[0];
  //email: string = history.state.data[2];
  route: ActivatedRoute = inject(ActivatedRoute);
  adminid = -1;
  contact_no!: number;
  urlToNavigateTo?: string;
  constructor(private router: Router,
    private Router: ActivatedRoute,
    private employeeService: EmployeeserviceService,
    private requestService: RequestService,
    private userService: UserserviceService,
    private myService: MyserviceService,
    private attendanceService: AttendanceService,
    private absenceService: AbsenceService,
    private cdr: ChangeDetectorRef,

    @Inject(DOCUMENT) private _document: Document
  ) {this.adminid = Number(this.route.snapshot.params['id'])}

  ngOnInit(): void {



    // this.Router.paramMap.subscribe(params => {
    //   this.adminid = Number(params.get('employees'));
    // });
    console.log("admin_id is :",this.adminid)
    // this.markleaveService.get_request().subscribe((response) => {
    //   this.leaves = response
    //   console.log("Emp_id is :", this.employeeid)
    //   console.log("Response is : ", response)


    // })
    this.myService.get_admin_by_id(this.adminid).subscribe((response) => {
      this.admin_username = response.username
      this.admin_email = response.email
    })
    this.requestService.get_request().subscribe((response) => {
      this.leaves = response
    })
    this.userService.getAllUsers().subscribe((response) => {
      this.datas = response
      console.log(this.datas)

    })




    // this.markleaveService.getRequest().subscribe((response) =>
    // {

    //   for(let i = 0; i<response.requests.length; i++){
    //     //console.log(response.requests[i].emp_name)
    //     this.users.push(response.requests[i].emp_name);
    //     console.log("state variable value :",history.state.data)
    //     }
    //   // this.username = this.users,
    // //  console.log(response.requests[0].emp_name)
    // },



  }
  handleUserClick(emp_id: string){
    this.userService.getUser(emp_id).subscribe((respone) => {
      const datajson = {
        emp_id: respone.emp_id,
        emp_name: respone.emp_name,
        job_position: respone.job_position,
        email: respone.email,
        role: respone.role,
        contact_no: respone.contact_no,

      }
      console.log("Id of the user in user table is :",datajson)

      this.employeeService.createEmployee(datajson).subscribe((respone) => {})
      this.userService.deleteUser(emp_id).subscribe((respone) => {})



    })

  }
  getId(emp_id: string){
    console.log("Id of the user in user table is :",emp_id)
    console.log("",emp_id)
    this.userService.deleteUser(emp_id).subscribe((response) => {console.log("User Deleted Successfully")})
  }
  requestId(requestId: number): Observable<any> {
    console.log("request_id is : ", requestId)
    return jsonify({ 'message': 'request_id' })
  }
  approveLeave(empId: number): Observable<any> {
    // You can now access empId and perform other operations
    console.log('Leave approved for emp_id:', empId);

    // Example: Perform additional operations using empId
    this.employeeService.getEmployeeById(empId).subscribe(
      (result) => {
        console.log('Employee Data is :', result);
        // Perform any other necessary actions
      },

    );
    return jsonify({ 'message': 'Employee' })
  }
  getRequestId(requestID: number){
    this.requestService.deleteRequest(requestID).subscribe((response) => {console.log(response)})
  }
  handleButtonClick(emp_id: number, requestId: number) {

    // this.myService.get_admin_by_id(this.adminid).subscribe((response) => {username = response.username})
    console.log("emp_id and requestId are :", emp_id, requestId);

    const getEmployee$ = this.employeeService.getEmployeeById(emp_id);
    const getRequest$ = this.requestService.singleRequest(requestId);

    forkJoin([getEmployee$, getRequest$]).subscribe(
        ([employeeResponse, requestResponse]) => {
          const datajson = {
            emp_id: emp_id,
            emp_name: requestResponse.emp_name,
            date_from: requestResponse.date_from,
            date_to: requestResponse.date_to,
            contact_no: '123',  // Replace with actual contact_no
            email: requestResponse.email,
            leave_status: 'Approved',
            status:'Present',
            approved_by:this.admin_username
        };

        console.log("json value is :", datajson);

          if (requestResponse.request_type == 'Regularize attendance'){
            this.attendanceService.post_attendance(datajson).subscribe((response) => {})

            console.log("Inside if block ",datajson)

          }
          else{
            console.log(requestResponse.request_type)
              this.contact_no = employeeResponse.contact_no;
              console.log("inside else block",datajson)

              // Perform postAbsence and deleteRequest in parallel
              forkJoin([
                  // console.log("Inside fork join",datajson),
                  this.absenceService.postAbsence(datajson),
                  //this.requestService.deleteRequest(requestId)
              ]).subscribe(([postAbsenceResponse])  => {
                console.log("inside post request of absence service :")
                  console.log("post absence data is :", postAbsenceResponse);
                  //console.log("delete response:", deleteRequestResponse);

                  // Reload the page after all operations are completed
                  //window.location.reload();
              });}
  })
}



  onsave() {

    console.log("inside onsave function")
    const leave_id = 123
    this.requestId(leave_id)
    const emp_id = 123;
    this.handleButtonClick(emp_id, leave_id)
    console.log("request_id in on save method is :", leave_id)
    this.approveLeave(emp_id).subscribe((response) => {

      const employeeName = response.emp_name
      const employeeId = response.emp_id
      const datajson = {
        'emp_id': employeeId,
        'emp_name': employeeName

      }
      this.attendanceService.post_attendance(datajson).subscribe((response) => { })

    });


    // this.employeeService.getEmployeeById(this.approveLeave(this.empId)).subscribe(
    //   (value) => {
    //     console.log("response in notification page is :",value)
    //     console.log("empId is : ",this.empId)
    //   })





    this.router.navigate(['/user']);
  }
  onsave1() {
    const emp_ID: number = 1;
    const requestID: number = 1;

    this.getRequestId(requestID);
    console.log("Inside onsave1")
    this.requestService.deleteRequest(requestID).subscribe((response) => {console.log(response)})

    this.router.navigate(['/attendance']);
  }
  showNotification() {
    // Show the notification box
    const admindetails = document.getElementById('admin-details') as HTMLDivElement;
    admindetails.style.display = 'block';

  }
  onsave2() { }
  hideNotification() {
    // Hide the notification box
    const admindetails = document.getElementById('admin-details') as HTMLDivElement;
    admindetails.style.display = 'none';
  }

}
function jsonify(data: { message: string }): Observable<any> {
  return new Observable((observer) => {
    // Simulate an asynchronous operation (e.g., an HTTP request)
    setTimeout(() => {
      observer.next(data);
      observer.complete();
    }, 1000); // Adjust the timeout as needed
  });
}
