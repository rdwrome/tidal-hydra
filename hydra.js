//CONTROL-RETURN, RACHEL

// set port to listen to osc messages. default port is 57101
msg.setPort(3333)
//


// function to convert tidal messages from an array to an object
// run this code once
parseTidal = (args) => {
  obj = {}
  for(var i = 0; i < args.length; i+=2){
    obj[args[i]] = args[i+1]
  }
  return obj
}



// receive messages from supercollider in hydra. '/play2' corresponds to the
// address of the OSC message, defined in the file tidal-forward.sc
// open the console to see the messages, using Ctrl+Alt+I (windows), Cmd+Opt+I (mac), or Ctrl + Shift + I(linux)
//
msg.on('/play2', (args) => {
// log osc results to console
 //log(args)
 tidal = parseTidal(args)
 console.log(tidal)
})



// EXAMPLE USING TIDAL "sd" and "bd" to control hydra

// define a variable to contain a blend value
blend = 0
//

// receive args from supercollider in hydra. Tidal sends OSC messages
// ahead of the time the sound is plays, so it is necessary to use setTimeout
// in order to wait to change the visuals
msg.on('/play2', (args) => {
  // parse the values from tidal
 var tidal = parseTidal(args)
//
  setTimeout(() => {
    //
    // If the tidal sample is "sd", set blend to 0, if it is bd, set blend to 1
    //
     if(tidal.s === "sd"){
         blend = 0
     } else if (tidal.s === "bd"){
         blend = 1
     }
     //
  }, tidal.delta * 1000)
})

// use the variable "blend" in a hydra function
osc(20, 0.1, 0.8)
  .rotate(0.2)
  .mult(osc(100), () => blend)
  .out()
