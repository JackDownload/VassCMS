import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Recipes.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Név"
  },
  description: {
    type: String,
    label: "Elkészítés"
  }
}, { tracker: Tracker }));
