from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/smartfarm'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

app.app_context().push()

class User(db.Model):
    userID = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    fruits = db.relationship('FruitTree', backref='user')
    temp = db.relationship('temp', backref='user')
    humid = db.relationship('humid', backref='user')
    bright = db.relationship('bright', backref='user')

    def __init__(self, username, password):
        self.username = username
        self.password = password

class FruitTree(db.Model):
    treetype_ID = db.Column(db.Integer, primary_key=True)
    treetype = db.Column(db.String(100), nullable=False)
    treequantity = db.Column(db.Integer, nullable=False)
    userID = db.Column(db.Integer, db.ForeignKey('user.userID'), nullable=False)

    def __init__(self, treetype, treequantity, userID):
        self.treetype = treetype
        self.treequantity = treequantity
        self.userID = userID

class temp(db.Model):
    setID = db.Column(db.Integer, primary_key=True)
    userID = db.Column(db.Integer, db.ForeignKey('user.userID'), nullable=False)
    lower = db.Column(db.Float, nullable=False)
    upper = db.Column(db.Float, nullable=False)
    interval_min = db.Column(db.Integer, nullable=False)
    interval_sec = db.Column(db.Integer, nullable=False)

    def __init__(self, userID, lower, upper, interval_min, interval_sec):
        self.userID = userID
        self.lower = lower
        self.upper = upper
        self.interval_min = interval_min
        self.interval_sec = interval_sec

class humid(db.Model):
    setID = db.Column(db.Integer, primary_key=True)
    userID = db.Column(db.Integer, db.ForeignKey('user.userID'), nullable=False)
    lower = db.Column(db.Float, nullable=False)
    upper = db.Column(db.Float, nullable=False)
    interval_min = db.Column(db.Integer, nullable=False)
    interval_sec = db.Column(db.Integer, nullable=False)

    def __init__(self, userID, lower, upper, interval_min, interval_sec):
        self.userID = userID
        self.lower = lower
        self.upper = upper
        self.interval_min = interval_min
        self.interval_sec = interval_sec

class bright(db.Model):
    setID = db.Column(db.Integer, primary_key=True)
    userID = db.Column(db.Integer, db.ForeignKey('user.userID'), nullable=False)
    lower = db.Column(db.Float, nullable=False)
    upper = db.Column(db.Float, nullable=False)
    interval_min = db.Column(db.Integer, nullable=False)
    interval_sec = db.Column(db.Integer, nullable=False)

    def __init__(self, userID, lower, upper, interval_min, interval_sec):
        self.userID = userID
        self.lower = lower
        self.upper = upper
        self.interval_min = interval_min
        self.interval_sec = interval_sec


class UserSchema(ma.Schema):
    class Meta:
        fields = ('userID', 'username', 'password')

class FruitTreeSchema(ma.Schema):
    class Meta:
        fields = ('treetype_ID', 'treetype', 'treequantity', 'userID')

class tempSchema(ma.Schema):
    class Meta:
        fields = ('setID', 'userID', 'lower', 'upper', 'interval')

class humidSchema(ma.Schema):
    class Meta:
        fields = ('setID', 'userID', 'lower', 'upper', 'interval')

class brightSchema(ma.Schema):
    class Meta:
        fields = ('setID', 'userID', 'lower', 'upper', 'interval')

user_schema = UserSchema()
users_schema = UserSchema(many=True)

fruit_schema = FruitTreeSchema()
fruits_schema = FruitTreeSchema(many=True)

temp_schema = tempSchema()
humid_schema = humidSchema()
bright_schema = brightSchema()

@app.route('/get-fruit/<userID>/', methods = ['GET'])
def getFruit(userID):
    fruit = FruitTree.query.filter_by(userID = userID).all()
    return fruits_schema.jsonify(fruit)

@app.route('/get-temp/<userID>/', methods = ['GET'])
def getTemp(userID):
    tem = temp.query.filter_by(userID = userID).first()
    return temp_schema.jsonify(tem)

@app.route('/get-humid/<userID>/', methods = ['GET'])
def getHumid(userID):
    hum = humid.query.filter_by(userID = userID).first()
    return temp_schema.jsonify(hum)

@app.route('/get-bright/<userID>/', methods = ['GET'])
def getBright(userID):
    bri = bright.query.filter_by(userID = userID).first()
    return temp_schema.jsonify(bri)

@app.route('/update-fruit/<userID>/', methods = ['PUT'])
def updateFruit(userID):
    fruit = FruitTree.query.filter_by(userID = userID).first()

    treetype = request.json['treetype']
    treequantity = request.json['treequantity']

    fruit.treetype = treetype
    fruit.treequantity = treequantity
    db.session.commit()

    return fruit_schema.jsonify(fruit)

@app.route('/update-temp/<userID>/', methods = ['PUT'])
def updateTemp(userID):
    tmp = temp.query.filter_by(userID = userID).first()

    lower = request.json['lower']
    upper = request.json['upper']
    interval_min = request.json['interval_min']
    interval_sec = request.json['interval_sec']

    tmp.lower = lower
    tmp.upper = upper
    tmp.interval_min = interval_min
    tmp.interval_sec = interval_sec

    db.session.commit()

    return temp_schema.jsonify(tmp)

@app.route('/update-humid/<userID>/', methods = ['PUT'])
def updateHumid(userID):
    hum = humid.query.filter_by(userID = userID).first()

    lower = request.json['lower']
    upper = request.json['upper']
    interval_min = request.json['interval_min']
    interval_sec = request.json['interval_sec']

    hum.lower = lower
    hum.upper = upper
    hum.interval_min = interval_min
    hum.interval_sec = interval_sec

    db.session.commit()

    return temp_schema.jsonify(hum)

@app.route('/update-bright/<userID>/', methods = ['PUT'])
def updateBright(userID):
    bri = bright.query.filter_by(userID = userID).first()

    lower = request.json['lower']
    upper = request.json['upper']
    interval_min = request.json['interval_min']
    interval_sec = request.json['interval_sec']

    bri.lower = lower
    bri.upper = upper
    bri.interval_min = interval_min
    bri.interval_sec = interval_sec

    db.session.commit()

    return temp_schema.jsonify(bri)

@app.route('/add-user/username/password', methods = ['POST'])
def add_user(username, password):

    user = User(username, password)

    db.session.add(user)
    db.session.commit()

    tem = temp(user.userID, 60, 70, 2, 0)
    hum = humid(user.userID, 60, 70, 2, 0)
    bri = bright(user.userID, 60, 70, 2, 0)
    db.session.add_all([tem, hum, bri])
    db.session.commit()

    return user_schema.jsonify(user) 

@app.route('/get-user/<username>/<password>/', methods=['GET'])
def get_user(username, password):
    tmp = User.query.filter_by(username = username).first()
    if tmp is not None:
        if tmp.password != password:
            return "Incorrect Password"
        else: 
            return user_schema.jsonify(tmp)
    else:
        return "Account not exists"


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=True)