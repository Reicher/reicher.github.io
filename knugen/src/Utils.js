function Utils() {}

Utils.getTopLeft = function(dispObj) {
   return { x: dispObj.x - dispObj.anchor.x * dispObj.body.width,
            y: dispObj.y - dispObj.anchor.y * dispObj.body.height };
}

Utils.getTopRight = function(dispObj) {
   return { x: (dispObj.x - dispObj.anchor.x * dispObj.body.width) + dispObj.body.width,
            y: dispObj.y - dispObj.anchor.y * dispObj.body.height };
}

Utils.getBottomLeft = function(dispObj) {
   return { x: dispObj.x - dispObj.anchor.x * dispObj.body.width,
            y: (dispObj.y - dispObj.anchor.y * dispObj.body.height) + dispObj.body.height };
}

Utils.getBottomRight = function(dispObj) {
   return { x: (dispObj.x - dispObj.anchor.x * dispObj.body.width) + dispObj.body.width,
            y: (dispObj.y - dispObj.anchor.y * dispObj.body.height) + dispObj.body.height };
}