//Examinee: Mark Bame Martires - May 10,2017
//Node version 7.7.1
// command: node number_conver.js
// navigate to http://<ip_address>:3031
// check console logs
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)

app.get('/', function(req, res, next) {
  console.log("compact: ", toCompactRoman(1990))
  console.log("compact: ", toCompactRoman(3999))
  console.log("simple: ", toSimpleRoman(1990))
  console.log("simple: ", toSimpleRoman(3999))
  console.log("if compact input is more than 3999: ", toCompactRoman(4000))
  console.log("if simple input is string: ", toSimpleRoman('asdada'))
  console.log("MCMXC to arabic: ", toArabic("MCMXC"))
  console.log("IV to arabic: ", toArabic("IV"))
  console.log("if to arabic input is null: ", toArabic())
  console.log("if to arabic input is invalid: ", toArabic("invalidromannumber"))
  res.status(200)
  res.send("please see console logs")
})

function toCompactRoman (number) {
  return romanConverter(number,
   [
     {'number': 1000, 'equivalent':'M'},
     {'number': 900,'equivalent':'CM'},
     {'number': 500,'equivalent':'D'},
     {'number': 400,'equivalent':'CD'},
     {'number': 100,'equivalent':'C'},
     {'number': 90,'equivalent':'XC'},
     {'number': 50,'equivalent':'L'},
     {'number': 40,'equivalent':'XL'},
     {'number': 10,'equivalent':'X'},
     {'number': 9, 'equivalent':'IX'},
     {'number': 5, 'equivalent':'V'},
     {'number': 4, 'equivalent':'IV'},
     {'number': 1, 'equivalent':'I'}
   ])
}

function toSimpleRoman (number) {
  return romanConverter(number,
   [
     {'number': 1000, 'equivalent':'M'},
     {'number': 900,'equivalent':'DCCCC'},
     {'number': 500,'equivalent':'D'},
     {'number': 400,'equivalent':'CCCC'},
     {'number': 100,'equivalent':'C'},
     {'number': 90,'equivalent':'LXXXX'},
     {'number': 50,'equivalent':'L'},
     {'number': 40,'equivalent':'XXXX'},
     {'number': 10,'equivalent':'X'},
     {'number': 9, 'equivalent':'VIIII'},
     {'number': 5, 'equivalent':'V'},
     {'number': 4, 'equivalent':'IIII'},
     {'number': 1, 'equivalent':'I'}
   ])
}

function romanConverter(number, roman_equivalent) {
  if(typeof number != 'number')
    return 'Please enter a number'

  if (number === 0 || number > 3999)
    return ''

  for (var i = 0; i < roman_equivalent.length; i++) {
    if (number >= roman_equivalent[i].number) {
      return roman_equivalent[i].equivalent +
        romanConverter (number - roman_equivalent[i].number, roman_equivalent)
    }
  }
}

function toArabic(roman_numeral) {
  if(roman_numeral == null)
     return 'Please enter a roman number'

    var current_total_number_holder, previous_number, current_number
    var number_equivalents = []
        number_equivalents['M'] = 1000
        number_equivalents['D'] = 500
        number_equivalents['C'] = 100
        number_equivalents['L'] = 50
        number_equivalents['X'] = 10
        number_equivalents['V'] = 5
        number_equivalents['I'] = 1

    current_total_number_holder = number_equivalents[roman_numeral.charAt(0)]
    for(var i = 1; i < roman_numeral.length; i++){
      if(number_equivalents[roman_numeral.charAt(0)] === undefined)
         return "There is an invalid character from the input:"+ roman_numeral.charAt(i-1)

      previous_number = number_equivalents[roman_numeral.charAt(i-1)]
      current_number = number_equivalents[roman_numeral.charAt(i)]
      if(previous_number >= current_number) {
        current_total_number_holder = current_total_number_holder + current_number
      } else {
        current_total_number_holder = (current_total_number_holder - previous_number) + (current_number - previous_number)
      }
    }
    return current_total_number_holder
}

server.listen(3031, '0.0.0.0', function (err, result) {
  if (err)
    return console.log(err)

  console.log('Listening at port 3031')
})
