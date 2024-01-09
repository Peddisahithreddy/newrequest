import ast
from asyncio import Event, events
from datetime import datetime, timedelta
import json
from flask import Flask, request, jsonify
import mysql.connector
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS,cross_origin
from flask_bcrypt import Bcrypt
from sqlalchemy import event



app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "http://localhost:4200"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:Admin%40123@localhost:3306/flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False



db = SQLAlchemy(app)
migrate = Migrate(app,db)
bcrypt = Bcrypt(app)
import  mysql.connector as cnx
cnx.connect(host = '127.0.0.1', user = 'root', passwd = 'Admin@123')

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')


    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)


    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
    # def __init__(self, id,username,email,password):
    #     self.id = id
    #     self.username = username
    #     self.email = email
    #     self.password = bcrypt.generate_password_hash(password).decode('utf-8')
    def admin_id(self,username):
        # query = f"SELECT emp_id FROM employee WHERE username = '{username}'"

        # db_handler = MySQLHandler()
        # cursor = db_handler.get_cursor()
        # cursor.execute(query)
        # results = cursor.fetchall()

        # # Close the connection when done
        # db_handler.close_connection()

        # return str(results)
        # username = eval(f'{username}')
        # query = f"select emp_id from employee where username = username"

        # Creating an instance of MySQLHandler
        db_handler = MySQLHandler()
        cursor = db_handler.get_cursor()

        # Use the cursor for database operations
        cursor.execute("select id from admin where username = %s",(username,))
        result = cursor.fetchall()

        # Close the connection when done
        db_handler.close_connection()

        return result



class User(db.Model):


    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

@app.route('/users', methods=['GET'])
@cross_origin()
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users])

def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.serialize())


@app.route('/users', methods=['POST'])
@cross_origin()
def create_user():
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/users/<int:user_id>', methods=['DELETE'])
@cross_origin()
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 200


@app.route('/admins', methods=['GET'])
@cross_origin()
def get_admins():
    admins = Admin.query.all()
    return jsonify([admin.serialize() for admin in admins])

@app.route('/admins', methods=['POST'])
@cross_origin()
def create_admin():
    data = request.get_json()
    new_admin = Admin(username=data['username'], email=data['email'])
    new_admin.set_password(data['password'])  # Set the password using the provided data
    db.session.add(new_admin)
    db.session.commit()
    return jsonify({'message': 'Admin created successfully'}), 201

@app.route('/authenticate', methods=['POST'])
@cross_origin()
def authenticate():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    admin = Admin.query.filter_by(username=username).first()

    if admin and admin.check_password(password):
        print("Details are correct")
        # return
        return admin.admin_id(username)
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

@app.route('/admins/<int:admin_id>', methods=['GET'])
@cross_origin()
def get_single_admin(admin_id):
    admin = Admin.query.get(admin_id)

    if admin:
        return jsonify(admin.serialize())
    else:
        return jsonify({'error': 'Admin not found'}), 404

class MySQLHandler_admin:
      def __init__(self):
        self.connection = mysql.connector.connect(
            host='127.0.0.1',
            user='root',
            password='Admin@123',
            database='flask'
        )
        self.cursor = self.connection.cursor()

      def get_cursor(self):
        return self.cursor

      def close_connection(self):
          self.cursor.close()
          self.connection.close()

class MySQLHandler:
      def __init__(self):
        self.connection = mysql.connector.connect(
            host='127.0.0.1',
            user='root',
            password='Admin@123',
            database='flask'
        )
        self.cursor = self.connection.cursor()

      def get_cursor(self):
        return self.cursor

      def close_connection(self):
          self.cursor.close()
          self.connection.close()


