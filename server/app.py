
from flask import Flask,request
import python_jwt as jwt
import mysql.connector
import bcrypt
import json
from flask_cors import CORS



app = Flask(__name__)
CORS(app)

mydb = mysql.connector.connect(
  host="188.166.228.23",
  user="master",
  password="Cloud2_Space",
  database = 'test'
)

mycursor = mydb.cursor()

@app.route('/')
def hello_world():
    return {"status":'Welcome'}

@app.route('/signup', methods = ['GET', 'POST'])
def singup():
  if request.method =='POST':
    data = str(request.get_data().decode())
    info = json.loads(data)
    name = info['name']
    email = info['email']
    password = info['password'].encode('utf-8')
    sql = "SELECT email FROM User WHERE email= %s"
    adr = (email,)
    mycursor.execute(sql, adr)
    myresult = mycursor.fetchall()
    if len(myresult) == 1:
      print("มี")
      return {"status": "this email has already been used"}
    if len(myresult) == 0:
      print("ไม่มี")
      salt = bcrypt.gensalt()
      hashed = bcrypt.hashpw(password,salt)
      p = hashed.decode()
      sql = "INSERT INTO User (name, email,password) VALUES (%s, %s,%s)"
      val = (name, email,p)
      mycursor.execute(sql, val)
      mydb.commit()
      return {"status":"success"}
@app.route('/signin', methods = ['GET', 'POST'])
def singin():
  if request.method =='POST':
    data = str(request.get_data().decode())
    info = json.loads(data)
    email = info['email']
    password = info['password'].encode('utf-8')
    sql = "SELECT id,name,email,password FROM User WHERE email= %s"
    adr = (email, )
    mycursor.execute(sql, adr)
    myresult = mycursor.fetchall()
    if len(myresult) == 1:
      for x in myresult:
        dbdata = x
      if bcrypt.checkpw(password,dbdata[3].encode('utf-8')):
        print("match")
        key = ''
        payload = { 'id': dbdata[0], 'name': dbdata[1],"email":dbdata[2]}
        token = jwt.generate_jwt(payload, key, 'HS256')
        return {'status':'singin success','token':token}
      else:
        print("does not match")
        return {'status':'password is incorrect'}
    else:
       return {'status':'invalid email'}

@app.route('/setdata', methods = ['GET', 'POST'])
def setdata():
  if request.method =='POST':
    data = str(request.get_data().decode())
    info = json.loads(data)
    url = info['email']
    username = info['username']
    password = info['password']
    userid = info['userid']
    print(url,username,password,userid)
    sql = "INSERT INTO data (url, username,password,userid) VALUES (%s,%s,%s,%s)"
    val = (url,username,password,userid)
    mycursor.execute(sql, val)
    mydb.commit()
    return {"status":"success"}

@app.route('/viewdata/<id>')
def get_datas(id):
    sql = "SELECT * FROM data WHERE userid= %s ORDER BY id DESC "
    adr = (id,)
    mycursor.execute(sql, adr)
    myresult = mycursor.fetchall()
    print(myresult)
    return {'status': 'success','data':myresult}

if __name__ == '__main__':
   app.run(debug = True)
