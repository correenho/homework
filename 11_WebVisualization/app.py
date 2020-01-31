from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route("/")
def index():
	return render_template("index.html")



@app.route("/visualization/1")
def vis_1():
	return render_template("vis_1.html")


@app.route("/visualization/2")
def vis_2():
	return render_template("vis_2.html")


@app.route("/visualization/3")
def vis_3():
	return render_template("vis_3.html")


@app.route("/visualization/4")
def vis_4():
	return render_template("vis_4.html")

@app.route("/comparisons")
def comparisons():
	return render_template("comparisons.html")

@app.route("/data")
def data():
	return render_template("data.html")

if __name__ == "__main__":
    app.run(debug=True)
