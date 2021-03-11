# Directions

## Description
Mobile App to learn how to implement a Mapview, work with a Marker and payments with Stripe.
Simulating to be a parts of a delivery application. 

> (Created with Learning Porpuses)
---

## Installation
To install this repository correctly follow the next steps.

First of all, in the terminal put the next code:

```sh
 git clone https://github.com/Rafael-Anguiano/Map-and-Pays.git
 cd map-and-pays/
```

The next step is install the dependencies and node-modules.

```sh
 npm install
```

> ***This is App is powered by Expo***, so the next step is to install Expo. *(If you already have Expo-cli ignore this step)*

```sh
 npm install --global expo-cli
```

Once you have installed Expo, you are ready to start simulating and editing some code. To run this app run the next command in the terminal (Be sure you are in the correct directory).

```sh
 expo start
```
---
## Using the App
1. This app is comformed by 2 main sections, the first one is the ***directions section*** simulating to be an adding direction from a delivery app. And the ***Pays Section*** which can make a payment with credit card using Stripe to complete this process.
 - **Map Section** : Conformed by 3 Screens 
    1. The first one make a *query to the Firebase database* to check if a previous direction exists.
    You can also press the button to add a direction by a forms.
    2. The second one is the *forms screen*, where you would see some Input Text to add a direction by this form, but at the bottom there's a button to get the direction using a map.
    3. The third screen is the *Map screen*, here is just a Map View, and a Marker to search in the map an specific location using the marker.
 - **Pays Section** : 
    1. The *Pays Screen* is conformed by 1 button just to add a payment card. Once you add a payment card, there will be displayed another button to confirm the payment. 
    > This seccion use the ***firebase tools***. The Amount of the payment is defined by a random value from the App.js

>   All the main variables are located in the *App.js* file 
---

## Developed By:
 Rafael de Jesús Anguiano Suárez del Real (January 2021)