class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    emp_id = db.Column(db.Integer, unique=True, nullable=False)
    emp_name = db.Column(db.String(100), nullable=False)
    job_position = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    contact_no = db.Column(db.String(15), nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    def __init__(self, emp_id, emp_name, job_position, email, gender, age, contact_no, username, password):
        self.emp_id = emp_id
        self.emp_name = emp_name
        self.job_position = job_position
        self.email = email
        self.gender = gender
        self.age = age
        self.contact_no = contact_no
        self.username = username
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')


    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)


    def to_dict(self):
        return {
            'id': self.id,
            'emp_id': self.emp_id,
            'emp_name': self.emp_name,
            'job_position': self.job_position,
            'email': self.email,
            'gender': self.gender,
            'age': self.age,
            'contact_no': self.contact_no,
            'username': self.username,
            'password': self.password  # Note: This exposes the hashed password, which may not be suitable in a real-world scenario
        }
    def to_empname(self):
        return{
            'emp_name':self.emp_name,

        }


    def employee_id(self,username):
        # query = f"SELECT emp_id FROM employee WHERE username = '{username}'"

        # db_handler = MySQLHandler()
        # cursor = db_handler.get_cursor()
        # cursor.execute(query)
        # results = cursor.fetchall()

        # # Close the connection when done
        # db_handler.close_connection()

        # return str(results)
        # username = eval(f'{username}')
        # query = f"select emp_id from employee where username = username"

        # Creating an instance of MySQLHandler
        db_handler = MySQLHandler()
        cursor = db_handler.get_cursor()

        # Use the cursor for database operations
        cursor.execute("select emp_id from employee where username = %s",(username,))
        results = cursor.fetchall()

        # Close the connection when done
        db_handler.close_connection()

        return results




@app.route('/employees', methods=['GET'])
@cross_origin()
def get_all_employees():
    employees = Employee.query.all()
    employees_list = [employee.to_dict() for employee in employees]
    return employees_list

@app.route('/employees/<int:emp_id>', methods=['GET'])
@cross_origin()
def get_employee(emp_id):
    employees = Employee.query.filter_by(emp_id=emp_id).first()

    if not employees:
        return jsonify({'error': 'Employee not found'}), 404
    employee_data = {
        'id': employees.id,
        'emp_id': employees.emp_id,
        'emp_name': employees.emp_name,
        'job_position': employees.job_position,
        'email': employees.email,
        'gender': employees.gender,
        'age': employees.age,
        'contact_no': employees.contact_no,
        'username': employees.username,
        'password': employees.password,
    }

    return employee_data

@app.route('/employees', methods=['POST'])
@cross_origin()
def add_employee():
    data = request.get_json()


    new_employee = Employee(
        emp_id=data['emp_id'],
        emp_name=data['emp_name'],
        job_position=data['job_position'],
        email=data['email'],
        gender=data['gender'],
        age=data['age'],
        contact_no=data['contact_no'],
        username=data['username'],
        password=data['password']
    )



    db.session.add(new_employee)
    db.session.commit()
    # return "this post function is executed"

    return jsonify({'message': 'Employee added successfully'})

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Username and password are required'}), 400


    employee = Employee.query.filter_by(username=username).first()

    if employee and employee.check_password(password):
        # return jsonify({'message': 'Authentication successful'}), 200
        return employee.employee_id(username)
    else:
        return jsonify({'error': 'Invalid username or password'}), 401


@app.route('/employees/<int:emp_id>', methods=['DELETE'])
@cross_origin()
def delete_employee(emp_id):
    employee = Employee.query.get(emp_id)

    if not employee:
        return jsonify({'error': 'Employee not found'}), 404

    db.session.delete(employee)
    db.session.commit()

    return jsonify({'message': 'Employee deleted successfully'})


