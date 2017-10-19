// var assert = require('assert');
// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal(-1, [1,2,3].indexOf(4));
//     });
//   });
// });

var should = require('should');

describe('env world from cmd', function() {
    it('shuld has value read from process.env.world',function(){
        should.exist(process.env.world)
        // .should.not.empty();
    })
    process.env.hell="goood";
    it('shuld has value read after set',function(){
        should.exist(process.env.hell);
        // .should.not.empty();
    })
});