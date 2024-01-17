import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { FaceRecognisedComponent } from './face-recognised/face-recognised.component';
import { FaceNotRecognisedComponent } from './face-not-recognised/face-not-recognised.component';
import { PopupComponent } from './popup/popup.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { DetailsComponent } from './details/details.component';
import { AddUserComponent } from './add-user/add-user.component';
import { WelcomeAdminComponent } from './welcome-admin/welcome-admin.component';
import { NotificationComponent } from './notification/notification.component';
import { ListAttendanceComponent } from './list-attendance/list-attendance.component';
import { CalendarDetailsComponent } from './calendar-details/calendar-details.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { WelcomeEmployeeComponent } from './welcome-employee/welcome-employee.component';
import { AttendanceCalendarComponent } from './attendance-calendar/attendance-calendar.component';
import { SentRequestComponent } from './sent-request/sent-request.component';
import { RegularizeAttendanceComponent } from './regularize-attendance/regularize-attendance.component';
import { AttendanceManagementComponent } from './attendance-management/attendance-management.component';
import { PickDateComponent } from './pick-date/pick-date.component';
import { ContactComponent } from './contact/contact.component';
import { AbsenceComponent } from './absence/absence.component';
import { AdduserFormComponent } from './adduser-form/adduser-form.component';
import { MarkAttendanceFormComponent } from './mark-attendance-form/mark-attendance-form.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { UserFormComponent } from './user-form/user-form.component';
const routes: Routes = [
  {path: '', redirectTo: '/attendance', pathMatch: 'full' },
  {path: 'attendance', component: AttendanceComponent},
  {path: 'face-recognised',component:FaceRecognisedComponent},
  {path: 'face-not-recognised',component:FaceNotRecognisedComponent},
  {path:'popup',component:PopupComponent},
  {path:'login',component:LoginComponent},
  {path:'user',component:UserComponent},
  {path:'details/:emp_id',component:DetailsComponent},
  {path:'add-user',component:AddUserComponent},
  {path:'welcome-admin',component:WelcomeAdminComponent},
  {path:'notification/:id',component:NotificationComponent},
  {path:'list_attendance',component:ListAttendanceComponent},
  {path:'calendar-details',component:CalendarDetailsComponent},
  {path:'employee-login',component:EmployeeLoginComponent},
  {path:'welcome-employee',component:WelcomeEmployeeComponent},
  {path: 'attendance-calendar/:emp_id', component: AttendanceCalendarComponent },
  {path: 'sent-request',component:SentRequestComponent},
  {path:'regularize-attendance/:emp_id',component:RegularizeAttendanceComponent},
  {path: 'attendance-management',component:AttendanceManagementComponent},
  {path: 'pick-date/:emp_id',component:PickDateComponent},
  {path:'contact',component:ContactComponent},
  {path:'absence',component:AbsenceComponent},

  {path:'adduserform',component:AdduserFormComponent},
  {path:'mark-attendance-form',component:MarkAttendanceFormComponent},
  {path:'edit-details',component:EditDetailsComponent},
  {path:'user-form',component:UserFormComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