class Request(db.Model):
    request_id = db.Column(db.Integer, primary_key=True,autoincrement = True)
    emp_id = db.Column(db.String(20), unique=False, nullable=False)
    emp_name = db.Column(db.String(100), nullable=False)
    request_status = db.Column(db.String(20),default = "pending",nullable = False)
    request_time = db.Column(db.DateTime, nullable = False,default = datetime.utcnow)
    date_from = db.Column(db.DateTime,nullable = False)
    date_to =db.Column(db.DateTime,nullable = True)
    approved_by = db.Column(db.String(50),nullable = True)
    approved_time = db.Column(db.DateTime, nullable = False)
    manager = db.Column(db.String(100),nullable = False)
    request_type = db.Column(db.String(100),nullable = False)
    email = db.Column(db.String(100),nullable = False)

    def serialize(self):
        return {
            'id': self.id,
            'emp_id': self.emp_id,
            'emp_name': self.emp_name,
            'request_status':self.request_status,
            'request_time':self.request_time.isoformat(), #convert to iso format for JSON seralization
            'approved_by':self.approved_by,
            'approved_time':self.approved_time,
            'manager':self.manager,
            'request_type':self.request_type,
            'email':self.email
        }
    def __init__(self, emp_id, emp_name,request_status,request_time,date_from,date_to,approved_by,approved_time, manager, request_type, email):
        self.emp_id = emp_id
        self.emp_name = emp_name
        self.request_status = request_status
        self.request_time = request_time.utcnow()
        self.date_from =date_from
        self.date_to = date_to
        self.approved_by = approved_by
        self.approved_time = approved_time
        self.manager = manager
        self.request_type = request_type
        self.email = email





@app.route('/request',methods = ['POST'])
@cross_origin()
def post_request():
    # response = requests.get("http://127.0.0.1:5000/employees/<int:emp_id>")
    # if response.status_code ==200:
    #     employee = response.json
    #     emp_id = employee.get(emp_id)
    #     emp_name = employee.get(emp_name)
    data = request.get_json()
    date_from_str = data.get('date_from', '')
    date_to_str = data.get('date_to', '')
    date_from = datetime.strptime(date_from_str, '%Y-%m-%d') if date_from_str else '2023-11-30'
    date_to = datetime.strptime(date_to_str, '%Y-%m-%d') if date_to_str else '2023-11-30'

    request_data = Request(
        emp_id = data['emp_id'],
        emp_name = data['emp_name'],
        request_status=data.get('request_status', 'pending'),
        request_time = datetime.utcnow(),
        date_from=date_from,
        date_to=date_to,
        approved_by = data['approved_by'],
        approved_time = datetime.utcnow(),
        manager = data['manager'],
        request_type = data['request_type'],
        email = data['email']
    )
    db.session.add(request_data)
    db.session.commit()
    return jsonify({'message': 'Employee added successfully'})
@app.route('/request', methods=['GET'])
@cross_origin()
def get_requests():
        # Query all requests from the database
        requests = Request.query.all()

        # Convert the list of requests to a list of dictionaries
        requests_list =[ {
                'request_id': request.request_id,
                'emp_id': request.emp_id,
                'emp_name': request.emp_name,
                'request_status': request.request_status,
                'request_time': request.request_time.isoformat(),
                'date_from': request.date_from.isoformat(),
                'date_to': request.date_to.isoformat() if request.date_to else None,
                'approved_by': request.approved_by,
                'approved_time': request.approved_time.isoformat(),
                'manager': request.manager,
                'request_type': request.request_type,
                'email': request.email
            }
            for request in requests]

        # Return the list of requests as JSON
        return requests_list

@app.route('/request/<int:requestId>',methods = ['GET'])
@cross_origin()
def get_request(requestId):
    singlerequest = Request.query.filter_by(request_id = requestId).first()
    requests_list ={
                'emp_id': singlerequest.emp_id,
                'emp_name': singlerequest.emp_name,
                'request_status': singlerequest.request_status,
                'request_time': singlerequest.request_time.isoformat(),
                'date_from': singlerequest.date_from.isoformat(),
                'date_to': singlerequest.date_to.isoformat() ,
                'approved_by': singlerequest.approved_by,
                'approved_time': singlerequest.approved_time.isoformat(),
                'manager': singlerequest.manager,
                'request_type': singlerequest.request_type,
                'email': singlerequest.email
            }


        # Return the list of requests as JSON
    return requests_list

