# Inherent Bias
![Gif of the app running and coloring text on a webpage](https://raw.githubusercontent.com/1gfelton/inherent-bias/refs/heads/main/out.gif)

A critical exploration into machine reading comprehension using [Gensim](https://radimrehurek.com/gensim/) and [Pandas](https://pandas.pydata.org/). Contains an NLP model trained using this [dataset](https://github.com/rpryzant/neutralizing-bias).
## What Does it Do?
This FireFox add-on gathers the text on a webpage, passes each term into a pre-trained NLP model and then compares the cosine similarity between a list of pre-trained terms and the current term. The greater this value (on average, after comparison with all bias terms), the more red is added to the color of the text.
## Required Modules
* [MiniConda](https://docs.anaconda.com/miniconda/)
* [Gensim](https://radimrehurek.com/gensim/)
* [Pandas](https://pandas.pydata.org/)
* [Flask](https://flask.palletsprojects.com/en/stable/)
* [NumPy](https://numpy.org/)
## How To Run
1. Open and run 'app.py' (a local flask server should start on your machine)
2. Open firefox
3. Type 'about:debugging' in the search and press 'enter'
4. Press 'Load Temporary Add-On'
5. Select 'manifest.json'
6. Go to any (mostly text based) webpage of your choosing and go to the puzzle icon on top right and press 'Inherent Bias'
7. Press 'Show Bias'
8. Wait a second, the text will be parsed on the webpage and the color will change
