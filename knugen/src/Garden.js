// Creates all things in the garden

Garden = function(game, physicalGroup) {
   var mid = game.world.width /3;

   // create all mazes
   var maze1 = physicalGroup.create(mid-12, 267, 'maze');
   maze1.anchor.setTo(0.5, 0);
   maze1.body.immovable = true;

   var maze2 = physicalGroup.create(mid*2 + 12, 267, 'maze');
   maze2.anchor.setTo(0.5, 0);
   maze2.scale.setTo(-1, 1);
   maze2.body.immovable = true;

   // Create Fountains
   var big = physicalGroup.create(120, 180, 'fountainBig');
   big.animations.add('flow');
   big.animations.play('flow', 10, true);
   big.anchor.setTo(0.5, 1);
   big.body.height = 30;
   big.body.immovable = true;

   var small1 = physicalGroup.create(65, 230, 'fountainSmall');
   small1.anchor.setTo(0.5, 1);
   small1.body.height = 15;
   small1.body.immovable = true;

   var small2 = physicalGroup.create(175, 230, 'fountainSmall');
   small2.anchor.setTo(0.5, 1);
   small2.body.height = 15;
   small2.body.immovable = true;
}