@app.route('/request/<int:requestId>',methods = ['DELETE'])
@cross_origin()
def del_request(requestId):
    delete_req = Request.query.get(requestId)
    db.session.delete(delete_req)
    db.session.commit()
    return jsonify({'message': 'Employee deleted successfully'})
class Absence(db.Model):
    leave_id = db.Column(db.Integer,primary_key = True,autoincrement = True)
    emp_id = db.Column(db.Integer, unique=False, nullable=False)
    emp_name = db.Column(db.String(100), nullable=False)
    date_from = db.Column(db.DateTime,nullable = False)
    date_to =db.Column(db.DateTime)
    contact_no = db.Column(db.String(100),nullable = False)
    email = db.Column(db.String(100),nullable = False)
    leave_status = db.Column(db.String(100),nullable = False,default = 'No')

    def serialize(self):
        return {
            'leave_id':self.leave_id,
            'emp_id':self.emp_id,
            'emp_name':self.emp_name,
            'date_from':self.date_from,
            'date_to':self.date_to,
            'contact_no':self.contact_no,
            'email':self.email,
            'leave_status':self.leave_status
        }



@app.route('/absence',methods = ['POST'])
@cross_origin()
def post_absence():
  data = request.get_json()

  post_leave = Absence(

      emp_id = data['emp_id'],
      emp_name = data['emp_name'],
      date_from = data['date_from'],
      date_to = data['date_to'],
      contact_no = data['contact_no'],
      email = data['email'],
      leave_status = data['leave_status']
  )
  db.session.add(post_leave)
  db.session.commit()

  return jsonify({'message': 'Employee added successfully'})

@app.route('/absence/<int:leave_id>', methods=['GET'])
def get_absence(leave_id):
    absence = Absence.query.get(leave_id)

    if absence:
        return jsonify(absence.serialize())
    else:
        return jsonify({'message': 'Absence not found'}), 404

class Attendance(db.Model):
    attendance_id = db.Column(db.Integer, primary_key=True)
    emp_id = db.Column(db.Integer,nullable = False)
    emp_name = db.Column(db.String(100), nullable=False)
    entry_time = db.Column(db.DateTime,nullable = True)
    exit_time = db.Column(db.DateTime,nullable = True)
    date = db.Column(db.Date, default=lambda: datetime.utcnow().date())
    status = db.Column(db.String(10), nullable=False)



    def mark_entry_exit(self):
        current_time = datetime.utcnow()



        # Check if there is an existing record for today
        emp_exists = Employee.query.filter_by(emp_id = self.emp_id).first()
        today_record = Attendance.query.filter_by(emp_id=self.emp_id, date=current_time.date()).first()
        if emp_exists:
          if today_record:

              # Update the exit time for the existing record
              today_record.exit_time = current_time
              today_record.duration = today_record.exit_time - today_record.entry_time
          else:
              # Create a new record for entry
              self.entry_time = current_time
              self.exit_time = current_time  # Set exit_time explicitly
              self.status = "Present"

              # Add the new record to the database
              db.session.add(self)

          # Commit the changes to the database
          db.session.commit()




    def serialize(self):
        return {
            'attendance_id':self.attendance_id,
            'emp_id':self.emp_id,
            'emp_name':self.emp_name,
            'date':self.date,
            'status':self.status
        }

@app.route('/attendance', methods=['POST'])
def mark_entry_exit():
    current_time = datetime.utcnow()
    data = request.json
    employee_id = data.get('emp_id')
    employee_name = data.get('emp_name')
    status = data.get('status')


    if employee_id is None and employee_name is None:
        return jsonify({'messsage': 'emp_id and emp_name are required'}), 400

    emp_exists = Employee.query.filter_by(emp_id = employee_id).first()
    today_record = Attendance.query.filter_by(emp_id=employee_id,date=current_time.date() ).first()



    attendance_entry_exit = Attendance(emp_id=employee_id, emp_name=employee_name)
    attendance_entry_exit.mark_entry_exit()
    if emp_exists:
        if  today_record:
            today_record.status = status

            db.session.commit()
            return({'message':'Your exit time has been updated'})

        else:

            return({'message':'Your attendance has been marked'})

    else:
        return({'message':'Employee not found'})

    # return jsonify({'message': 'Entry/Exit marked successfully'}), 200




