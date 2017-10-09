"use strict";

const expect = require('chai').expect;

describe('Translate form data', function() {
  const translateFormData = require('../utils').translate;

  it('should correctly translate the incoming form data', function() {
   const formData = {
     name: "toto",
     description: "about toto"
   };
   const skatingEvent = {
     title: "toto",
     description: "about toto"
   };
   const result = translateFormData(formData);
   expect(result.title).to.equal(skatingEvent.title);
   expect(result.description).to.equal(skatingEvent.description);

  });
});