# @app.route('/attendance', methods=['PUT'])
# @cross_origin()
# def add_attendance():
#     data = request.get_json()

#     new_attendance = Attendance(emp_name=data['emp_name'], status=data['status'],emp_id = data['emp_id'])
#     db.session.add(new_attendance)
#     db.session.commit()

#     return jsonify("Attendance is updated!")
@app.route('/attendance',methods=['GET'])
@cross_origin()
def get_attendance():
    current_date = datetime.utcnow().date
    attendances = Attendance.query.filter_by(date = datetime.utcnow().date())
    return jsonify([attendance.serialize() for attendance in attendances])


class Timeoff(db.Model):
    timeoff_id = db.Column(db.Integer,primary_key = True,autoincrement = True)
    emp_id = db.Column(db.Integer,nullable = False)
    emp_name = db.Column(db.String(120),nullable = False)
    timeoff = db.Column(db.String(120),nullable = False)
    date = db.Column(db.DateTime,nullable = False)
    dayoftheweek = db.Column(db.String(20),nullable = False)
    type = db.Column(db.String(120),nullable = False)
    unitoftime = db.Column(db.String(120),nullable = False)
    comment = db.Column(db.String(120))

    def serialize(self):
        return {
            'timeoff_id':self.timeoff_id,
            'timeoff':self.timeoff,
            'date':self.date,
            'dayoftheweek':self.dayoftheweek,
            'type':self.type,
            'unitoftime':self.unitoftime,
            'comment':self.comment
        }

@app.route('/timeoff/<int:emp_id>',methods = ['GET'])
@cross_origin()
def get_timeoff(emp_id):
    timeoffs = Timeoff.query.filter_by(emp_id = emp_id).all()
    return jsonify([i.serialize() for i in timeoffs])

class holi(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    holiday_date = db.Column(db.String(255))
    title = db.Column(db.String(255))

    def __init__(self, holiday_date, title):
        self.holiday_date = holiday_date
        self.title = title

with app.app_context():
    db.create_all()
    if not holi.query.filter_by(holiday_date='2024-01-01').first():
      sample_data = [
          holi(holiday_date='2024-01-01', title="New Year's Day"),
          holi(holiday_date='2024-15-01', title="Sankranti / Pongal"),
          holi(holiday_date='2024-26-01', title="Republic Day"),
          holi(holiday_date='2024-18-02', title="Mahashivratri"),
          holi(holiday_date='2024-07-04', title="Good Friday"),
          holi(holiday_date='2024-22-04', title="Eid-Ul-Fitr"),
          holi(holiday_date='2024-01-05', title="May Day"),
          holi(holiday_date='2024-29-06', title="Bakra Id"),
          holi(holiday_date='2024-15-08', title="Independence Day"),
          holi(holiday_date='2024-19-09', title="Ganesh Chathurthi"),
          holi(holiday_date='2024-02-10', title="Gandhi Jayanti"),
          holi(holiday_date='2024-24-10', title="Dusshera"),
          holi(holiday_date='2024-12-11', title="Diwali"),
          holi(holiday_date='2024-13-11', title="Balipadyami Diwali / Govardhan Pooja"),
          holi(holiday_date='2024-25-12', title="Christmas"),
          ]

      for data in sample_data:
          db.session.add(data)

      db.session.commit()

@app.route('/holiday', methods=['GET'])
def get_all_data():
    data = holi.query.all()
    data_list = []

    for item in data:
        data_list.append({
            'id': item.id,
            'date': item.holiday_date,
            'title': item.title
        })

    return data_list




if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)

    # print(employee_id('abcd'))


